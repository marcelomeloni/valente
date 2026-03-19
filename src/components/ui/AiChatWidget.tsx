// components/ui/AiChatWidget.tsx
'use client';

import { useState } from 'react';

export function AiChatWidget() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<'idle' | 'thinking' | 'typing' | 'answered'>('idle');
  const [response, setResponse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus('thinking');
    setResponse('');

    setTimeout(() => {
      setStatus('typing');
      
      setTimeout(() => {
        setStatus('answered');
        setResponse(
          'Esta é uma resposta gerada aleatoriamente (mock) para ilustrar o fluxo de conversação da IA. Na implementação real, aqui viria o retorno da API baseada no contexto desta obra específica do Professor Valente.'
        );
      }, 2000);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Pergunte à IA
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-3 sm:flex-row">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Faça uma pergunta para AI sobre esta obra..."
          className="min-h-[60px] w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-unicamp focus:outline-none focus:ring-1 focus:ring-unicamp"
          disabled={status === 'thinking' || status === 'typing'}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || status === 'thinking' || status === 'typing'}
          className="flex h-[60px] w-full shrink-0 items-center justify-center rounded-xl bg-zinc-900 px-6 font-sans text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 sm:w-auto"
        >
          Enviar
        </button>
      </form>

      {status !== 'idle' && (
        <div className="mt-6 rounded-xl bg-zinc-50 p-5 border border-zinc-100">
          {status === 'thinking' && (
            <div className="flex items-center gap-2 font-sans text-sm text-zinc-500 animate-pulse">
              <span>Pensando...</span>
            </div>
          )}
          
          {status === 'typing' && (
            <div className="flex items-center gap-2 font-sans text-sm text-zinc-500">
              <span>Escrevendo...</span>
            </div>
          )}
          
          {status === 'answered' && (
            <p className="font-sans text-sm leading-relaxed text-zinc-700">
              {response}
            </p>
          )}
        </div>
      )}
    </div>
  );
}