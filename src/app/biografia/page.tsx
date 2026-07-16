import { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Calendar, Mail, Building, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Biografia | Acervo Valente',
  description: 'Biografia e trajetória do Professor José Armando Valente.',
};

export default function BiografiaPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar para o início
        </Link>

        <article className="space-y-16">
          
          {/* Header */}
          <header className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
               <div className="hidden h-6 w-1.5 rounded-full bg-unicamp sm:block" />
               <span className="font-sans text-xs font-bold uppercase tracking-widest text-unicamp">Em Memória</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              José Armando Valente
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Pesquisador, educador e uma das principais referências do construcionismo e da tecnologia educacional no Brasil.
            </p>
          </header>

          {/* Dados Biográficos */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">Dados Biográficos</h2>
            <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
               <div className="space-y-1">
                 <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <Calendar className="h-4 w-4" /> Vida
                 </div>
                 <p className="font-medium text-zinc-900 dark:text-zinc-100">1948 — 28 de dezembro de 2025 (aos 77 anos)</p>
               </div>
               <div className="space-y-1">
                 <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <Mail className="h-4 w-4" /> E-mail Institucional
                 </div>
                 <p className="font-medium text-zinc-900 dark:text-zinc-100">jvalente@unicamp.br</p>
               </div>
               <div className="space-y-1">
                 <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <Building className="h-4 w-4" /> Vínculo NIED/Unicamp
                 </div>
                 <p className="font-medium text-zinc-900 dark:text-zinc-100">01/03/1983 — 28/12/2025</p>
               </div>
               <div className="space-y-1">
                 <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <ExternalLink className="h-4 w-4" /> Lattes
                 </div>
                 <a href="http://lattes.cnpq.br/8919503255281132" target="_blank" rel="noopener noreferrer" className="inline-flex font-medium text-unicamp hover:underline">
                   Acessar Currículo Lattes
                 </a>
               </div>
            </div>
          </section>

          {/* Formação Acadêmica */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
               <GraduationCap className="h-6 w-6 text-unicamp" /> Formação Acadêmica
            </h2>
            <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
               <li className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-100">Livre-docência</strong> — Departamento de Multimeios, Mídia e Comunicação, Instituto de Artes da Unicamp (2005)
                  </div>
               </li>
               <li className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-100">Doutor</strong> — Departamento de Engenharia Mecânica e Divisão para o Estudo e Pesquisa em Educação, MIT (1983)
                  </div>
               </li>
               <li className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-100">Mestre (Programa Interdisciplinar)</strong> — Ciência e Educação, MIT (1979)
                  </div>
               </li>
               <li className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-100">Mestre em Ciência da Computação</strong> — IMECC, Unicamp (1974)
                  </div>
               </li>
               <li className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-100">Engenheiro Mecânico</strong> — Escola de Engenharia de São Carlos, USP (1970)
                  </div>
               </li>
            </ul>
          </section>

          {/* Atuação Institucional */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">Atuação Institucional</h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Pesquisador colaborador do <strong className="text-zinc-900 dark:text-zinc-100">Núcleo de Informática Aplicada à Educação (NIED)</strong>, da Unicamp, e do Programa de Pós-graduação em Metodologias para o Ensino de Linguagens e suas Tecnologias, da UNOPAR.
                Foi um dos <strong className="text-zinc-900 dark:text-zinc-100">fundadores do NIED</strong>, criado a partir de seu retorno ao Brasil nos anos 1980, período em que os computadores ainda eram considerados artigos de luxo no país.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2 pt-4">
                 <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 uppercase text-xs tracking-widest">Linhas de Pesquisa</h3>
                    <ul className="space-y-2 text-sm">
                       <li>• Formação de profissionais da Educação</li>
                       <li>• Multimeios e ensino-aprendizagem</li>
                       <li>• Construcionismo e Metodologias Ativas (Robótica pedagógica, STEAM e Maker)</li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 uppercase text-xs tracking-widest">Projetos Institucionais</h3>
                    <ul className="space-y-2 text-sm">
                       <li>• FUNDAP (Fundação de Desenvolvimento Administrativo)</li>
                       <li>• OEA</li>
                       <li>• SuperLogo</li>
                       <li>• Maker Culture Project (Columbia University)</li>
                    </ul>
                 </div>
              </div>
            </div>
          </section>

          {/* Trajetória e Contribuições */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              Trajetória e Contribuições
            </h2>
            
            <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">O encontro que mudou uma carreira</h3>
                <p>
                  Em 1975, ainda pesquisador na Unicamp, José Valente recebeu Seymour Papert e Marvin Minsky — pioneiros da inteligência artificial no MIT — em uma visita ao Brasil. Ao apresentar a Papert um projeto próprio para ensino de matemática de forma linear e automatizada, ouviu a resposta franca que reorientaria sua trajetória: aquilo não era, de forma alguma, o que Papert tinha em mente.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">Formação no MIT e o desenvolvimento do Logo</h3>
                <p>
                  Insatisfeito com os rumos de seu trabalho em ciência da computação, mudou-se para os Estados Unidos em 1976, onde permaneceu por oito anos cursando mestrado e doutorado no MIT. Nesse período, contribuiu para o desenvolvimento da linguagem de programação <strong className="text-zinc-900 dark:text-zinc-100">Logo</strong>, conhecida pela &quot;tartaruga&quot; robótica capaz de desenhar formas geométricas no chão a partir de comandos — uma experiência em que a criança projetava o próprio corpo no movimento da máquina.
                </p>
                <p>
                  Ainda nos Estados Unidos, teve contato com projetos que traduziam movimentos de pessoas com paralisia cerebral em ações no computador, experiência que reforçou sua visão de uma tecnologia socialmente transformadora. Foi também nesse período que conheceu <strong className="text-zinc-900 dark:text-zinc-100">Ann Berger</strong>, sua companheira de vida e de pesquisa.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">Construcionismo e pedagogia da autonomia</h3>
                <p>
                  De volta ao Brasil, Valente tornou-se um dos principais articuladores entre o <strong className="text-zinc-900 dark:text-zinc-100">construcionismo de Seymour Papert</strong> e a <strong className="text-zinc-900 dark:text-zinc-100">pedagogia da autonomia de Paulo Freire</strong>. Compreendia a programação de computadores como um ato de alfabetização e conscientização — o computador como um &quot;espelho da mente&quot; — e defendia, com base em Freire, que o uso de tecnologias na educação não deveria ser mecânico ou meramente instrumental, mas fruto de reflexão crítica do educador sobre para que, para quem e em que contexto essas ferramentas são utilizadas.
                </p>
                <div className="my-6 border-l-4 border-unicamp bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
                   <p className="text-zinc-800 dark:text-zinc-200 font-medium italic">
                     Liderou a formação de professores em torno do conceito de <strong className="text-unicamp">&quot;Espiral de Aprendizagem&quot;</strong>, no qual o erro (o &quot;bug&quot;) deixa de ser falha e passa a ser motor do conhecimento: ao depurar um código, o aluno depura o próprio pensamento.
                   </p>
                </div>
                <p>
                  Foi responsável pela <strong className="text-zinc-900 dark:text-zinc-100">tradução para o português</strong> da obra de Seymour Papert <em>&quot;Logo: computadores e educação&quot;</em> (1985), publicação que se tornou a principal referência do construcionismo no Brasil.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">Produção intelectual e legado</h3>
                <p>
                  Organizou a coletânea <em>&quot;Tecnologia e Educação: passado, presente e o que está por vir&quot;</em>, na qual defendia que a inovação em educação é, sobretudo, humana — e que a escola deveria deixar de ser um &quot;esquema de expulsão&quot; para se tornar um ambiente de convivência e experimentação.
                </p>
                <p>
                  Em outubro de 2025, na 5ª Conferência Brasileira de Aprendizagem Criativa, em Brasília, participou do relançamento da obra de Papert, agora intitulada <em>&quot;Mindstorms: crianças, computadores e poderosas ideias&quot;</em>, ocasião em que discutiu com Ann Berger como a inteligência artificial generativa poderia expandir os princípios do construcionismo por meio do diálogo reflexivo entre aluno e máquina.
                </p>
              </div>
            </div>
          </section>

          {/* Reconhecimento */}
          <section className="space-y-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-8">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">Reconhecimento</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              Em nota de pesar, a <strong className="text-zinc-900 dark:text-zinc-100">Rede Brasileira de Aprendizagem Criativa (RBAC)</strong> destacou sua trajetória como pesquisador do NIED/Unicamp, professor e formador de educadores, reconhecendo-o como um dos pioneiros da informática na educação no Brasil e como uma figura essencial na articulação entre teoria e prática, tecnologia e educação, sempre em defesa de uma aprendizagem mais humana, significativa e criativa.
            </p>
          </section>

          {/* Fontes */}
          <footer className="pt-8 text-sm text-zinc-500 dark:text-zinc-400">
            <p>
              <strong>Fontes:</strong> Porvir — Inovações em Educação (29/12/2025); Núcleo de Informática Aplicada à Educação (NIED), Unicamp.
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
}
