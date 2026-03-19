// ─── Types ────────────────────────────────────────────────────────────────────

export interface TurtleState {
  x: number;
  y: number;
  angle: number; // degrees, 0 = north (up), clockwise
  penDown: boolean;
  visible: boolean;
}

export interface DrawLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface InterpreterState {
  turtle: TurtleState;
  lines: DrawLine[];
  procedures: Record<string, string[]>;
}

export interface RunResult {
  state: InterpreterState;
  error?: string;
  message?: string;
}

// ─── Initial state ────────────────────────────────────────────────────────────

export function createInitialState(width = 500, height = 500): InterpreterState {
  return {
    turtle: {
      x: width / 2,
      y: height / 2,
      angle: 0,
      penDown: true,
      visible: true,
    },
    lines: [],
    procedures: {},
  };
}

// ─── Tokenizer ────────────────────────────────────────────────────────────────

function tokenize(input: string): string[] {
  return input
    .toUpperCase()
    .replace(/\[/g, ' [ ')
    .replace(/\]/g, ' ] ')
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function moveForward(state: InterpreterState, distance: number): InterpreterState {
  const rad = deg2rad(state.turtle.angle);
  const nx = state.turtle.x + Math.sin(rad) * distance;
  const ny = state.turtle.y - Math.cos(rad) * distance;

  const lines: DrawLine[] = state.turtle.penDown
    ? [...state.lines, { x1: state.turtle.x, y1: state.turtle.y, x2: nx, y2: ny }]
    : state.lines;

  return { ...state, lines, turtle: { ...state.turtle, x: nx, y: ny } };
}

// ─── Executor ─────────────────────────────────────────────────────────────────

interface ExecResult {
  state: InterpreterState;
  pos: number;
  error?: string;
}

function extractBlock(tokens: string[], startPos: number): { block: string[]; endPos: number } | null {
  if (tokens[startPos] !== '[') return null;
  let pos = startPos + 1;
  const block: string[] = [];
  let depth = 1;

  while (pos < tokens.length && depth > 0) {
    const t = tokens[pos];
    if (t === '[') { depth++; block.push('['); }
    else if (t === ']') { depth--; if (depth > 0) block.push(']'); }
    else block.push(t);
    pos++;
  }

  return { block, endPos: pos };
}

function exec(tokens: string[], startPos: number, state: InterpreterState, depth: number): ExecResult {
  if (depth > 50) return { state, pos: startPos, error: 'Recursão muito profunda.' };

  let pos = startPos;
  let s = state;

  while (pos < tokens.length) {
    const t = tokens[pos];
    if (t === ']') break;

    // Skip bare numbers
    if (!isNaN(Number(t))) { pos++; continue; }

    switch (t) {
      // ── Movement ──────────────────────────────────────────────────────────
      case 'PF':
      case 'PARAFRENTE': {
        const n = Number(tokens[pos + 1]);
        if (isNaN(n)) return { state: s, pos, error: `${t}: esperava um número` };
        s = moveForward(s, n);
        pos += 2;
        break;
      }
      case 'PT':
      case 'PARATRAS': {
        const n = Number(tokens[pos + 1]);
        if (isNaN(n)) return { state: s, pos, error: `${t}: esperava um número` };
        s = moveForward(s, -n);
        pos += 2;
        break;
      }
      case 'PD':
      case 'PARADIREITA': {
        const n = Number(tokens[pos + 1]);
        if (isNaN(n)) return { state: s, pos, error: `${t}: esperava um número` };
        s = { ...s, turtle: { ...s.turtle, angle: (s.turtle.angle + n) % 360 } };
        pos += 2;
        break;
      }
      case 'PE':
      case 'PARAESQUERDA': {
        const n = Number(tokens[pos + 1]);
        if (isNaN(n)) return { state: s, pos, error: `${t}: esperava um número` };
        s = { ...s, turtle: { ...s.turtle, angle: ((s.turtle.angle - n) % 360 + 360) % 360 } };
        pos += 2;
        break;
      }

      // ── Turtle visibility ─────────────────────────────────────────────────
      case 'TAT':
      case 'TARTARUGA':
        s = { ...s, turtle: { ...s.turtle, visible: true } };
        pos++;
        break;
      case 'TAP':
        s = { ...s, turtle: { ...s.turtle, visible: false } };
        pos++;
        break;

      // ── Screen ────────────────────────────────────────────────────────────
      case 'LP':
      case 'LIMPATELA':
        s = { ...s, lines: [] };
        pos++;
        break;

      // ── Pen ───────────────────────────────────────────────────────────────
      case 'LT':
      case 'LEVANTAPENA':
        s = { ...s, turtle: { ...s.turtle, penDown: false } };
        pos++;
        break;
      case 'AB':
      case 'ABAIXAPENA':
        s = { ...s, turtle: { ...s.turtle, penDown: true } };
        pos++;
        break;

      // ── REPITA ────────────────────────────────────────────────────────────
      case 'REPITA': {
        const count = Number(tokens[pos + 1]);
        if (isNaN(count)) return { state: s, pos, error: 'REPITA: esperava um número' };

        const extracted = extractBlock(tokens, pos + 2);
        if (!extracted) return { state: s, pos, error: 'REPITA: esperava [ ... ]' };

        for (let i = 0; i < count; i++) {
          const r = exec(extracted.block, 0, s, depth + 1);
          if (r.error) return { state: s, pos, error: r.error };
          s = r.state;
        }

        pos = extracted.endPos;
        break;
      }

      // ── APRENDA ───────────────────────────────────────────────────────────
      case 'APRENDA': {
        const name = tokens[pos + 1];
        if (!name || name === '[' || name === ']') {
          return { state: s, pos, error: 'APRENDA: esperava um nome' };
        }
        let p = pos + 2;
        const body: string[] = [];
        while (p < tokens.length && tokens[p] !== 'FIM') {
          body.push(tokens[p]);
          p++;
        }
        if (p >= tokens.length) {
          return { state: s, pos, error: 'APRENDA: bloco não encerrado com FIM' };
        }
        p++; // skip FIM
        s = { ...s, procedures: { ...s.procedures, [name]: body } };
        pos = p;
        break;
      }

      // ── User-defined procedures ───────────────────────────────────────────
      default: {
        const proc = s.procedures[t];
        if (proc) {
          const r = exec(proc, 0, s, depth + 1);
          if (r.error) return { state: s, pos, error: r.error };
          s = r.state;
          pos++;
          break;
        }
        return { state: s, pos, error: `Comando desconhecido: "${t}"` };
      }
    }
  }

  return { state: s, pos };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function runCommand(input: string, state: InterpreterState): RunResult {
  const tokens = tokenize(input.trim());
  if (tokens.length === 0) return { state };

  const result = exec(tokens, 0, state, 0);
  if (result.error) return { state, error: result.error };

  // Surface meaningful feedback for state-change commands
  const cmd = tokens[0];
  let message: string | undefined;

  if ((cmd === 'APRENDA') && tokens[1]) {
    message = `Procedimento "${tokens[1]}" aprendido.`;
  } else if (cmd === 'LP' || cmd === 'LIMPATELA') {
    message = 'Tela limpa.';
  } else if (cmd === 'LT' || cmd === 'LEVANTAPENA') {
    message = 'Caneta levantada.';
  } else if (cmd === 'AB' || cmd === 'ABAIXAPENA') {
    message = 'Caneta abaixada.';
  } else if (cmd === 'TAT' || cmd === 'TARTARUGA') {
    message = 'Tartaruga visível.';
  } else if (cmd === 'TAP') {
    message = 'Tartaruga oculta.';
  }
  // For PF, PT, PD, PE, REPITA, and called procedures: canvas shows it, no message needed

  return { state: result.state, message };
}