'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogoModal } from './logo/LogoModal';
import { Terminal } from 'lucide-react';

export function TurtleSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-white py-28 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-zinc-50 to-transparent -z-10 opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div 
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-unicamp/10 text-unicamp">
              <Terminal className="h-4 w-4" />
            </span>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-unicamp">
              Linguagem Logo
            </p>
          </div>
          <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            A Tartaruga que <br /> obedecia crianças
          </h2>
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

          {/* Left: narrative */}
          <motion.div 
            className="flex flex-col gap-6 font-sans"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {[
              "No centro da abordagem construcionista de Valente estava um personagem inusitado: uma tartaruga. Criada originalmente por Seymour Papert no MIT, ela era o avatar da linguagem de programação Logo, e se tornou, nas mãos de Valente, um dos instrumentos pedagógicos mais poderosos já introduzidos nas escolas públicas brasileiras.",
              "A tartaruga podia existir na tela do computador como um cursor geométrico, ou no chão da sala de aula como um robô físico construído com motores reaproveitados e peças de sucata. Nos dois casos, a lógica era a mesma: a criança dava ordens à máquina, e a máquina obedecia.",
              "Esse detalhe, aparentemente simples, era uma inversão completa da relação usual entre aluno e tecnologia. O computador não ensinava. Não avaliava. Não punia o erro com uma tela vermelha. Ele simplesmente executava o que a criança descrevia, com precisão absoluta e sem julgamento.",
              "Foi assim que Valente transformou o ato de programar em um exercício de pensamento. A tartaruga não ensinava geometria: ela fazia a criança precisar de geometria para alcançar o que queria construir."
            ].map((text, idx) => (
              <motion.p 
                key={idx} 
                variants={itemVariants}
                className={`leading-relaxed ${idx === 0 ? 'text-xl font-medium text-zinc-800' : 'text-zinc-600'}`}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* Right: two stacked cards */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-default rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-unicamp/30 hover:shadow-xl hover:shadow-unicamp/5"
            >
              <div className="h-1 w-12 bg-unicamp mb-6 rounded-full transition-all group-hover:w-16" />
              <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-unicamp">
                A tartaruga de solo
              </p>
              <p className="font-serif text-lg font-light leading-relaxed text-zinc-700">
                Nos anos 1980, a equipe do NIED construiu robôs físicos que se arrastavam pelo chão das salas de aula, deixando um rastro de tinta no papel. Era a gênese da robótica pedagógica no Brasil.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-default rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-unicamp/30 hover:shadow-xl hover:shadow-unicamp/5"
            >
              <div className="h-1 w-12 bg-unicamp mb-6 rounded-full transition-all group-hover:w-16" />
              <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-unicamp">
                O princípio cognitivo
              </p>
              <p className="font-serif text-lg font-light leading-relaxed text-zinc-700">
                Para fazer a tartaruga virar à direita, a criança precisava entender o que é a sua própria direita. A matemática deixava de ser abstrata e passava a habitar a experiência física.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group relative overflow-hidden rounded-full border-2 border-unicamp px-10 py-4 font-sans text-sm font-bold uppercase tracking-widest text-unicamp transition-all duration-300 hover:bg-unicamp hover:text-white hover:shadow-lg hover:shadow-unicamp/20 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Testar Simulador Logo
            </span>
          </button>
        </motion.div>
      </div>

      <LogoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}