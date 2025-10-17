import Header from '../components/Header';
import FooterMinimal from '../components/FooterMinimal';

export default function ContatoPage() {
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
            Fale 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Conosco
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para transformar sua visão em realidade sonora. 
            Entre em contato e vamos criar algo incrível juntos.
          </p>
        </div>
      </section>

      {/* Contato principal */}
      <section className="relative py-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            
            {/* Formulário de contato */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Solicitar Orçamento
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome *
                    </label>
                    <input 
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input 
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input 
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Projeto *
                  </label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="trilha-personalizada">Trilha Personalizada</option>
                    <option value="audio-branding">Audio Branding</option>
                    <option value="plano-mensal">Plano Mensal</option>
                    <option value="pacote-tematico">Pacote Temático</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descreva seu projeto *
                  </label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Conte-nos sobre seu projeto: objetivo, estilo musical desejado, onde será usado, prazo, referências, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orçamento Estimado
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors">
                    <option value="">Selecione uma faixa</option>
                    <option value="ate-200">Até R$ 200</option>
                    <option value="200-500">R$ 200 - R$ 500</option>
                    <option value="500-1000">R$ 500 - R$ 1.000</option>
                    <option value="1000-mais">R$ 1.000+</option>
                    <option value="conversar">Prefiro conversar</option>
                  </select>
                </div>

                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-purple-500 border-gray-700 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    Aceito os <a href="#" className="text-purple-400 hover:text-purple-300">termos de uso</a> e 
                    <a href="#" className="text-purple-400 hover:text-purple-300"> política de privacidade</a> *
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Enviar Solicitação
                </button>
              </form>
            </div>

            {/* Informações de contato */}
            <div className="space-y-8">
              
              {/* Contato direto */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Contato Direto
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">WhatsApp</p>
                      <a 
                        href="https://wa.me/5511999999999?text=Olá! Gostaria de solicitar uma trilha personalizada."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        (11) 99999-9999
                      </a>
                      <p className="text-gray-500 text-xs">Resposta imediata</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">E-mail</p>
                      <a 
                        href="mailto:contato@intotheshadows.com.br"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        contato@intotheshadows.com.br
                      </a>
                      <p className="text-gray-500 text-xs">Resposta em até 2h úteis</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Horário de Atendimento</p>
                      <p className="text-gray-400 text-sm">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-gray-500 text-xs">Sábado: 9h às 14h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ rápido */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Perguntas Frequentes
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      q: "Quanto tempo leva para responder?",
                      a: "WhatsApp: imediato | E-mail: até 2h úteis"
                    },
                    {
                      q: "Posso solicitar orçamento gratuito?",
                      a: "Sim! Todos os orçamentos são gratuitos e sem compromisso"
                    },
                    {
                      q: "Atendem projetos urgentes?",
                      a: "Sim, temos opção express com entrega em 12h"
                    },
                    {
                      q: "Fazem reunião online?",
                      a: "Sim, agendamos calls para projetos complexos"
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-700/50 pb-3 last:border-b-0">
                      <p className="text-white text-sm font-medium mb-1">{faq.q}</p>
                      <p className="text-gray-400 text-xs">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garantias */}
              <div className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 border border-purple-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  🛡️ Nossas Garantias
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Resposta garantida em até 2h úteis
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Orçamento gratuito e sem compromisso
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Satisfação garantida ou reembolso
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Dados 100% protegidos e confidenciais
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Outras formas de contato */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Outras formas de <span className="text-purple-400">contato</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  platform: "Instagram",
                  handle: "@intotheshadows",
                  description: "Acompanhe nosso trabalho",
                  color: "bg-pink-500",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )
                },
                {
                  platform: "LinkedIn",
                  handle: "Into the Shadows",
                  description: "Conecte-se conosco",
                  color: "bg-blue-600",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                },
                {
                  platform: "YouTube",
                  handle: "Into the Shadows",
                  description: "Tutoriais e samples",
                  color: "bg-red-500",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )
                },
                {
                  platform: "Discord",
                  handle: "Comunidade",
                  description: "Chat em tempo real",
                  color: "bg-indigo-500",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  )
                }
              ].map((social, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all">
                  <div className={`w-12 h-12 ${social.color} rounded-lg mx-auto mb-4 flex items-center justify-center text-white`}>
                    {social.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{social.platform}</h3>
                  <p className="text-purple-400 text-sm mb-1">{social.handle}</p>
                  <p className="text-gray-500 text-xs">{social.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FooterMinimal />
    </main>
  );
}