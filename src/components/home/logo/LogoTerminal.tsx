'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { RunResult } from './interpreter';

const WELCOME: string[] = [
  'LOGO · NIED/UNICAMP',
  '─────────────────────',
  '',
  'Comandos:',
  '  PF 50      para frente',
  '  PT 30      para trás',
  '  PD 90      vira direita',
  '  PE 90      vira esquerda',
  '  LP         limpa tela',
  '  LT / AB    levanta/baixa caneta',
  '',
  'Exemplo:',
  '  REPITA 4 [PF 50 PD 90]',
  '',
  'Procedimento:',
  '  APRENDA QUADRADO',
  '  REPITA 4 [PF 50 PD 90]',
  '  FIM',
  '',
  '─────────────────────',
  '',
];

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'blank';
  text: string;
}

interface LogoTerminalProps {
  onRun: (input: string) => RunResult;
}

export function LogoTerminal({ onRun }: LogoTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    WELCOME.map((text) => ({ type: 'output' as const, text }))
  );
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function submit() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newEntries: HistoryEntry[] = [{ type: 'input', text: `> ${trimmed}` }];
    const result = onRun(trimmed);

    if (result.error) {
      newEntries.push({ type: 'error', text: `  ! ${result.error}` });
    } else if (result.message) {
      newEntries.push({ type: 'output', text: `  ${result.message}` });
    }

    newEntries.push({ type: 'blank', text: '' });

    setHistory((prev) => [...prev, ...newEntries]);
    setCmdHistory((prev) => [trimmed, ...prev]);
    setCmdIdx(-1);
    setInput('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = cmdIdx + 1;
      if (next < cmdHistory.length) { setCmdIdx(next); setInput(cmdHistory[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cmdIdx - 1;
      if (next >= 0) { setCmdIdx(next); setInput(cmdHistory[next]); }
      else { setCmdIdx(-1); setInput(''); }
    }
  }

  return (
    <div
      className="flex h-full flex-col"
      style={{ backgroundColor: '#005500', fontFamily: "'Courier New', Courier, monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable history */}
      <div className="flex-1 overflow-y-auto px-3 py-3 text-xs leading-relaxed sm:px-4 sm:text-sm">
        {history.map((entry, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap break-all"
            style={{
              color:
                entry.type === 'error' ? '#ff7070'
                : entry.type === 'input' ? '#ffffff'
                : '#ffffcc',
              minHeight: entry.type === 'blank' ? '0.6rem' : undefined,
            }}
          >
            {entry.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input row */}
      <div
        className="flex flex-shrink-0 items-center gap-2 px-3 py-2 sm:px-4 sm:py-3"
        style={{ borderTop: '1px solid #9cd068' }}
      >
        <span className="text-sm font-bold" style={{ color: '#9cd068' }}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="PF 50 PD 90..."
          className="flex-1 bg-transparent text-xs outline-none sm:text-sm"
          style={{ color: '#ffffff', caretColor: '#9cd068', fontFamily: 'inherit' }}
        />
        {/* Mobile send button */}
        <button
          onClick={submit}
          className="flex-shrink-0 rounded px-2 py-1 text-xs font-bold transition-opacity active:opacity-60 sm:hidden"
          style={{ backgroundColor: '#9cd068', color: '#000000' }}
        >
          RUN
        </button>
      </div>
    </div>
  );
}