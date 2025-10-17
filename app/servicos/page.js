import Header from '../components/Header';
import ServicesSection from '../components/ServicesSection';
import FooterMinimal from '../components/FooterMinimal';

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />
      
      {/* Hero específico dos Serviços */}
      <section className="relative pt-20 pb-10 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Criação de 
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {' '}Trilhas Musicais
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Combinamos inteligência artificial com expertise humana para criar 
            a trilha perfeita para sua marca, projeto ou conteúdo.
          </p>
          
          {/* Stats rápidos */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">24-48h</div>
              <div className="text-sm text-gray-400">Entrega</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">500+</div>
              <div className="text-sm text-gray-400">Trilhas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">98%</div>
              <div className="text-sm text-gray-400">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <FooterMinimal />
    </main>
  );
}