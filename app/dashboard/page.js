'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import Header from '../components/Header';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const { getFavoritesCount } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-xl">Carregando dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      
      {/* Background Effects - Igual ao home */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-6 animate-pulse delay-2000"></div>
      </div>

        {/* Main Content */}
              {/* Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
              ✨ Seu Espaço Criativo
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Bem-vindo, 
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                {' '}{user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Gerencie suas músicas, acompanhe suas criações e explore novas possibilidades sonoras.
            </p>
          </div>
          {/* Stats Grid Moderna */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Favoritas */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{getFavoritesCount()}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Músicas Favoritas</h3>
                <p className="text-gray-400 text-sm">Suas trilhas preferidas da biblioteca</p>
              </div>
            </div>

            {/* Uploads */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-violet-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">0</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Músicas Enviadas</h3>
                <p className="text-gray-400 text-sm">Trilhas que você compartilhou</p>
              </div>
            </div>

            {/* Solicitações */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-pink-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">2</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Trilhas Personalizadas</h3>
                <p className="text-gray-400 text-sm">Solicitações em andamento</p>
              </div>
            </div>
          </div>

          {/* Ações Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Explorar Biblioteca */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                 onClick={() => router.push('/portfolio')}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Explorar Biblioteca</h3>
                <p className="text-gray-400 mb-4">Descubra centenas de trilhas exclusivas para seus projetos</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>• 500+ trilhas únicas</span>
                  <span>• Download instantâneo</span>
                </div>
              </div>
            </div>

            {/* Criar Trilha Personalizada */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
                 onClick={() => router.push('/requests')}>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-violet-400 group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Criar Trilha Personalizada</h3>
                <p className="text-gray-400 mb-4">Solicite uma música 100% única para sua marca ou projeto</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>• IA + toque humano</span>
                  <span>• Entrega em 24h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suas Coleções */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Suas Músicas */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-7 h-7 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Suas Músicas
                </h3>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
                  0 músicas
                </div>
              </div>
              
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Nenhuma música enviada ainda</h4>
                <p className="text-gray-400 mb-6">Comece fazendo upload da sua primeira criação musical</p>
                <button
                  onClick={() => router.push('/upload')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-blue-500/20"
                >
                  Fazer Upload
                </button>
              </div>
            </div>

            {/* Suas Favoritas */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-7 h-7 mr-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  Suas Favoritas
                </h3>
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-500/20">
                  {getFavoritesCount()} música{getFavoritesCount() !== 1 ? 's' : ''}
                </div>
              </div>
              
              {getFavoritesCount() > 0 ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {getFavoritesCount()} música{getFavoritesCount() !== 1 ? 's' : ''} favorita{getFavoritesCount() !== 1 ? 's' : ''}
                  </h4>
                  <p className="text-gray-400 mb-6">Vá para a biblioteca para ouvir suas favoritas</p>
                  <button
                    onClick={() => router.push('/portfolio')}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-red-500/20"
                  >
                    Ver Favoritas
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Nenhuma música favorita ainda</h4>
                  <p className="text-gray-400 mb-6">Explore nossa biblioteca e adicione suas favoritas</p>
                  <button
                    onClick={() => router.push('/portfolio')}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-red-500/20"
                  >
                    Explorar Biblioteca
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}