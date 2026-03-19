'use client';

import { useEffect, useState } from 'react';
import { createInitialState, runCommand, InterpreterState, RunResult } from './interpreter';
import { LogoCanvas, CANVAS_SIZE } from './LogoCanvas';
import { LogoTerminal } from './LogoTerminal';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoModal({ isOpen, onClose }: LogoModalProps) {
  const [logoState, setLogoState] = useState<InterpreterState>(() =>
    createInitialState(CANVAS_SIZE, CANVAS_SIZE)
  );

  function handleRun(input: string): RunResult {
    const result = runCommand(input, logoState);
    setLogoState(result.state);
    return result;
  }

  function handleReset() {
    setLogoState(createInitialState(CANVAS_SIZE, CANVAS_SIZE));
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 md:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.88)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl sm:h-[88vh] sm:max-w-3xl sm:rounded-2xl md:max-w-5xl"
        style={{ backgroundColor: '#000000', border: '1px solid #9cd068' }}
      >

        {/* Header */}
        <div
          className="flex flex-shrink-0 items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3"
          style={{ backgroundColor: '#005500', borderBottom: '1px solid #9cd068' }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3" style={{ backgroundColor: '#ff5f56' }} />
              <span className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3" style={{ backgroundColor: '#ffbd2e' }} />
              <span className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3" style={{ backgroundColor: '#27c93f' }} />
            </div>
            <span
              className="ml-1 text-xs font-bold tracking-widest sm:ml-2 sm:text-sm"
              style={{ fontFamily: "'Courier New', monospace", color: '#9cd068' }}
            >
              LOGO
            </span>
      
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="text-xs tracking-widest transition-opacity hover:opacity-60 active:opacity-60"
              style={{ fontFamily: "'Courier New', monospace", color: '#ffffcc' }}
            >
              REINICIAR
            </button>
            <button
              onClick={onClose}
              className="text-xl leading-none transition-opacity hover:opacity-60 active:opacity-60"
              style={{ color: '#ffffcc' }}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body
            Mobile  : canvas (45% height) on top, terminal below, separated by top border
            Desktop : canvas fills left flex-1, terminal is fixed-width right sidebar
        */}
        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">

          {/* Canvas */}
          <div
            className="flex h-[44%] flex-shrink-0 items-center justify-center p-3 md:h-auto md:flex-1 md:p-6"
            style={{ backgroundColor: '#000000' }}
          >
            <LogoCanvas state={logoState} />
          </div>

          {/* Terminal */}
          <div
            className="flex-1 overflow-hidden md:w-72 md:flex-none xl:w-80"
            style={{ borderTop: '1px solid #9cd068', borderLeft: '1px solid #9cd068' }}
          >
            <LogoTerminal onRun={handleRun} />
          </div>
        </div>
      </div>
    </div>
  );
}