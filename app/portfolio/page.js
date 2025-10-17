import Header from '../components/Header';
import PortfolioSection from '../components/PortfolioSection';
import FooterMinimal from '../components/FooterMinimal';

export const metadata = {
  title: 'Portfólio Musical',
  description: 'Explore nosso portfólio de trilhas musicais criadas com IA + refinamento humano. Samples de qualidade profissional para diferentes categorias e estilos.',
  keywords: ['samples musicais', 'portfólio trilhas', 'música corporativa', 'trilhas reels', 'audio branding'],
  openGraph: {
    title: 'Portfólio Musical | Into the Shadows',
    description: 'Explore nosso portfólio de trilhas musicais criadas com IA + refinamento humano.',
    url: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black pt-20 page-transition">
      <Header />
      
      <PortfolioSection />
      <FooterMinimal />
    </main>
  );
}