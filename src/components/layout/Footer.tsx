export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:flex-row">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} NIED - Unicamp. Acervo Prof. José Armando Valente.
        </p>
        <div className="flex gap-4 text-sm text-zinc-500">
          <a href="https://www.nied.unicamp.br/" target="_blank" rel="noreferrer" className="hover:text-unicamp transition-colors">
            Sobre o NIED
          </a>
        </div>
      </div>
    </footer>
  );
}