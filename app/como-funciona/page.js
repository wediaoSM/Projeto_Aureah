import Header from '../components/Header';
import FooterMinimal from '../components/FooterMinimal';

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-20 pb-10 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Como 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Funciona
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Nosso processo simples e eficiente para criar sua trilha musical perfeita
          </p>
        </div>
      </section>

      {/* Processo detalhado */}
      <section className="relative py-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Processo em 4 etapas */}
          <div className="grid lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                step: "01",
                title: "Briefing Detalhado",
                description: "Conte-nos sobre seu projeto, objetivo, estilo musical desejado e onde será usado.",
                details: [
                  "Formulário online simples",
                  "Referências musicais",
                  "Contexto de uso",
                  "Duração desejada",
                  "Prazo necessário"
                ],
                icon: "📝"
              },
              {
                step: "02", 
                title: "Geração com IA",
                description: "Nossa IA avançada cria múltiplas versões baseadas no seu briefing.",
                details: [
                  "Algoritmos especializados",
                  "Múltiplas variações",
                  "Diferentes estilos",
                  "Ajustes automáticos",
                  "Qualidade profissional"
                ],
                icon: "🤖"
              },
              {
                step: "03",
                title: "Refinamento Humano", 
                description: "Nossos produtores musicais aperfeiçoam e personalizam cada trilha.",
                details: [
                  "Mixagem profissional",
                  "Ajustes de timing",
                  "Correções melódicas",
                  "Masterização final",
                  "Controle de qualidade"
                ],
                icon: "🎵"
              },
              {
                step: "04",
                title: "Entrega Final",
                description: "Receba sua trilha em múltiplos formatos com todos os direitos inclusos.",
                details: [
                  "Arquivos MP3 e WAV",
                  "Versões 15s, 30s, 60s",
                  "Licença comercial",
                  "Direitos inclusos",
                  "Suporte pós-entrega"
                ],
                icon: "🚀"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all h-full">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <div className="text-purple-300 font-bold text-sm mb-2">ETAPA {step.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-500 text-xs flex items-center">
                        <span className="text-purple-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Conectores */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Seção de Tecnologia */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Nossa <span className="text-purple-400">Tecnologia</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Combinamos as mais avançadas ferramentas de IA com a sensibilidade humana
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">⚡</span> Inteligência Artificial
                </h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Modelos de linguagem especializados em música</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Análise de padrões musicais avançada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Geração baseada em contexto e emoção</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Adaptação automática ao briefing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🎹</span> Expertise Humana
                </h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Produtores musicais experientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Mixagem e masterização profissional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Ajustes criativos e personalização</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Controle de qualidade rigoroso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Perguntas <span className="text-purple-400">Frequentes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Quanto tempo leva para receber minha trilha?",
                  a: "Normalmente entregamos em 24-48 horas. Para projetos urgentes, temos opção de entrega em 12 horas."
                },
                {
                  q: "Posso solicitar alterações na trilha?",
                  a: "Sim! Incluímos revisões no processo. Queremos que você fique 100% satisfeito com o resultado."
                },
                {
                  q: "Os direitos autorais estão inclusos?",
                  a: "Sim, você recebe licença comercial completa para usar a trilha em seus projetos sem limitações."
                },
                {
                  q: "Que formatos vocês entregam?",
                  a: "Entregamos em MP3 320kbps e WAV 24-bit, além de versões em diferentes durações (15s, 30s, 60s)."
                },
                {
                  q: "Vocês trabalham com que estilos musicais?",
                  a: "Todos! Pop, eletrônico, clássico, jazz, rock, ambient, world music - nossa IA é versátil em qualquer gênero."
                },
                {
                  q: "Posso usar a trilha comercialmente?",
                  a: "Absoluto! Todas as trilhas vêm com licença comercial completa para uso em publicidade, vídeos, podcasts, etc."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">{faq.q}</h4>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 border border-purple-500/30 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para começar?
              </h3>
              <p className="text-gray-300 mb-6">
                Vamos criar a trilha perfeita para seu projeto
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105">
                Solicitar Trilha
              </button>
            </div>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </main>
  );
}