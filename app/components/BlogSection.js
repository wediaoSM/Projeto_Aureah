'use client';

import { useState } from 'react';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos os Artigos', count: 12 },
    { id: 'ai-music', name: 'IA & Música', count: 4 },
    { id: 'neurobranding', name: 'Neurobranding', count: 3 },
    { id: 'marketing-audio', name: 'Marketing Sonoro', count: 3 },
    { id: 'case-studies', name: 'Cases de Sucesso', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      title: "Como a IA está Revolucionando a Produção Musical em 2024",
      excerpt: "Descubra as principais tendências e ferramentas de inteligência artificial que estão transformando a criação musical.",
      category: "ai-music",
      readTime: "5 min",
      date: "15 Out 2024",
      image: "/blog/ai-music-revolution.jpg",
      tags: ["IA", "Produção Musical", "Tendências"],
      featured: true
    },
    {
      id: 2,
      title: "Neurobranding: Como o Cérebro Responde à Música nas Marcas",
      excerpt: "Entenda os mecanismos neurológicos por trás da conexão emocional entre música e identidade de marca.",
      category: "neurobranding",
      readTime: "8 min",
      date: "12 Out 2024",
      image: "/blog/neurobranding-music.jpg",
      tags: ["Neurobranding", "Neurociência", "Branding"],
      featured: false
    },
    {
      id: 3,
      title: "5 Estratégias de Marketing Sonoro para Redes Sociais",
      excerpt: "Técnicas comprovadas para usar trilhas sonoras e aumentar o engajamento no Instagram, TikTok e YouTube.",
      category: "marketing-audio",
      readTime: "6 min",
      date: "10 Out 2024",
      image: "/blog/social-media-audio.jpg",
      tags: ["Marketing", "Redes Sociais", "Engajamento"],
      featured: false
    },
    {
      id: 4,
      title: "Case Study: Como uma Startup Aumentou suas Vendas em 40% com Audio Branding",
      excerpt: "Análise completa de como a identidade sonora transformou os resultados de uma empresa de tecnologia.",
      category: "case-studies",
      readTime: "10 min",
      date: "8 Out 2024",
      image: "/blog/startup-case-study.jpg",
      tags: ["Case Study", "Audio Branding", "ROI"],
      featured: true
    },
    {
      id: 5,
      title: "Psicoacústica: A Ciência por Trás das Emoções Musicais",
      excerpt: "Explore como diferentes frequências, ritmos e timbres afetam o comportamento do consumidor.",
      category: "neurobranding",
      readTime: "7 min",
      date: "5 Out 2024",
      image: "/blog/psychoacoustics.jpg",
      tags: ["Psicoacústica", "Comportamento", "Ciência"],
      featured: false
    },
    {
      id: 6,
      title: "Tendências de Audio Marketing para 2025",
      excerpt: "Previsões e insights sobre o futuro do marketing sonoro e oportunidades para marcas inovadoras.",
      category: "marketing-audio",
      readTime: "9 min",
      date: "2 Out 2024",
      image: "/blog/audio-marketing-trends.jpg",
      tags: ["Tendências", "Futuro", "Inovação"],
      featured: false
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const featuredArticles = articles.filter(article => article.featured);

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
            📚 Conhecimento
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Blog & Insights
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Artigos, estudos de caso e insights sobre IA musical, neurobranding e marketing sonoro para manter você sempre atualizado.
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              ⭐ Artigos em Destaque
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105 shadow-xl"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                    <div className="text-4xl">📖</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                        DESTAQUE
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime} leitura</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-purple-300 font-medium text-sm hover:text-purple-200 transition-colors duration-300">
                      Ler artigo completo →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105 shadow-xl"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-3xl">
                  {article.category === 'ai-music' && '🤖'}
                  {article.category === 'neurobranding' && '🧠'}
                  {article.category === 'marketing-audio' && '📢'}
                  {article.category === 'case-studies' && '📊'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-white mb-3 leading-tight">
                  {article.title}
                </h4>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-purple-300 font-medium text-sm hover:text-purple-200 transition-colors duration-300">
                  Ler mais →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-16">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="text-3xl mb-4">📬</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Receba nossos insights semanais
            </h3>
            <p className="text-gray-300 mb-6">
              Fique por dentro das últimas tendências em IA musical, neurobranding e marketing sonoro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                Assinar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Sem spam. Cancele quando quiser.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer ver esses insights aplicados na prática?
            </h3>
            <p className="text-gray-300 mb-6">
              Nosso conhecimento em neurobranding e IA musical está disponível para criar a trilha perfeita para seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                Aplicar em meu projeto
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800/50 hover:border-purple-400 hover:text-white transition-all duration-300">
                Agendar consultoria
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}