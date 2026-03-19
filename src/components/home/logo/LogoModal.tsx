'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, RotateCcw } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl sm:h-[88vh] sm:max-w-4xl sm:rounded-2xl md:max-w-6xl shadow-2xl bg-zinc-950 border border-zinc-800"
          >
            {/* Header Mac-Style */}
            <div className="flex flex-shrink-0 items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button onClick={onClose} className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors">
                    <X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-red-950" />
                  </button>
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 px-2">
                  <TerminalIcon className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs font-medium tracking-wider text-zinc-400 font-sans uppercase">
                    Ambiente Logo Interativo
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-200"
                  title="Reiniciar Canvas"
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform group-active:-rotate-90" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col overflow-hidden md:flex-row bg-[#09090b]">
              {/* Canvas Area */}
              <div className="flex h-[45%] flex-shrink-0 items-center justify-center p-4 md:h-auto md:flex-1 md:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-[#09090b]">
                <div className="h-full w-full rounded-xl overflow-hidden shadow-inner border border-white/5 bg-black/50 backdrop-blur-sm">
                  <LogoCanvas state={logoState} />
                </div>
              </div>

              {/* Terminal Area */}
              <div className="flex-1 overflow-hidden md:w-80 md:flex-none xl:w-96 border-t border-zinc-800 md:border-t-0 md:border-l bg-zinc-950/50 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.5)]">
                <LogoTerminal onRun={handleRun} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}