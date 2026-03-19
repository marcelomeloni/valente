'use client';

import { useState } from 'react';
import { LogoModal } from './logo/LogoModal';

export function TurtleSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="w-full bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-unicamp">
            Linguagem Logo · Ferramenta de pensamento
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
            A Tartaruga que
            <br />
            obedecia crianças
          </h2>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

          {/* Left: narrative */}
          <div className="flex flex-col gap-6 font-sans">
            <p className="text-xl leading-relaxed text-zinc-800">
              No centro da abordagem construcionista de Valente estava um
              personagem inusitado: uma tartaruga. Criada originalmente por
              Seymour Papert no MIT, ela era o avatar da linguagem de
              programação Logo, e se tornou, nas mãos de Valente, um dos
              instrumentos pedagógicos mais poderosos já introduzidos nas
              escolas públicas brasileiras.
            </p>
            <p className="leading-relaxed text-zinc-600">
              A tartaruga podia existir na tela do computador como um cursor
              geométrico, ou no chão da sala de aula como um robô físico
              construído com motores reaproveitados e peças de sucata. Nos
              dois casos, a lógica era a mesma: a criança dava ordens à
              máquina, e a máquina obedecia.
            </p>
            <p className="leading-relaxed text-zinc-600">
              Esse detalhe, aparentemente simples, era uma inversão completa
              da relação usual entre aluno e tecnologia. O computador não
              ensinava. Não avaliava. Não punia o erro com uma tela vermelha.
              Ele simplesmente executava o que a criança descrevia, com
              precisão absoluta e sem julgamento. Se o resultado não era o
              esperado, o problema estava na instrução, e cabia ao aluno
              descobrir onde.
            </p>
            <p className="leading-relaxed text-zinc-600">
              Foi assim que Valente transformou o ato de programar em um
              exercício de pensamento. Cada tentativa frustrada era um dado.
              Cada correção, um degrau. A tartaruga não ensinava geometria:
              ela fazia a criança precisar de geometria para alcançar o que
              queria construir.
            </p>
          </div>

          {/* Right: two stacked cards */}
          <div className="flex flex-col gap-6">

            <div className="rounded-2xl border border-zinc-200 bg-offwhite p-8">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-unicamp">
                A tartaruga de solo
              </p>
              <p className="font-serif text-lg font-light leading-relaxed text-zinc-700">
                Nos anos 1980, a equipe do NIED construiu robôs físicos
                que se arrastavam pelo chão das salas de aula, deixando um
                rastro de tinta no papel. Era a gênese da robótica pedagógica
                no Brasil, feita de improvisação, engenharia e audácia.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-offwhite p-8">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-unicamp">
                O princípio cognitivo
              </p>
              <p className="font-serif text-lg font-light leading-relaxed text-zinc-700">
                Para fazer a tartaruga virar à direita, a criança precisava
                entender o que é a sua própria direita. O corpo entrava no
                cálculo. A matemática deixava de ser abstrata e passava a
                habitar a experiência física de quem aprendia.
              </p>
            </div>

          
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="group flex items-center gap-3 rounded-full border border-unicamp px-8 py-3.5 font-sans text-sm font-medium text-unicamp transition-all duration-200 hover:bg-unicamp hover:text-white"
          >
           
            Testar Logo
          </button>
        </div>

  
      </div>

      <LogoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}