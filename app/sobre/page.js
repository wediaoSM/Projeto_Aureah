import Header from '../components/Header';
import FooterMinimal from '../components/FooterMinimal';

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-20 pb-10 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sobre a 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Into the Shadows
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pioneiros na criação de música com IA + refinamento humano. 
            Transformamos ideias em identidade sonora única.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="relative py-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Nossa <span className="text-purple-400">História</span>
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  A Into the Shadows nasceu da visão de democratizar a criação musical. 
                  Observamos que marcas, criadores e empresas tinham dificuldade em 
                  acessar música original de qualidade profissional de forma rápida e acessível.
                </p>
                <p>
                  Combinamos nossa paixão por música com as mais avançadas tecnologias 
                  de inteligência artificial, mantendo sempre o toque humano que faz 
                  toda a diferença no resultado final.
                </p>
                <p>
                  Hoje, já criamos mais de 500 trilhas para clientes em todo o Brasil, 
                  sempre com o mesmo compromisso: qualidade profissional, entrega rápida 
                  e satisfação garantida.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Nossa Missão</h3>
                <p className="text-gray-400 text-sm">
                  Tornar a música original acessível para todos, combinando tecnologia 
                  de ponta com sensibilidade artística humana.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">👁️ Nossa Visão</h3>
                <p className="text-gray-400 text-sm">
                  Ser a referência mundial em criação musical assistida por IA, 
                  mantendo a qualidade artística em primeiro lugar.
                </p>
              </div>
              
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">💎 Nossos Valores</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Qualidade sem compromisso</li>
                  <li>• Inovação responsável</li>
                  <li>• Transparência total</li>
                  <li>• Satisfação garantida</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Números que <span className="text-purple-400">Impressionam</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Trilhas Criadas", icon: "🎵" },
                { number: "98%", label: "Satisfação", icon: "⭐" },
                { number: "24h", label: "Entrega Média", icon: "⚡" },
                { number: "100%", label: "Direitos Inclusos", icon: "✅" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/30 transition-all">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="text-3xl font-bold text-purple-300 mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nossa Equipe */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Nossa <span className="text-purple-400">Equipe</span>
              </h2>
              <p className="text-gray-400">
                Profissionais apaixonados por música e tecnologia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Carlos Silva",
                  role: "CEO & Fundador",
                  bio: "15 anos na indústria musical, especialista em produção e tecnologia.",
                  skills: ["Estratégia", "Produção Musical", "Liderança"]
                },
                {
                  name: "Marina Santos",
                  role: "Head de IA",
                  bio: "Doutora em Machine Learning, pioneira em IA aplicada à música.",
                  skills: ["Machine Learning", "Audio Processing", "Python"]
                },
                {
                  name: "João Rodrigues",
                  role: "Produtor Musical",
                  bio: "Producer premiado com mais de 100 trilhas comerciais criadas.",
                  skills: ["Composição", "Mixagem", "Sound Design"]
                }
              ].map((member, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-300 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-xs mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nosso Processo */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Nosso <span className="text-purple-400">Diferencial</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🤖</span> Tecnologia Avançada
                </h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Modelos de IA treinados especificamente para música</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Análise de padrões musicais em tempo real</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Geração baseada em contexto emocional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Processamento de audio profissional</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🎹</span> Toque Humano
                </h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Produtores musicais experientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Refinamento artístico manual</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Mixagem e masterização profissional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>Controle de qualidade rigoroso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                O que nossos <span className="text-purple-400">clientes dizem</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "A qualidade das trilhas superou nossas expectativas. O processo é rápido e o resultado é profissional.",
                  author: "Ana Costa",
                  company: "Agência Digital XYZ"
                },
                {
                  quote: "Revolucionou nosso processo criativo. Agora temos música original para todos os nossos projetos.",
                  author: "Pedro Lima",
                  company: "Produtora Audiovisual"
                },
                {
                  quote: "O plano Premium é perfeito. Biblioteca completa + música exclusiva mensal. Vale cada centavo!",
                  author: "Mariana Santos",
                  company: "Criadora de Conteúdo"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <div className="text-purple-300 text-4xl mb-4">"</div>
                  <p className="text-gray-400 text-sm mb-4 italic">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compromissos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Nossos <span className="text-purple-400">Compromissos</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🔒",
                  title: "Segurança",
                  description: "Seus dados e projetos estão sempre protegidos"
                },
                {
                  icon: "⚡", 
                  title: "Rapidez",
                  description: "Entrega garantida em 24-48h para qualquer projeto"
                },
                {
                  icon: "💎",
                  title: "Qualidade",
                  description: "Padrão profissional em todas as nossas criações"
                },
                {
                  icon: "🤝",
                  title: "Parceria",
                  description: "Relacionamento duradouro e suporte contínuo"
                }
              ].map((commitment, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">{commitment.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{commitment.title}</h3>
                  <p className="text-gray-400 text-sm">{commitment.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 border border-purple-500/30 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Vamos criar juntos?
              </h3>
              <p className="text-gray-300 mb-6">
                Conte sua história através da música. Estamos aqui para transformar 
                sua visão em realidade sonora.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105">
                Conhecer Nossos Serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </main>
  );
}