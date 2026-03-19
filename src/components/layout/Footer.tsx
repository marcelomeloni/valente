'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Twitter, Mail, GraduationCap } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto w-full border-t border-zinc-200 bg-zinc-50 pt-16 pb-8">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-md">
                <span className="font-serif text-xl font-bold">V</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-tight text-zinc-900">Acervo Valente</h2>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Memória Digital</p>
              </div>
            </div>

            <p className="mb-8 max-w-sm font-sans text-sm leading-relaxed text-zinc-600">
              Preservando e democratizando o acesso à produção intelectual do Professor José Armando Valente (NIED/Unicamp). Uma iniciativa para fomento à educação e pesquisa.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="mailto:contato@unicamp.br"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="E-mail de Contato"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-sans text-[11px] font-bold uppercase tracking-widest text-zinc-900">Navegação</h3>
            <ul className="space-y-4 font-sans text-sm text-zinc-600">
              <li>
                <Link href="/" className="transition-colors hover:text-zinc-900">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/obras" className="transition-colors hover:text-zinc-900">
                  Obras Disponíveis
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="transition-colors hover:text-zinc-900">
                  Sobre o Professor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-sans text-[11px] font-bold uppercase tracking-widest text-zinc-900">Acesso</h3>
            <ul className="space-y-4 font-sans text-sm text-zinc-600">
              <li>
                <Link
                  href="/login"
                  className="group flex w-fit items-center gap-1 transition-colors hover:text-zinc-900 text-unicamp/80 hover:text-unicamp"
                >
                  Acesso Catalogador
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="font-medium text-zinc-400 transition-colors hover:text-zinc-800"
                >
                  ↑ Voltar ao topo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Acervo Valente. Todos os direitos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
}