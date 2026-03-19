'use client';

import { motion } from 'framer-motion';
import { WordCloudCanvas } from './cloud/WordCloudCanvas';

export function WordCloudSection() {
  return (
    <section className="w-full bg-white py-20 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-unicamp/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-12 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
        >

          <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
            Uma vida de pesquisa
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-zinc-500">
            Os temas que permearam quatro décadas de investigação, orientação
            e produção acadêmica de José Armando Valente no NIED e na UNICAMP.
          </p>
        </motion.div>

        {/* Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white/50 backdrop-blur-md shadow-2xl shadow-zinc-200/50 px-4 py-8 sm:px-8 sm:py-12"
        >
          <WordCloudCanvas />
        </motion.div>

      </div>
    </section>
  );
}