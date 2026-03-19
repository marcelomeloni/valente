export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-zinc-100 bg-white py-8">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 md:flex-row">
        <p className="font-sans text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} Acervo Valente.
        </p>

        <a 
          href="#top" 
          className="font-sans text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-800"
        >
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}