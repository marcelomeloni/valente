// components/ui/AiChatWidget.tsx
'use client';

import { useState } from 'react';
import { aiService } from '@/services/aiService';

interface ObraContext {
  titulo?: string;
  autores?: string;
  ano?: number;
  categoria?: string;
  resumo?: string;
  publicacao?: string;
  pdfUrl?: string;
}

interface AiChatWidgetProps {
  obraContext?: ObraContext;
}

export function AiChatWidget({ obraContext }: AiChatWidgetProps) {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<'idle' | 'thinking' | 'answered' | 'error'>('idle');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const question = prompt.trim();
    setStatus('thinking');
    setResponse('');
    setPrompt('');

    try {
      const result = await aiService.ask({
        question,
        pdfUrl: obraContext?.pdfUrl,
        context: obraContext ? {
          titulo: obraContext.titulo,
          autores: obraContext.autores,
          ano: obraContext.ano,
          categoria: obraContext.categoria,
          resumo: obraContext.resumo,
          publicacao: obraContext.publicacao,
        } : undefined
      });

      setHistory((prev) => [...prev, { q: question, a: result.answer }]);
      setResponse(result.answer);
      setStatus('answered');
    } catch (err) {
      console.error('AI error:', err);
      setResponse('Erro ao consultar a IA. Verifique se a GEMINI_API_KEY está configurada no backend.');
      setStatus('error');
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </div>
        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Pergunte à IA sobre esta obra
        </h3>
      </div>

      {/* Histórico de perguntas */}
      {history.length > 0 && (
        <div className="mb-4 flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
          {history.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="self-end rounded-xl rounded-br-sm bg-zinc-900 px-4 py-2.5 max-w-[85%]">
                <p className="font-sans text-sm text-white">{item.q}</p>
              </div>
              <div className="self-start rounded-xl rounded-bl-sm bg-zinc-50 border border-zinc-100 px-4 py-2.5 max-w-[85%]">
                <p className="font-sans text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Indicador de pensamento */}
      {status === 'thinking' && (
        <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-sans text-sm text-indigo-600 font-medium animate-pulse">Gemini está analisando a obra...</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-3 sm:flex-row">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Qual é a tese principal desta obra? Resuma em 3 pontos..."
          className="min-h-[60px] w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-sans text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          disabled={status === 'thinking'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || status === 'thinking'}
          className="flex h-[60px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 font-sans text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50 sm:w-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Enviar
        </button>
      </form>
    </div>
  );
}