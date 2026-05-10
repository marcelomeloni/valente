"use client";

import Link from 'next/link';
import { PenLine, Plus } from 'lucide-react';
import { SearchBar } from './SearchBar';

const NAV_LINKS = [
  { label: 'Obras', href: '/obras' },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:gap-6 lg:px-8">

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950"
        >
          <div className="hidden h-6 w-1.5 rounded-full bg-unicamp sm:block" />
          <span className="font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            Acervo <span className="text-unicamp">Valente</span>
          </span>
        </Link>

        <div className="flex flex-1 justify-center px-2 md:px-6">
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden h-6 w-px bg-zinc-200 dark:bg-zinc-800 md:block" />

          <Link
            href="/contribuir"
            className="group flex items-center gap-2 rounded-full bg-unicamp px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp focus-visible:ring-offset-2 active:scale-95 sm:px-5 dark:focus-visible:ring-offset-zinc-950"
          >
            <PenLine className="hidden h-4 w-4 transition-transform group-hover:-rotate-12 sm:block" />
            <Plus className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:block">Cadastrar Obra</span>
            <span className="sm:hidden">Novo</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}