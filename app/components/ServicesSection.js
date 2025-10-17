'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatedSection, ScrollReveal } from './Animations';

export default function ServicesSection() {
  const router = useRouter();
  const { user } = useAuth();
  const services = [
    {
      icon: "🎵",
      title: "Trilhas Personalizadas",
      subtitle: "Música exclusiva para seu projeto",
      description: "Criamos do zero uma trilha única baseada na sua visão, combinando IA avançada com refinamento humano profissional.",
      features: [
        "Briefing detalhado e consultoria inicial",
        "Criação com IA + refinamento humano", 
        "Múltiplas versões (15s, 30s, 60s, full)",
        "Até 3 revisões incluídas",
        "Direitos comerciais totais",
        "Entrega garantida em 24-48h"
      ],
      price: "A partir de R$ 49,99",
      badge: "MAIS POPULAR",
      highlight: true,
      cta: "Criar minha trilha"
    },
    {
      icon: "📚",
      title: "Biblioteca Musical",
      subtitle: "Acesso total ao nosso catálogo",
      description: "Centenas de trilhas profissionais organizadas por categoria, estilo e duração. Licença comercial incluída.",
      features: [
        "500+ trilhas em alta qualidade",
        "Categorias: Animecore, Corporativo, Social...",
        "Download ilimitado",
        "Licença comercial vitalícia",
        "Novas trilhas todo mês",
        "Formatos múltiplos (WAV, MP3)"
      ],
      price: "R$ 39,99/mês",
      cta: "Acessar biblioteca"
    },
    {
      icon: "🏢", 
      title: "Audio Branding",
      subtitle: "Identidade sonora estratégica",
      description: "Desenvolvemos a identidade sonora completa da sua marca, desde logo sonoro até trilhas para diferentes contextos.",
      features: [
        "Estratégia de identidade sonora",
        "Logo sonoro exclusivo e memorável",
        "Suite completa de trilhas",
        "Manual de aplicação detalhado",
        "Consultoria estratégica contínua",
        "Suporte técnico especializado"
      ],
      price: "A partir de R$ 100,00",
      cta: "Consultar projeto"
    }
  ];

  const testimonials = [
    {
      text: "A trilha criada superou todas as expectativas. Aumentou o engajamento dos nossos vídeos em 300%!",
      author: "Marina Silva",
      role: "Criadora de Conteúdo",
      avatar: "👩‍💼"
    },
    {
      text: "Profissionalismo incrível. Entregaram exatamente o que pedimos em tempo recorde.",
      author: "Carlos Mendes", 
      role: "Diretor de Marketing",
      avatar: "👨‍💼"
    },
    {
      text: "A identidade sonora transformou nossa marca. Clientes reconhecem nosso áudio instantaneamente.",
      author: "Ana Costa",
      role: "CEO Startup",
      avatar: "👩‍💻"
    }
  ];

  return (
    <section className="relative py-24 px-4 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            ⚡ Soluções Profissionais
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Como podemos
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}ajudar você?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Oferecemos soluções completas de áudio para criadores, marcas e empresas. 
            Da trilha personalizada à identidade sonora estratégica.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover-lift ${
                service.highlight 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
                  : 'border-gray-800 hover:border-purple-500/30'
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Icon & Title */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-purple-300 font-medium mb-3">
                  {service.subtitle}
                </p>
                <div className="text-2xl font-bold text-white mb-4">
                  {service.price}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-center mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start">
                    <span className="text-purple-400 mr-3 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                onClick={() => {
                  if (service.title === 'Trilhas Personalizadas') {
                    router.push(user ? '/requests?tipo=trilha' : '/auth?mode=login');
                  } else if (service.title === 'Audio Branding') {
                    router.push(user ? '/requests?tipo=branding' : '/auth?mode=login');
                  } else if (service.title === 'Biblioteca Musical') {
                    router.push('/portfolio');
                  }
                }}
                className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                service.highlight
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg hover:shadow-purple-500/25'
                  : 'border border-purple-400 text-purple-300 hover:bg-purple-500/10'
              }`}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
            O que nossos clientes dizem
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 max-w-xs w-full transition-all duration-300 hover:scale-105"
              >
                <div className="text-gray-300 text-sm italic mb-4">
                  "{testimonial.text}"
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-purple-300 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400 text-sm">Trilhas Criadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-400 text-sm">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24h</div>
            <div className="text-gray-400 text-sm">Entrega Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm">Direitos Inclusos</div>
          </div>
        </div>
      </div>
    </section>
  );
}