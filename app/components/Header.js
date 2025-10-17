'use client';

import { useState, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';
// Caminho do som de hover (adicione o arquivo em /public/ui-hover.mp3)
const HOVER_SOUND = '/ui-hover.mp3';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const audioRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const navigationItems = [
    { href: '/', label: 'Início', icon: '🏠' },
    { href: '/portfolio', label: 'Biblioteca', icon: '🎵' },
    { href: '/requests', label: 'Criar Trilha', icon: '✨' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
  <header className="fixed top-0 left-0 w-full z-50 shadow-2xl">
      {/* Background com gradiente do hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black backdrop-blur-xl border-b border-gray-700/50"></div>
      {/* Conteúdo do header */}
  <nav className="relative z-20 px-4 lg:px-8 isolate">
  <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo e nome moderno */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl p-2 hover:bg-white/5 transition-all duration-300" aria-label="Ir para página inicial">
                {/* Logo com efeito moderno */}
                <div
                  className="relative w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30"
                  onMouseEnter={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play().catch(() => {});
                    }
                  }}
                  tabIndex={0}
                  aria-label="Logo sonoro Aureah"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Aureah"
                    width={64}
                    height={64}
                    priority
                    className="object-cover w-27 h-27 rounded-xl"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Áudio escondido para efeito sonoro */}
                  <audio ref={audioRef} src={HOVER_SOUND} preload="auto" style={{ display: 'none' }} />
                </div>
                
                {/* Nome da marca simplificado e moderno */}
                <div className="flex flex-col">
                  <h1 className="text-3xl lg:text-2xl pb-1 font-extrabold font-[Montserrat,sans-serif] bg-gradient-to-r from-purple-300 via-white to-violet-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight group-hover:from-purple-400 group-hover:to-white transition-all duration-300">
                    Aureah
                  </h1>
                  <p className="text-xs text-purple-400/80 font-medium tracking-wider uppercase">
                    Music Studio
                  </p>
                </div>
              </Link>
            </div>

            {/* Menu desktop moderno */}
            <div className="hidden lg:flex items-center">
              <nav aria-label="Menu principal" className="flex items-center gap-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href === '/requests' && !user ? '/auth?mode=login' : item.href}
                      className={`group flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/25' 
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-purple-500/10 border border-transparent hover:border-purple-500/30'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="text-base group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Right Section - Simplificada */}
              <div className="flex items-center space-x-3 ml-8">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                ) : user ? (
                  /* User is logged in - Layout limpo */
                  <div className="flex items-center space-x-4">
                    {/* Dashboard Link */}
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-purple-400 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      <span className="hidden sm:block">Painel</span>
                    </Link>

                    {/* User Profile Compacto */}
                    <div className="flex items-center space-x-3 bg-gray-800/50 rounded-xl px-3 py-2 border border-gray-700/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-white text-sm font-medium">
                          {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleSignOut}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        aria-label="Fazer logout"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* User is not logged in - Botões limpos */
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/auth?mode=login"
                      className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/auth?mode=register"
                      className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-400 hover:to-violet-500 shadow-lg hover:shadow-purple-500/25"
                    >
                      Começar
                    </Link>
                  </div>
                )}
              </div>
              

            </div>

            {/* Menu mobile button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="lg:hidden" id="mobile-menu">
              <nav className="px-2 pt-2 pb-3 space-y-1 bg-black/80 rounded-lg mt-2 border border-purple-500/20" aria-label="Menu mobile">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        isActive 
                          ? 'text-white bg-purple-500/20 border border-purple-500/50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Auth section mobile */}
                <div className="pt-4 border-t border-gray-700/50">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : user ? (
                    /* User logged in - mobile */
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="flex items-center px-3 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">
                            {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 text-purple-400 border border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 11h8" />
                          </svg>
                          Dashboard
                        </Link>
                        
                        <Link
                          href="/pedido"
                          className="flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-400 hover:to-violet-500"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7-11-7z"/>
                          </svg>
                          Criar Trilha
                        </Link>

                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 text-red-400 border border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sair
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* User not logged in - mobile */
                    <div className="space-y-2">
                      <Link
                        href="/auth?mode=login"
                        className="block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 text-purple-400 border border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth?mode=register"
                        className="block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-400 hover:to-violet-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Registrar
                      </Link>
                      <Link
                        href="/pedido"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold border border-purple-400/30 shadow-lg hover:shadow-purple-500/30 hover:from-purple-400 hover:to-violet-600 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Criar trilha musical personalizada"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7-11-7z"/></svg>
                        Criar Trilha
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}