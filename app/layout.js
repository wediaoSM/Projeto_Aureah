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
    template: '%s | Aureah Music Studio',
    default: 'Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical'
  },
  description: "Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional. Música para vídeos, marcas e conteúdo digital. IA + toque humano.",
  keywords: ['trilha sonora', 'música personalizada', 'biblioteca musical', 'audio branding', 'música para vídeo', 'IA música', 'Aureah', 'trilha para YouTube', 'trilha para TikTok', 'música para marcas'],
  authors: [{ name: 'Aureah Music Studio' }],
  creator: 'Aureah Music Studio',
  publisher: 'Aureah Music Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical',
    description: 'Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional. Música para vídeos, marcas e conteúdo digital.',
    url: 'https://aureah.vercel.app',
    siteName: 'Aureah Music Studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aureah Music Studio - Trilhas Musicais Profissionais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aureah Music Studio | Trilhas Personalizadas e Biblioteca Musical',
    description: 'Trilhas sonoras exclusivas, biblioteca musical para criadores e audio branding profissional.',
    images: ['/og-image.png'],
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