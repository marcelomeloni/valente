import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex w-full overflow-hidden bg-black py-16 sm:py-24 lg:min-h-[calc(100vh-4rem)]">
      {/* Contêiner da Imagem */}
      <div className="absolute bottom-0 right-0 top-16 z-0 flex w-full justify-end lg:w-2/5">
        <Image
          src="/fotovalentee.png"
          alt="Retrato do Professor José Armando Valente"
          width={700}
          height={840}
          className="h-full w-auto object-contain object-right-bottom"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/30 lg:to-transparent" />
      </div>

      {/* Conteúdo de Texto */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-6 lg:w-[55%] lg:pr-8">
          <h1 className="font-serif text-5xl font-bold uppercase tracking-tight text-white sm:text-7xl">
            José Armando <br />
            <span className="text-unicamp">Valente</span>
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-zinc-200 sm:text-2xl">
              Professor Titular da Unicamp, NIED/IMECC
            </h2>
            <p className="text-lg text-zinc-400">
              Pioneiro da Informática na Educação e do Construcionismo no Brasil.
            </p>
          </div>

          <blockquote className="border-l-4 border-unicamp pl-4 font-serif text-xl italic text-zinc-300">
            "O verdadeiro aprendizado é uma construção interna."
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/obras"
              className="rounded-md bg-unicamp px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              Explorar o Acervo
            </Link>
            <Link
              href="/biografia"
              className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ler Biografia Completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}