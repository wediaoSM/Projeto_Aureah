import Header from '../components/Header';
import FooterMinimal from '../components/FooterMinimal';

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-20 pb-10 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Planos e 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Preços
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades musicais. 
            Todos com qualidade profissional e direitos inclusos.
          </p>
        </div>
      </section>

      {/* Planos expandidos */}
      <section className="relative py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Seção de serviços avulsos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Serviços <span className="text-purple-400">Avulsos</span>
              </h2>
              <p className="text-gray-400">
                Para projetos pontuais e necessidades específicas
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Trilha Personalizada",
                  price: "R$ 49,99",
                  description: "Música exclusiva criada especificamente para seu projeto",
                  features: [
                    "Briefing detalhado",
                    "IA + refinamento humano",
                    "Múltiplas versões (15s, 30s, 60s)",
                    "Arquivos MP3 e WAV",
                    "Direitos comerciais inclusos",
                    "Entrega em 24-48h",
                    "Revisões incluídas"
                  ],
                  cta: "Solicitar Trilha"
                },
                {
                  title: "Pacote Temático",
                  price: "R$ 97",
                  description: "Coleções prontas organizadas por tema ou estilo",
                  features: [
                    "10-20 trilhas por pacote",
                    "Acesso imediato",
                    "Vários estilos e durações",
                    "Licença comercial vitalícia",
                    "Downloads ilimitados",
                    "Atualizações mensais",
                    "Suporte por email"
                  ],
                  cta: "Ver Pacotes"
                },
                {
                  title: "Audio Branding",
                  price: "R$ 100,00",
                  description: "Identidade sonora completa para sua marca",
                  features: [
                    "Estratégia de audio branding",
                    "Logo sonoro + jingles",
                    "Música ambiente personalizada",
                    "Guia de aplicação",
                    "Kit completo de áudios",
                    "Entrega em 7-14 dias",
                    "Suporte especializado"
                  ],
                  cta: "Solicitar Branding"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/30 transition-all">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <div className="text-3xl font-bold text-purple-300 mb-3">{service.price}</div>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start">
                        <span className="text-purple-400 mr-2 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm transition-all">
                    {service.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Planos mensais com destaque expandido */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Planos <span className="text-purple-400">Mensais</span>
              </h2>
              <p className="text-gray-400">
                Para quem precisa de música constantemente
              </p>
            </div>

            {/* Destaque Premium expandido */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 border border-purple-500/30 rounded-xl p-8 max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                    MAIS ESCOLHIDO
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Plano Premium
                  </h3>
                  <div className="text-4xl font-bold text-purple-300 mb-4">
                    R$ 39,99<span className="text-lg text-gray-500">/mês</span>
                  </div>
                  <p className="text-gray-300">
                    Biblioteca completa + sua música exclusiva todo mês
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-purple-300 font-semibold mb-4 flex items-center text-lg">
                      <span className="mr-3">📚</span> Biblioteca Musical Completa
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• 500+ trilhas organizadas</li>
                      <li>• <strong>Corporativo:</strong> 87 trilhas</li>
                      <li>• <strong>Reels & Social:</strong> 124 trilhas</li>
                      <li>• <strong>Marcas & Publicidade:</strong> 96 trilhas</li>
                      <li>• <strong>Fitness & Esportes:</strong> 73 trilhas</li>
                      <li>• <strong>Bem-estar & Spa:</strong> 45 trilhas</li>
                      <li>• <strong>Tecnologia:</strong> 38 trilhas</li>
                      <li>• <strong>E muito mais...</strong></li>
                      <li className="pt-2 border-t border-gray-600">• Downloads ilimitados</li>
                      <li>• Formatos MP3 e WAV</li>
                      <li>• Licença comercial incluída</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-purple-300 font-semibold mb-4 flex items-center text-lg">
                      <span className="mr-3">🎯</span> Música Exclusiva Mensal
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• 1 trilha personalizada/mês</li>
                      <li>• Criada especificamente para você</li>
                      <li>• Baseada no seu briefing</li>
                      <li>• IA + refinamento humano</li>
                      <li>• Entrega em 24-48h</li>
                      <li>• Múltiplas versões (15s, 30s, 60s)</li>
                      <li>• Revisões incluídas</li>
                      <li className="pt-2 border-t border-gray-600">
                        <strong className="text-purple-400">Valor se fosse avulso: R$ 197</strong>
                      </li>
                      <li className="text-green-400">
                        <strong>Sua economia: R$ 100/mês</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-purple-300 font-semibold mb-4 flex items-center text-lg">
                      <span className="mr-3">⚡</span> Benefícios Extras
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Suporte prioritário</li>
                      <li>• Acesso antecipado a novidades</li>
                      <li>• Desconto em serviços adicionais</li>
                      <li>• Consultoria musical básica</li>
                      <li>• Feedback profissional</li>
                      <li>• Cancelamento a qualquer momento</li>
                      <li className="pt-2 border-t border-gray-600">
                        <strong className="text-purple-400">Garantia:</strong>
                      </li>
                      <li>• 7 dias para testar grátis</li>
                      <li>• Satisfação garantida</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg text-lg">
                    🚀 Começar Premium Agora
                  </button>
                  <p className="text-xs text-gray-500 mt-3">
                    Cancele quando quiser • Sem compromisso • 7 dias grátis
                  </p>
                </div>
              </div>
            </div>

            {/* Outros planos */}
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  name: "Básico",
                  price: "47",
                  description: "Acesso total à nossa biblioteca musical",
                  features: [
                    "Biblioteca completa (500+ trilhas)",
                    "Download ilimitado",
                    "Licença comercial",
                    "Formatos MP3 e WAV",
                    "Suporte por email",
                    "Atualizações mensais"
                  ]
                },
                {
                  name: "Pro",
                  price: "197",
                  description: "Para quem precisa de música constantemente",
                  features: [
                    "Tudo do Premium +",
                    "Trilhas ilimitadas sob demanda",
                    "Audio branding básico",
                    "Entrega em 12-24h",
                    "Account manager dedicado",
                    "Prioridade máxima"
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-semibold text-white mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-purple-300 mb-3">
                      R$ {plan.price}<span className="text-sm text-gray-500">/mês</span>
                    </div>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all">
                    Assinar {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comparação de planos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Comparação de <span className="text-purple-400">Planos</span>
              </h2>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left text-white font-semibold p-4">Recursos</th>
                      <th className="text-center text-white font-semibold p-4">Básico<br/><span className="text-sm text-purple-300">R$ 47/mês</span></th>
                      <th className="text-center text-white font-semibold p-4 bg-purple-500/20">Premium<br/><span className="text-sm text-purple-300">R$ 97/mês</span></th>
                      <th className="text-center text-white font-semibold p-4">Pro<br/><span className="text-sm text-purple-300">R$ 197/mês</span></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      ["Biblioteca completa", "✓", "✓", "✓"],
                      ["Downloads ilimitados", "✓", "✓", "✓"],
                      ["Licença comercial", "✓", "✓", "✓"],
                      ["Música exclusiva mensal", "✗", "1 trilha", "Ilimitado"],
                      ["Suporte prioritário", "✗", "✓", "✓"],
                      ["Entrega express", "✗", "24-48h", "12-24h"],
                      ["Account manager", "✗", "✗", "✓"],
                      ["Audio branding", "✗", "✗", "✓"]
                    ].map((row, index) => (
                      <tr key={index} className="border-t border-gray-700/50">
                        <td className="text-gray-300 p-4 font-medium">{row[0]}</td>
                        <td className="text-center p-4 text-gray-400">{row[1]}</td>
                        <td className="text-center p-4 text-gray-300 bg-purple-500/10">{row[2]}</td>
                        <td className="text-center p-4 text-gray-400">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-400 mb-6">
                Fale conosco e vamos te ajudar a escolher o plano ideal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all">
                  Falar com Especialista
                </button>
                <button className="px-6 py-3 border border-purple-400 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all">
                  Agendar Demonstração
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </main>
  );
}