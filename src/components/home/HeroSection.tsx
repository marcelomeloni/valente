'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  return (
    <section className="relative flex w-full overflow-hidden bg-[#050505] py-16 sm:py-24 lg:min-h-[calc(100vh-4rem)]">
      {/* Contêiner da Imagem */}
      <motion.div 
        className="absolute bottom-0 right-0 top-16 z-0 flex w-full justify-end lg:w-[45%]"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/fotovalentee.png"
          alt="Retrato do Professor José Armando Valente"
          width={800}
          height={940}
          className="h-full w-auto object-contain object-right-bottom opacity-90 mix-blend-lighten"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent lg:bg-gradient-to-r lg:from-[#050505] lg:via-[#050505]/50 lg:to-transparent" />
      </motion.div>

      {/* Conteúdo de Texto */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex max-w-2xl flex-col gap-6 lg:w-[60%] lg:pr-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl font-bold uppercase tracking-tighter text-white sm:text-7xl lg:text-[5.5rem] leading-[0.95]"
          >
            José Armando <br />
            <span className="text-unicamp bg-clip-text text-transparent bg-gradient-to-r from-unicamp to-red-500 block mt-2">Valente</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-4">
            <h2 className="text-xl font-semibold tracking-wide text-zinc-300 sm:text-2xl">
              Professor Titular da Unicamp, NIED/IMECC
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
              Pioneiro da Informática na Educação e do Construcionismo no Brasil. Uma vida dedicada a transformar como a tecnologia molda a aprendizagem.
            </p>
          </motion.div>

          <motion.blockquote 
            variants={itemVariants}
            className="mt-4 border-l-2 border-unicamp pl-6 py-2 font-serif text-2xl italic text-zinc-400"
          >
            "O verdadeiro aprendizado é uma construção interna."
          </motion.blockquote>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/obras"
              className="group relative overflow-hidden rounded-full bg-unicamp px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Explorar o Acervo</span>
            </Link>
            <Link
              href="/biografia"
              className="group rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5"
            >
              Ler Biografia Completa
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}