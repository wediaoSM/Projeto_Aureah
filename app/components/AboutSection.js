'use client';

export default function AboutSection() {
  const teamMembers = [
    {
      name: "Alex Shadow",
      role: "Fundador & Produtor Musical",
      image: "/team/alex-shadow.jpg", // Placeholder - substituir por imagem real
      bio: "10+ anos criando trilhas para marcas globais. Especialista em neurobranding e psicoacústica."
    },
    {
      name: "Maria Tech",
      role: "Engenheira de IA Musical",
      image: "/team/maria-tech.jpg", // Placeholder - substituir por imagem real  
      bio: "PhD em Machine Learning aplicado à música. Desenvolve algoritmos que compreendem emoções."
    },
    {
      name: "João Beats",
      role: "Diretor Criativo",
      image: "/team/joao-beats.jpg", // Placeholder - substituir por imagem real
      bio: "Background em publicidade e sound design. Especialista em identidade sonora de marcas."
    }
  ];

  const achievements = [
    {
      icon: "🏆",
      title: "500+ Marcas Atendidas",
      description: "De startups a multinacionais"
    },
    {
      icon: "🎵",
      title: "10.000+ Trilhas Criadas",
      description: "Cada uma única e personalizada"
    },
    {
      icon: "⚡",
      title: "98% Satisfação",
      description: "Taxa de aprovação dos clientes"
    },
    {
      icon: "🚀",
      title: "24h Entrega Média",
      description: "Agilidade sem comprometer qualidade"
    }
  ];

  return (
    <section className="relative py-20 px-4 lg:px-8 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-4 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-3 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            👥 Nossa História
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sobre a Aureah Music Studio
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nascemos da paixão por música e da visão de que toda marca precisa de uma identidade sonora única e memorável.
          </p>
        </div>

        {/* Story & Mission */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Story */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Nossa Jornada
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Em 2023, percebemos que as marcas estavam perdendo oportunidades valiosas de conexão emocional com seus públicos. 
                  O som - elemento mais primitivo e poderoso da comunicação humana - estava sendo negligenciado.
                </p>
                <p>
                  Enquanto isso, a inteligência artificial estava revolucionando a criação musical, mas faltava o toque humano, 
                  a sensibilidade que transforma notas em emoções.
                </p>
                <p>
                  Foi assim que nasceu a <strong className="text-purple-300">Aureah</strong>: 
                  combinando o poder criativo da IA com a expertise de produtores musicais experientes em neurobranding.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                💡 Nosso Diferencial
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-purple-300">Neurobranding Musical:</strong> Aplicamos princípios da neurociência para criar trilhas que geram conexões emocionais específicas.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-purple-300">IA + Sensibilidade Humana:</strong> Tecnologia de ponta refinada pela experiência e intuição musical.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-purple-300">Processo Científico:</strong> Cada trilha é testada em aspectos como memorabilidade, emoção e adequação à marca.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Nossa Missão
              </h3>
              <blockquote className="text-lg text-gray-300 italic text-center leading-relaxed">
                "Democratizar o acesso a trilhas musicais de alta qualidade, permitindo que qualquer marca, 
                criador ou empresa tenha sua própria identidade sonora única e memorável."
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="text-white font-semibold mb-2">Visão</h4>
                <p className="text-gray-400 text-sm">
                  Ser a referência global em identidade sonora com IA
                </p>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">💎</div>
                <h4 className="text-white font-semibold mb-2">Valores</h4>
                <p className="text-gray-400 text-sm">
                  Inovação, qualidade, transparência e impacto emocional
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                🧠 Por que Neurobranding Musical?
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Estudos mostram que o cérebro processa música 5x mais rápido que texto. Uma trilha bem escolhida pode 
                aumentar o recall da marca em até 96% e gerar conexões emocionais duradouras com o público.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Conheça Nosso Time
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Especialistas em música, tecnologia e neurobranding trabalhando juntos para criar sua identidade sonora perfeita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Photo placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-purple-300 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Nossos Números
            </h3>
            <p className="text-gray-300">
              Resultados que comprovam nossa expertise e dedicação
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer saber mais sobre nossa história?
            </h3>
            <p className="text-gray-300 mb-6">
              Agende uma conversa conosco e descubra como podemos criar a identidade sonora perfeita para seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                Conheça mais sobre nós
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800/50 hover:border-purple-400 hover:text-white transition-all duration-300">
                Ver nossos cases de sucesso
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}