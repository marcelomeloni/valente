'use client';

import { motion } from 'framer-motion';

export function InversionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-offwhite py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* The manifesto statement */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            {/* Crossed-out old paradigm */}
            <p className="mb-4 font-serif text-2xl font-light text-zinc-400 sm:text-3xl md:text-4xl">
              <span className="relative inline-block">
                A máquina ensina a criança.
                {/* Strikethrough line animated */}
                <motion.span
                  className="absolute left-0 top-1/2 h-[2px] bg-unicamp"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "anticipate" }}
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
          </motion.div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

          {/* Left: explanation */}
          <motion.div 
            className="flex flex-col gap-6 font-sans"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {[
              "Essa inversão de quatro palavras resume a ruptura central que Valente passou décadas construindo. No modelo dominante, o computador era programado para testar, corrigir e avaliar o aluno. A máquina sabia. O aluno respondia.",
              "Valente virou essa lógica de ponta a cabeça. No ambiente construcionista que ele ajudou a fundar no Brasil, o aluno é quem programa. Quem dá ordens. Quem decide o que a máquina vai fazer e como vai fazê-lo. O computador, nesse modelo, não tem agenda pedagógica própria.",
              "Essa aparente simplicidade tem consequências profundas. Para programar algo, o aluno precisa primeiro entender o que quer. Depois precisa descrever esse entendimento de forma precisa o suficiente para que uma máquina o execute. O processo de ensinar o computador é, na prática, o processo de organizar o próprio pensamento."
            ].map((text, i) => (
              <motion.p key={i} variants={itemVariants} className={`leading-relaxed ${i === 0 ? 'text-xl font-medium text-zinc-800' : 'text-zinc-600'}`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* Right: three contrasts */}
          <motion.div 
            className="flex flex-col divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
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
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="grid grid-cols-2 gap-6 py-6 transition-colors hover:bg-zinc-50 rounded-xl px-4 -mx-4"
              >
                <p className="font-sans text-sm leading-relaxed text-zinc-400 line-through decoration-unicamp/40 decoration-2">
                  {pair.before}
                </p>
                <p className="font-sans text-sm font-bold leading-relaxed text-zinc-800">
                  {pair.after}
                </p>
              </motion.div>
            ))}

            {/* Column headers at the bottom */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-6 px-4 -mx-4">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                Instrucionismo
              </p>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-unicamp">
                Construcionismo
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}