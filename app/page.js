import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutProcessSection from './components/AboutProcessSection';
import FinalCTASection from './components/FinalCTASection';
import FooterMinimal from './components/FooterMinimal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black pt-20 page-transition">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutProcessSection />
      <FinalCTASection />
      <FooterMinimal />
    </main>
  );
}