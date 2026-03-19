import { WordCloudCanvas } from './cloud/WordCloudCanvas.tsx';

export function WordCloudSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
     
          <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl">
            Uma vida de pesquisa
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-zinc-500">
            Os temas que permearam quatro décadas de investigação, orientação
            e produção acadêmica de José Armando Valente no NIED e na UNICAMP.
          </p>
        </div>

        {/* Cloud */}
        <div className="w-full overflow-hidden rounded-2xl   px-4 py-6 sm:px-8 sm:py-10">
          <WordCloudCanvas />
        </div>

      </div>
    </section>
  );
}