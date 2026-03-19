'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { RunResult } from './interpreter';
import { ChevronRight } from 'lucide-react';

const WELCOME: string[] = [
  'Ambiente de Simulação LOGO',
  'Desenvolvido para fins educacionais.',
  '────────────────────────────────────',
  '',
  'Comandos Básicos:',
  '  PF <n>      para frente',
  '  PT <n>      para trás',
  '  PD <n>      vira à direita (graus)',
  '  PE <n>      vira à esquerda (graus)',
  '  LP          limpa tela',
  '  LT / AB     levanta/baixa caneta',
  '',
  'Experimente executar:',
  '  REPITA 36 [ PF 20 PD 10 ]',
  '────────────────────────────────────',
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

    const newEntries: HistoryEntry[] = [{ type: 'input', text: trimmed }];
    const result = onRun(trimmed);

    if (result.error) {
      newEntries.push({ type: 'error', text: result.error });
    } else if (result.message) {
      newEntries.push({ type: 'output', text: result.message });
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
      className="flex h-full flex-col font-mono text-[13px] leading-relaxed tracking-tight"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable history */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700">
        {history.map((entry, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-all ${
              entry.type === 'error' ? 'text-red-400'
              : entry.type === 'input' ? 'text-zinc-100 font-semibold flex items-start gap-2'
              : 'text-zinc-400'
            }`}
            style={{ minHeight: entry.type === 'blank' ? '0.75rem' : undefined }}
          >
            {entry.type === 'input' && <span className="text-unicamp select-none mt-0.5">❯</span>}
            {entry.type === 'error' && <span className="text-red-500 mr-2 select-none">✕</span>}
            <span>{entry.text}</span>
          </div>
        ))}
        <div ref={scrollRef} className="h-2" />
      </div>

      {/* Input row */}
      <div className="flex flex-shrink-0 items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-zinc-950/80 border-t border-zinc-800/50 backdrop-blur-md transition-colors focus-within:bg-zinc-900/80 focus-within:border-zinc-700">
        <ChevronRight className="h-4 w-4 text-unicamp" strokeWidth={3} />
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
          placeholder="Digite um comando..."
          className="flex-1 bg-transparent py-1 text-zinc-100 outline-none placeholder:text-zinc-700 font-medium"
        />
        {/* Mobile send button */}
        <button
          onClick={submit}
          className="flex-shrink-0 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors active:scale-95 sm:hidden hover:bg-zinc-700 hover:text-white"
        >
          RUN
        </button>
      </div>
    </div>
  );
}