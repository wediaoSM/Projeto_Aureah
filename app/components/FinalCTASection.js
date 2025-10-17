'use client';

export default function FinalCTASection() {
  const benefits = [
    { icon: "⚡", text: "Entrega em 24-48h" },
    { icon: "🔄", text: "Revisões incluídas" },
    { icon: "📜", text: "Direitos comerciais" },
    { icon: "✅", text: "Satisfação garantida" }
  ];

  return (
    <section className="relative py-24 px-4 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-12 shadow-2xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8">
            🎵 Sua música única te espera
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto para criar sua 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}trilha épica?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transforme sua visão em realidade sonora. Nossa equipe combina IA avançada com criatividade humana 
            para entregar a trilha perfeita para seu projeto.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-xl mb-3 shadow-lg shadow-purple-500/25">
                  {benefit.icon}
                </div>
                <span className="text-gray-300 text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5511999999999?text=Olá! Quero criar uma trilha personalizada para meu projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-purple-500/25 inline-flex items-center justify-center group"
              >
                <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                </svg>
                Começar agora no WhatsApp
              </a>
              
              <a 
                href="mailto:contato@intotheshadows.com.br"
                className="px-10 py-5 border-2 border-purple-400 text-purple-300 font-bold text-lg rounded-xl hover:bg-purple-500/10 hover:border-purple-300 transition-all inline-flex items-center justify-center group"
              >
                <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar por e-mail
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Resposta em 2h
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Orçamento grátis
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Sem compromisso
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}