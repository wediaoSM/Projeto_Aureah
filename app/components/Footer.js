'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Serviços",
      links: [
        { name: "Trilhas Personalizadas", href: "/servicos#trilhas-personalizadas" },
        { name: "Identidade Sonora", href: "/servicos#identidade-sonora" },
        { name: "Pacotes Temáticos", href: "/servicos#pacotes-tematicos" },
        { name: "White Label B2B", href: "/servicos#white-label" },
        { name: "Planos de Assinatura", href: "/servicos#planos" }
      ]
    },
    {
      title: "Portfólio & Conteúdo", 
      links: [
        { name: "Samples Musicais", href: "/portfolio" },
        { name: "Cases de Sucesso", href: "/cases" },
        { name: "Blog & Insights", href: "/blog" },
        { name: "Artigos sobre IA Musical", href: "/blog/categoria/ai-music" },
        { name: "Neurobranding", href: "/blog/categoria/neurobranding" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Como Funciona", href: "/como-funciona" },
        { name: "Nossa Equipe", href: "/sobre#equipe" },
        { name: "Carreiras", href: "/carreiras" },
        { name: "Imprensa", href: "/imprensa" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "/ajuda" },
        { name: "FAQ", href: "/faq" },
        { name: "Contato", href: "/contato" },
        { name: "WhatsApp", href: "https://wa.me/5511999999999" },
        { name: "Status do Sistema", href: "/status" }
      ]
    }
  ];

  const legalLinks = [
    { name: "Termos de Uso", href: "/termos" },
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Licenças Musicais", href: "/licencas" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Cookies", href: "/cookies" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/intotheshadows",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.281C3.82 14.616 3.31 13.421 3.31 12.017s.51-2.599 1.816-3.71c.875-.79 2.026-1.281 3.323-1.281s2.448.49 3.323 1.281c1.306 1.111 1.816 2.306 1.816 3.71s-.51 2.599-1.816 3.71c-.875.79-2.026 1.281-3.323 1.281zm7.138 0c-1.297 0-2.448-.49-3.323-1.281-1.306-1.111-1.816-2.306-1.816-3.71s.51-2.599 1.816-3.71c.875-.79 2.026-1.281 3.323-1.281s2.448.49 3.323 1.281c1.306 1.111 1.816 2.306 1.816 3.71s-.51 2.599-1.816 3.71c-.875.79-2.026 1.281-3.323 1.281z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@intotheshadows",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/intotheshadows",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/intotheshadows",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
    }
  ];

  const siteMap = [
    { section: "Início", items: ["Hero", "Portfólio", "Serviços", "Como Funciona"] },
    { section: "Serviços", items: ["Trilhas Personalizadas", "Identidade Sonora", "Pacotes", "Assinaturas"] },
    { section: "Conteúdo", items: ["Blog", "Cases", "Insights", "Newsletter"] },
    { section: "Empresa", items: ["Sobre", "Equipe", "Contato", "FAQ"] }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-2 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-1 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Aureah</h3>
                  <p className="text-sm text-gray-400">O som da sua marca começa aqui</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Criamos trilhas que traduzem identidades — com a inteligência da IA e a sensibilidade humana. 
                Sua identidade sonora única está a um clique de distância.
              </p>

              {/* Audio Logo Placeholder */}
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Ouça nosso logo sonoro</p>
                    <p className="text-gray-400 text-xs">A identidade sonora da Aureah</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                    aria-label={`Siga-nos no ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Site Map Section */}
        <div className="border-t border-gray-800 py-8">
          <h4 className="text-white font-semibold mb-6 text-center">🗺️ Mapa do Site</h4>
          <div className="grid md:grid-cols-4 gap-6">
            {siteMap.map((section, index) => (
              <div key={index} className="text-center">
                <h5 className="text-purple-300 font-medium mb-3 text-sm">{section.section}</h5>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span className="text-gray-500 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Company Info */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm mb-2">
                <strong className="text-white">Aureah Ltda.</strong> - CNPJ: 12.345.678/0001-90
              </p>
              <p className="text-gray-500 text-xs">
                Rua da Música, 123 - São Paulo, SP - CEP: 01234-567
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Aureah. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>🎵 Feito com IA + ❤️ humano</span>
              <span>•</span>
              <span>Versão 2.1.0</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}