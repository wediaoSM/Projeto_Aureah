'use client';

export default function AboutProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "Briefing Detalhado",
      description: "Conversamos sobre sua visão, objetivos e referências musicais",
      icon: "💭"
    },
    {
      number: "02", 
      title: "Criação com IA",
      description: "Geramos múltiplas versões usando inteligência artificial avançada",
      icon: "🤖"
    },
    {
      number: "03",
      title: "Refinamento Humano",
      description: "Nossos produtores refinam e personalizam cada detalhe",
      icon: "🎛️"
    },
    {
      number: "04",
      title: "Entrega & Revisões",
      description: "Receba sua trilha e solicite ajustes até a aprovação final",
      icon: "✅"
    }
  ];

  const stats = [
    { number: "500+", label: "Trilhas Criadas", icon: "🎵" },
    { number: "98%", label: "Taxa de Satisfação", icon: "⭐" },
    { number: "24h", label: "Entrega Média", icon: "⚡" },
    { number: "100%", label: "Direitos Inclusos", icon: "📜" }
  ];

  return (
    <section className="relative py-24 px-4 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            🚀 Processo Profissional
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Duas formas de ter
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}música exclusiva
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Biblioteca</strong> com centenas de trilhas prontas para usar, 
            ou <strong className="text-white">criação personalizada</strong> para seu projeto específico.
          </p>
        </div>

        {/* Dois Serviços Principais */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Biblioteca Musical */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all group">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                🎵
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Biblioteca Musical</h3>
              <div className="text-purple-300 font-medium text-sm mb-4">Perfeito para criadores de conteúdo</div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">500+ trilhas exclusivas</strong> organizadas por categoria</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">TikTok, YouTube, Instagram</strong> - formatos otimizados</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">Download instantâneo</strong> com licença comercial</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">Atualizações semanais</strong> com novas trilhas</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 hover:from-purple-500 hover:to-violet-600 text-white font-semibold rounded-lg transition-all">
              Explorar Biblioteca
            </button>
          </div>

          {/* Trilhas Personalizadas */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all group">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Trilhas Personalizadas</h3>
              <div className="text-violet-300 font-medium text-sm mb-4">Ideal para marcas e empresas</div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">100% personalizada</strong> para sua marca/projeto</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">Comerciais, vídeos, eventos</strong> - qualquer uso</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">Entrega em 24-48h</strong> com revisões ilimitadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span className="text-gray-300"><strong className="text-white">IA + produção humana</strong> para resultado único</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-violet-500/80 to-purple-600/80 hover:from-violet-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all">
              Solicitar Trilha Personalizada
            </button>
          </div>
        </div>

        {/* Stats & About */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Para cada tipo de criador
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-purple-300">Criadores de conteúdo</strong> (TikTokers, YouTubers, influenciadores): 
                Nossa biblioteca oferece trilhas exclusivas que ninguém mais tem, garantindo originalidade em seus vídeos.
              </p>
              <p className="leading-relaxed">
                <strong className="text-purple-300">Marcas e empresas</strong>: Trilhas 100% personalizadas para comerciais, 
                vídeos corporativos, eventos e campanhas. Criamos a identidade sonora perfeita para seu projeto.
              </p>
              <p className="leading-relaxed">
                <strong className="text-purple-300">Tecnologia IA + toque humano</strong>: Cada música combina inteligência 
                artificial avançada com refinamento de produtores profissionais.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                🎵 Acessar Biblioteca (500+ trilhas)
              </button>
              <button className="px-6 py-3 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all">
                ✨ Solicitar Trilha Personalizada
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}