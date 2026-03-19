export function InversionSection() {
  return (
    <section className="w-full bg-offwhite py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

 

        {/* The manifesto statement */}
        <div className="mb-20">
          {/* Crossed-out old paradigm */}
          <p className="mb-4 font-serif text-2xl font-light text-zinc-400 sm:text-3xl md:text-4xl">
            <span className="relative inline-block">
              A máquina ensina a criança.
              {/* Strikethrough line */}
              <span
                className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-unicamp"
                aria-hidden="true"
              />
            </span>
          </p>

          {/* The inversion */}
          <h2 className="font-serif text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            A criança ensina
            <br />
            <span className="text-unicamp">o computador.</span>
          </h2>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

          {/* Left: explanation */}
          <div className="flex flex-col gap-6 font-sans">
            <p className="text-xl leading-relaxed text-zinc-800">
              Essa inversão de quatro palavras resume a ruptura central que
              Valente passou décadas construindo. No modelo dominante, o
              computador era programado para testar, corrigir e avaliar o
              aluno. A máquina sabia. O aluno respondia.
            </p>
            <p className="leading-relaxed text-zinc-600">
              Valente virou essa lógica de ponta a cabeça. No ambiente
              construcionista que ele ajudou a fundar no Brasil, o aluno é
              quem programa. Quem dá ordens. Quem decide o que a máquina
              vai fazer e como vai fazê-lo. O computador, nesse modelo, não
              tem agenda pedagógica própria. Ele é uma ferramenta obediente
              que executa exatamente o que foi instruído a executar.
            </p>
            <p className="leading-relaxed text-zinc-600">
              Essa aparente simplicidade tem consequências profundas. Para
              programar algo, o aluno precisa primeiro entender o que quer.
              Depois precisa descrever esse entendimento de forma precisa o
              suficiente para que uma máquina sem interpretação o execute.
              O processo de ensinar o computador é, na prática, o processo
              de organizar o próprio pensamento.
            </p>
          </div>

          {/* Right: three contrasts */}
          <div className="flex flex-col divide-y divide-zinc-200">
            {[
              {
                before: 'O computador avalia o aluno.',
                after: 'O aluno avalia o resultado do seu próprio código.',
              },
              {
                before: 'O erro é punido com nota baixa.',
                after: 'O erro é um bug. Encontrá-lo é parte do aprendizado.',
              },
              {
                before: 'O professor transmite o conteúdo.',
                after: 'O aluno constrói o conhecimento ao construir o projeto.',
              },
            ].map((pair, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 py-6">
                <p className="font-sans text-sm leading-relaxed text-zinc-400 line-through">
                  {pair.before}
                </p>
                <p className="font-sans text-sm font-medium leading-relaxed text-zinc-800">
                  {pair.after}
                </p>
              </div>
            ))}

            {/* Column headers at the bottom */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
                Instrucionismo
              </p>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-unicamp">
                Construcionismo
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}