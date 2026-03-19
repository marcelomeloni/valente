'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    label: 'Dashboard',
    href: '/backstage',
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Acervo de obras',
    href: '/backstage/obras',
    exact: true, // Para não ficar ativo quando estiver na página de "nova"
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: 'Cadastrar nova obra',
    href: '/backstage/nova',
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

export function BackstageSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (href === '/backstage') return pathname === '/backstage';
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-full w-64 flex-col bg-zinc-950 border-r border-zinc-900">
      
      {/* Logo */}
      <div className="flex h-16 flex-shrink-0 items-center border-b border-zinc-800/50 px-6">
        <Link href="/backstage" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-unicamp">
            <span className="font-serif text-sm font-bold text-white">V</span>
          </div>
          <span className="font-sans text-sm font-semibold tracking-wide text-zinc-100">
            Acervo Valente
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6 filters-scrollbar">
        <div className="flex flex-col gap-1.5">
          <p className="mb-2 px-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Menu Principal
          </p>
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm transition-all duration-200 ${
                  active
                    ? 'bg-zinc-800/80 font-medium text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                }`}
              >
                <span className={`transition-colors duration-200 ${active ? 'text-unicamp' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Public Site Link */}
        <div className="flex flex-col gap-1.5 pt-6">
          <div className="my-2 h-px w-full bg-zinc-800/50" />
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-sm text-zinc-400 transition-all duration-200 hover:bg-zinc-800/40 hover:text-zinc-200"
          >
            <span className="text-zinc-500 group-hover:text-zinc-400">
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
            Acessar site público
          </Link>
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-zinc-800/50 bg-zinc-950/50 px-5 py-4 transition-colors hover:bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 ring-2 ring-zinc-900">
            <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-medium text-zinc-200">Administrador</span>
            <span className="font-sans text-[11px] text-zinc-500">nied@unicamp.br</span>
          </div>
        </div>
        <Link
          href="/login"
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-red-400"
          title="Encerrar sessão"
        >
          <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Link>
      </div>
      
    </aside>
  );
}