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
  return (
    <section className="w-full bg-offwhite py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <p className="mb-16 font-sans text-xs font-medium uppercase tracking-[0.2em] text-unicamp">
       Legado
        </p>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        <div className="mb-24 grid grid-cols-2 gap-px bg-zinc-200 overflow-hidden rounded-2xl sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col justify-between bg-white p-6 sm:p-8">
              <span className="font-serif text-4xl font-bold text-zinc-900 sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-4 font-sans text-xs font-medium uppercase leading-snug tracking-widest text-zinc-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main grid: awards left, residencies right ──────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:items-start">

          {/* Awards — 3 cols */}
          <div className="lg:col-span-3">
            <h2 className="mb-10 font-serif text-3xl font-bold text-zinc-900 sm:text-4xl">
              Prêmios e honrarias
            </h2>

            <div className="flex flex-col">
              {AWARDS.map((award, i) => (
                <div
                  key={i}
                  className="group relative flex items-start gap-5 border-t border-zinc-200 py-5 transition-colors duration-200 last:border-b hover:bg-white"
                  style={{ marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
                >
                  {/* Year badge */}
                  <span className="w-10 flex-shrink-0 font-sans text-xs font-medium tabular-nums text-zinc-400 pt-0.5">
                    {award.year}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-sans text-sm font-semibold leading-snug ${
                        award.weight === 'high' ? 'text-zinc-900' : 'text-zinc-700'
                      }`}
                    >
                      {award.title}
                    </p>
                    <p className="mt-1 font-sans text-xs text-zinc-400">
                      {award.institution}
                    </p>
                  </div>

                  {/* Unicamp dot for high-weight */}
                  {award.weight === 'high' && (
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-unicamp" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: residencies + closing quote — 2 cols */}
          <div className="flex flex-col gap-10 lg:col-span-2">

            {/* International residencies */}
            <div>
              <h3 className="mb-6 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
                Residências internacionais
              </h3>
              <div className="flex flex-col gap-4">
                {RESIDENCIES.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-sans text-xs font-medium tabular-nums text-unicamp">
                        {r.period}
                      </span>
                      <span className="font-sans text-xs text-zinc-400">{r.city}</span>
                    </div>
                    <p className="font-sans text-sm font-semibold text-zinc-900">{r.place}</p>
                    <p className="mt-0.5 font-sans text-xs text-zinc-500">{r.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CNPq advisory */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
                Assessoria CNPq
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-zinc-700">Comitê de Educação</span>
                  <span className="font-sans text-xs font-medium tabular-nums text-zinc-500">2011–2014</span>
                </div>
                <div className="h-px bg-zinc-100" />
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-zinc-700">Desenvolvimento Tecnológico</span>
                  <span className="font-sans text-xs font-medium tabular-nums text-zinc-500">2019–2022</span>
                </div>
              </div>
            </div>

            {/* Closing quote */}
            <div className="border-l-2 border-unicamp pl-6">
              <p className="font-serif text-lg font-light italic leading-relaxed text-zinc-800">
                "O sonho está relacionado ao desejo de que cada indivíduo da nossa sociedade tenha a oportunidade de desenvolver a consciência sobre seu próprio processo de aprender."
              </p>
              <p className="mt-4 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
                José Armando Valente
              </p>
            </div>
          </div>
        </div>

   
      </div>
    </section>
  );
}