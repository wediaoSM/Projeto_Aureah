import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "../contexts/AuthContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: '%s | Into the Shadows',
    default: 'Into the Shadows - O som da sua marca começa aqui'
  },
  description: "Criamos trilhas musicais exclusivas com IA + toque humano para marcas, criadores e empresas. Entrega em 24-48h com qualidade profissional.",
  keywords: ['trilhas musicais', 'música com IA', 'identidade sonora', 'audio branding', 'música personalizada', 'trilhas corporativas'],
  authors: [{ name: 'Into the Shadows' }],
  creator: 'Into the Shadows',
  publisher: 'Into the Shadows',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://intotheshadows.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Into the Shadows - O som da sua marca começa aqui',
    description: 'Criamos trilhas musicais exclusivas com IA + toque humano para marcas, criadores e empresas. Entrega em 24-48h com qualidade profissional.',
    url: 'https://intotheshadows.com.br',
    siteName: 'Into the Shadows',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Into the Shadows - Trilhas Musicais com IA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Into the Shadows - O som da sua marca começa aqui',
    description: 'Criamos trilhas musicais exclusivas com IA + toque humano para marcas, criadores e empresas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'seu-codigo-google-verification',
    yandex: 'seu-codigo-yandex',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* Efeitos globais laterais finos (atrás de todo o conteúdo) */}
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Barras laterais - finas e sutis */}
          {/* Glow suave e largo por trás para dar presença sem roubar atenção */}
          <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 w-20 md:w-28 z-0 hidden md:block">
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-transparent via-purple-500/5 to-transparent blur-3xl" />
          </div>
          <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 w-20 md:w-28 z-0 hidden md:block">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-b from-transparent via-violet-500/5 to-transparent blur-3xl" />
          </div>
          <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 w-[2px] md:w-[3px] z-0">
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent blur-2xl animate-pulse" />
          </div>
          <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 w-[2px] md:w-[3px] z-0">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-b from-transparent via-violet-500/15 to-transparent blur-2xl animate-pulse delay-1000" />
          </div>

          {/* Conteúdo principal acima dos efeitos */}
          <div className="relative z-10">
            <AuthProvider>
              <FavoritesProvider>
                <ThemeProvider>
                  {children}
                </ThemeProvider>
              </FavoritesProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}