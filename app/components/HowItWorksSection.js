'use client';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: "📝",
      title: "Briefing & Prompt",
      subtitle: "Conte sua visão",
      description: "Você nos descreve o que precisa: estilo, emoção, duração e contexto de uso. Quanto mais detalhes, melhor o resultado.",
      details: [
        "Questionário guiado",
        "Referências musicais",
        "Contexto de aplicação",
        "Especificações técnicas"
      ],
      duration: "5-10 min"
    },
    {
      number: "02", 
      icon: "🤖",
      title: "Geração com IA",
      subtitle: "Inteligência em ação",
      description: "Nossa IA processa seu briefing e gera múltiplas versões da trilha usando algoritmos avançados de composição musical.",
      details: [
        "Análise do prompt",
        "Geração de variações",
        "Aplicação de estilos",
        "Otimização técnica"
      ],
      duration: "2-5 min"
    },
    {
      number: "03",
      icon: "🎹",
      title: "Refinamento Humano", 
      subtitle: "Toque artístico",
      description: "Nossos produtores musicais refinam a trilha, ajustando arranjos, mixagem e garantindo que capture perfeitamente sua visão.",
      details: [
        "Análise musical profissional",
        "Ajustes de arranjo",
        "Mixagem e masterização",
        "Controle de qualidade"
      ],
      duration: "2-12 horas"
    },
    {
      number: "04",
      icon: "🚀",
      title: "Entrega Final",
      subtitle: "Pronto para usar",
      description: "Receba sua trilha em múltiplos formatos, com licença comercial inclusa e suporte para implementação.",
      details: [
        "Arquivos em alta qualidade",
        "Múltiplas versões (30s, 60s, loop)",
        "Licença comercial inclusa",
        "Suporte pós-entrega"
      ],
      duration: "Imediato"
    }
  ];

  const processHighlights = [
    {
      icon: "⚡",
      title: "Rápido & Eficiente",
      description: "De 24h a 48h do briefing à entrega final"
    },
    {
      icon: "🎨",
      title: "100% Original",
      description: "Cada trilha é única e criada especificamente para você"
    },
    {
      icon: "🔄",
      title: "Revisões Incluídas",
      description: "Ajustes ilimitados até ficar perfeito"
    },
    {
      icon: "📜",
      title: "Direitos Garantidos",
      description: "Licença comercial completa sem royalties"
    }
  ];

  return (
    <section className="relative py-20 px-4 lg:px-8 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-4 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-3 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            ⚙️ Nosso Processo
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Como Funciona
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Um processo simples e transparente que combina tecnologia de ponta com expertise musical humana.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-0"></div>
                )}
                
                {/* Step Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-500/30 h-full">
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 text-center">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-purple-300 text-sm font-medium mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-400 text-xs">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Duration */}
                  <div className="text-center pt-4 border-t border-gray-700/50">
                    <span className="text-purple-300 text-xs font-medium">
                      ⏱️ {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Highlights */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Por que escolher nosso processo?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Combinamos o melhor da tecnologia com a sensibilidade humana para entregar resultados excepcionais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer ver na prática?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experimente nosso processo gratuitamente. Envie seu briefing e receba uma prévia de 30 segundos sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                Testar gratuitamente
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800/50 hover:border-purple-400 hover:text-white transition-all duration-300">
                Ver exemplo de briefing
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <div className="bg-gray-900/20 backdrop-blur-lg border border-gray-700/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Ainda tem dúvidas sobre o processo?
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Confira nossa seção de perguntas frequentes ou fale diretamente conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 border border-purple-400 text-purple-300 font-medium rounded-lg hover:bg-purple-500/10 transition-all duration-300 text-sm">
                Ver FAQ completo
              </button>
              <button className="px-6 py-2 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800/50 hover:border-purple-400 hover:text-white transition-all duration-300 text-sm">
                Falar com especialista
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}