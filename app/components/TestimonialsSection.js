'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    company: "Podcast Empreende+",
    role: "Produtora de Conteúdo",
    content: "A trilha criada para nosso podcast aumentou o engajamento em 40%. O processo foi super rápido e o resultado ficou perfeito para nossa identidade.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    project: "Trilha de Abertura - Podcast"
  },
  {
    id: 2,
    name: "Carlos Montenegro",
    company: "Montenegro Studios",
    role: "Diretor Criativo",
    content: "Trabalho com áudio há 15 anos e fiquei impressionado com a qualidade. A IA conseguiu captar exatamente o mood que queríamos, e os ajustes humanos foram cirúrgicos.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    project: "Trilha Corporativa - Institucional"
  },
  {
    id: 3,
    name: "Ana Beatriz",
    company: "StartupBR",
    role: "CEO",
    content: "Precisávamos de algo único para nossa apresentação de investidores. Em 24h tínhamos 3 opções incríveis. Escolhemos uma que realmente transmite inovação.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    project: "Trilha para Pitch - Startup"
  },
  {
    id: 4,
    name: "Roberto Lins",
    company: "Café & Stories",
    role: "Proprietário",
    content: "Nossa cafeteria ganhou uma alma sonora. A trilha ambiente criada conecta perfeitamente com nosso público. Recebemos elogios diariamente!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    project: "Trilha Ambiente - Varejo"
  },
  {
    id: 5,
    name: "Juliana Costa",
    company: "EcoVida",
    role: "Marketing Manager",
    content: "A trilha para nossa campanha de sustentabilidade ficou emocionante sem ser dramática. Conseguiu equilibrar esperança e urgência de forma brilhante.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    project: "Trilha Publicitária - Sustentabilidade"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-base font-medium mb-6">
            💬 Depoimentos Reais
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            O que nossos clientes{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              estão dizendo
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Mais de 500 trilhas criadas. Veja como transformamos marcas através do som.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto glass-morphism">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-medium">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  <div>
                    <div className="text-white font-semibold text-lg">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-purple-300 font-medium">
                      {currentTestimonial.role}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {currentTestimonial.company}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-purple-300 font-medium mb-1">
                    Projeto:
                  </div>
                  <div className="text-gray-300">
                    {currentTestimonial.project}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Depoimento anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                    index === currentIndex
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Próximo depoimento"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mini testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 cursor-pointer hover-lift"
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                "{testimonial.content.substring(0, 120)}..."
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Trilhas Criadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-400">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24h</div>
            <div className="text-gray-400">Entrega Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-gray-400">Clientes Ativos</div>
          </div>
        </div>
      </div>
    </section>
  );
}