'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '50', label: 'Teses de doutorado orientadas' },
  { value: '39', label: 'Dissertações de mestrado' },
  { value: '40+', label: 'Anos de pesquisa ininterrupta' },
  { value: '1983', label: 'Fundação do NIED/UNICAMP' },
];

const AWARDS = [
  {
    year: '2002',
    title: 'Ordem Nacional do Mérito Educativo',
    institution: 'Presidência da República Federativa do Brasil',
    weight: 'high',
  },
  {
    year: '2002',
    title: 'Prêmio Zeferino Vaz',
    institution: 'UNICAMP',
    weight: 'mid',
  },
  {
    year: '2009',
    title: 'Prêmio Jabuti',
    institution: 'Câmara Brasileira do Livro',
    weight: 'high',
  },
  {
    year: '2016',
    title: 'Prêmio Zeferino Vaz',
    institution: 'UNICAMP',
    weight: 'mid',
  },
  {
    year: '2016',
    title: 'Prêmio Dedicação ao Ensino',
    institution: 'UNICAMP',
    weight: 'mid',
  },
  {
    year: 'Int.',
    title: 'Lifetime Achievement Award FabLearn',
    institution: 'Columbia University · Teachers College, Nova York',
    weight: 'high',
  },
];

const RESIDENCIES = [
  {
    period: '2007–2008',
    role: 'Pesquisador Visitante',
    place: 'UCL Knowledge Lab',
    city: 'Londres, Reino Unido',
  },
  {
    period: '2017–2018',
    role: 'Visiting Scholar Sênior',
    place: 'Lemann Center · Stanford University',
    city: 'Califórnia, EUA',
  },
];

export function LegacySection() {
  const containerDef = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemDef = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="w-full bg-offwhite py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Label */}
        <motion.p 
          className="mb-16 font-sans text-xs font-bold uppercase tracking-[0.2em] text-unicamp"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Legado Acadêmico
        </motion.p>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        <motion.div 
          className="mb-24 grid grid-cols-2 gap-px bg-zinc-200 overflow-hidden rounded-3xl shadow-sm sm:grid-cols-4 border border-zinc-200"
          variants={containerDef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {STATS.map((s) => (
            <motion.div 
              key={s.label} 
              variants={itemDef}
              whileHover={{ backgroundColor: "#fcfcfc" }}
              className="group flex flex-col justify-between bg-white p-6 sm:p-8 transition-colors"
            >
              <span className="font-serif text-4xl font-bold text-zinc-900 sm:text-5xl lg:text-6xl group-hover:text-unicamp transition-colors">
                {s.value}
              </span>
              <span className="mt-6 font-sans text-[10px] font-bold uppercase leading-snug tracking-widest text-zinc-400">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main grid: awards left, residencies right ──────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:items-start">

          {/* Awards — 3 cols */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-10 font-serif text-3xl font-bold text-zinc-900 sm:text-4xl">
              Prêmios e honrarias
            </h2>

            <div className="flex flex-col">
              {AWARDS.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 8, backgroundColor: "#ffffff" }}
                  className="group relative flex items-start gap-5 border-t border-zinc-200 py-6 transition-all duration-300 last:border-b rounded-lg -mx-4 px-4 hover:shadow-sm"
                >
                  {/* Year badge */}
                  <span className="w-10 flex-shrink-0 font-sans text-xs font-bold tabular-nums text-zinc-400 pt-0.5">
                    {award.year}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-sans text-sm font-bold leading-snug transition-colors group-hover:text-unicamp ${
                        award.weight === 'high' ? 'text-zinc-900' : 'text-zinc-700'
                      }`}
                    >
                      {award.title}
                    </p>
                    <p className="mt-1 font-sans text-xs text-zinc-500">
                      {award.institution}
                    </p>
                  </div>

                  {/* Unicamp dot for high-weight */}
                  {award.weight === 'high' && (
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-unicamp shadow-[0_0_8px_rgba(204,0,0,0.5)]" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: residencies + closing quote — 2 cols */}
          <motion.div 
            className="flex flex-col gap-12 lg:col-span-2"
            variants={containerDef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
          >

            {/* International residencies */}
            <motion.div variants={itemDef}>
              <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                Residências internacionais
              </h3>
              <div className="flex flex-col gap-4">
                {RESIDENCIES.map((r, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-sans text-xs font-bold tabular-nums text-unicamp bg-unicamp/10 px-2 py-1 rounded-md">
                        {r.period}
                      </span>
                      <span className="font-sans text-xs font-medium text-zinc-400">{r.city}</span>
                    </div>
                    <p className="font-sans text-sm font-bold text-zinc-900">{r.place}</p>
                    <p className="mt-0.5 font-sans text-xs font-medium text-zinc-500">{r.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CNPq advisory */}
            <motion.div variants={itemDef} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                Assessoria CNPq
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between group">
                  <span className="font-sans text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">Comitê de Educação</span>
                  <span className="font-sans text-xs font-bold tabular-nums text-zinc-400">2011–2014</span>
                </div>
                <div className="h-px bg-zinc-100" />
                <div className="flex items-center justify-between group">
                  <span className="font-sans text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">Desenvolvimento Tecnológico</span>
                  <span className="font-sans text-xs font-bold tabular-nums text-zinc-400">2019–2022</span>
                </div>
              </div>
            </motion.div>

            {/* Closing quote */}
            <motion.div 
              variants={itemDef} 
              className="relative rounded-3xl bg-zinc-900 p-8 text-white shadow-xl"
            >
              {/* Quote mark accent */}
              <span className="absolute -top-4 -left-2 text-6xl text-unicamp opacity-50 font-serif">"</span>
              <p className="relative z-10 font-serif text-lg font-light italic leading-relaxed text-zinc-200">
                O sonho está relacionado ao desejo de que cada indivíduo da nossa sociedade tenha a oportunidade de desenvolver a consciência sobre seu próprio processo de aprender.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-0.5 w-6 bg-unicamp" />
                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  José Armando Valente
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}