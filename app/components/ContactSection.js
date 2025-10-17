'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Aqui você integraria com sua API ou serviço de e-mail
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📱",
      title: "WhatsApp",
      value: "+55 (11) 99999-9999",
      description: "Resposta em até 30 minutos",
      link: "https://wa.me/5511999999999",
      color: "green"
    },
    {
      icon: "📧",
      title: "E-mail",
      value: "contato@intotheshadows.com",
      description: "Resposta em até 4 horas",
      link: "mailto:contato@intotheshadows.com",
      color: "blue"
    },
    {
      icon: "📞",
      title: "Telefone",
      value: "+55 (11) 3333-4444",
      description: "Seg a Sex, 9h às 18h",
      link: "tel:+551133334444",
      color: "purple"
    }
  ];

  const socialLinks = [
    {
      icon: "📱",
      name: "Instagram",
      handle: "@intotheshadows",
      link: "https://instagram.com/intotheshadows"
    },
    {
      icon: "🎵",
      name: "YouTube",
      handle: "Aureah",
      link: "https://youtube.com/@intotheshadows"
    },
    {
      icon: "💼",
      name: "LinkedIn",
      handle: "Aureahs",
      link: "https://linkedin.com/company/intotheshadows"
    }
  ];

  return (
    <section className="relative py-20 px-4 lg:px-8 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-4 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-3 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            🚀 Chamada Final
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Pronto para criar sua{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              trilha perfeita?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforme sua marca com uma identidade sonora única. Fale conosco e comece seu projeto hoje mesmo!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Peça sua trilha personalizada
              </h3>
              <p className="text-gray-300">
                Preencha o formulário e receba uma proposta personalizada em até 2 horas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  E-mail profissional *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                  Empresa ou projeto
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa ou projeto"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                />
              </div>

              {/* Project Type & Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
                    Tipo de projeto *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                  >
                    <option value="">Selecione</option>
                    <option value="trilha-personalizada">Trilha Personalizada</option>
                    <option value="identidade-sonora">Identidade Sonora</option>
                    <option value="pacote-tematico">Pacote Temático</option>
                    <option value="assinatura">Plano de Assinatura</option>
                    <option value="white-label">White Label B2B</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                    Orçamento aproximado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                  >
                    <option value="">Prefiro não informar</option>
                    <option value="ate-500">Até R$ 500</option>
                    <option value="500-1000">R$ 500 - R$ 1.000</option>
                    <option value="1000-3000">R$ 1.000 - R$ 3.000</option>
                    <option value="3000-plus">Acima de R$ 3.000</option>
                  </select>
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Urgência do projeto
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="urgency"
                      value="urgent"
                      checked={formData.urgency === 'urgent'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-3 border rounded-lg text-center cursor-pointer transition-all duration-300 ${
                      formData.urgency === 'urgent' 
                        ? 'border-red-500 bg-red-500/10 text-red-300' 
                        : 'border-gray-600 bg-gray-800/30 text-gray-400 hover:border-gray-500'
                    }`}>
                      <div className="text-sm font-medium">🚨 Urgente</div>
                      <div className="text-xs">24-48h</div>
                    </div>
                  </label>
                  
                  <label className="relative">
                    <input
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={formData.urgency === 'normal'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-3 border rounded-lg text-center cursor-pointer transition-all duration-300 ${
                      formData.urgency === 'normal' 
                        ? 'border-purple-500 bg-purple-500/10 text-purple-300' 
                        : 'border-gray-600 bg-gray-800/30 text-gray-400 hover:border-gray-500'
                    }`}>
                      <div className="text-sm font-medium">⏰ Normal</div>
                      <div className="text-xs">3-7 dias</div>
                    </div>
                  </label>
                  
                  <label className="relative">
                    <input
                      type="radio"
                      name="urgency"
                      value="flexible"
                      checked={formData.urgency === 'flexible'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-3 border rounded-lg text-center cursor-pointer transition-all duration-300 ${
                      formData.urgency === 'flexible' 
                        ? 'border-green-500 bg-green-500/10 text-green-300' 
                        : 'border-gray-600 bg-gray-800/30 text-gray-400 hover:border-gray-500'
                    }`}>
                      <div className="text-sm font-medium">🌱 Flexível</div>
                      <div className="text-xs">1-2 semanas</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Descreva seu projeto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre seu projeto: estilo musical desejado, emoção que quer transmitir, onde será usado, referências..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando proposta...
                  </span>
                ) : (
                  '🚀 Solicitar proposta personalizada'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Campos obrigatórios. Resposta garantida em até 2 horas nos dias úteis.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Outras formas de contato
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{method.title}</h4>
                        <p className="text-purple-300 font-medium">{method.value}</p>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">
                Siga nosso trabalho
              </h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                  >
                    <span className="text-xl">{social.icon}</span>
                    <div>
                      <span className="font-medium">{social.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 text-center">
                ⚡ Resposta Rápida Garantida
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-300">2h</div>
                  <div className="text-xs text-gray-400">Resposta por e-mail</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">30min</div>
                  <div className="text-xs text-gray-400">Resposta no WhatsApp</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎧 Prefere ouvir antes de decidir?
            </h3>
            <p className="text-gray-300 mb-6">
              Agende uma demonstração ao vivo e ouça exemplos personalizados para seu segmento.
            </p>
            <button className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300">
              Agendar demonstração gratuita
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}