import Link from 'next/link';
import { SearchBar } from './SearchBar';

const NAV_LINKS = [
  { label: 'Obras', href: '/obras' },

];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 font-serif text-lg font-bold text-zinc-900 transition-opacity hover:opacity-75 sm:text-xl"
        >
          Acervo <span className="text-unicamp">Valente</span>
        </Link>

        {/* Search — grows to fill middle */}
        <div className="flex flex-1 justify-center px-2">
          <SearchBar />
        </div>

        {/* Nav links */}
        <div className="flex flex-shrink-0 items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden font-sans text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 sm:block"
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}