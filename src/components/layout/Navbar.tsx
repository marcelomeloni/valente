import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl font-bold text-zinc-900">
          Acervo <span className="text-unicamp">Valente</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link href="/obras" className="hover:text-unicamp transition-colors">
            Obras
          </Link>
         
        </div>
      </div>
    </nav>
  );
}