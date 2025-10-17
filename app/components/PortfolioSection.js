'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';

export default function PortfolioSection() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackDurations, setTrackDurations] = useState({}); // Armazena durações reais
  const [musicLibrary, setMusicLibrary] = useState([]); // Carregado da API
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [categories, setCategories] = useState(['all']);
  const audioRef = useRef(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const router = useRouter();

  // Carregar tracks da API
  useEffect(() => {
    const loadTracks = async () => {
      try {
        const response = await fetch('/api/music?limit=50');
        const data = await response.json();
        
        if (data.tracks && Array.isArray(data.tracks)) {
          setMusicLibrary(data.tracks);
          
          // Extrair categorias únicas
          const uniqueCategories = ['all', ...new Set(data.tracks.map(track => track.category))];
          setCategories(uniqueCategories);
          
          // Autoplay da primeira música quando carregam os tracks
          if (data.tracks.length > 0 && user) {
            setTimeout(() => {
              setCurrentTrack(0);
              setIsPlaying(true);
            }, 1000); // Delay de 1 segundo para garantir que o componente esteja montado
          }
        }
      } catch (error) {
        console.error('Erro ao carregar tracks:', error);
        // Fallback para tracks locais se API falhar
        const fallbackTracks = [
          {
            id: 1,
            title: "Revive Again",
            artist: "Aureah",
            category: "Animecore",
            duration: null,
            src: "/audio/Animecore/Revive again.wav",
            cover: "/logo-revive.jpeg",
            description: "Uma jornada emocional através de melodias nostálgicas e beats modernos.",
            tags: ["Emocional", "Nostálgico"],
            mood: "Inspirador"
          },
          {
            id: 2,
            title: "Falling Again",
            artist: "Aureah", 
            category: "Animecore",
            duration: null,
            src: "/audio/Animecore/Falling again.wav",
            cover: "/logo-falling.jpeg",
            description: "Atmosfera melancólica com toques de esperança e renovação.",
            tags: ["Melancólico", "Atmosférico"],
            mood: "Reflexivo"
          }
        ];
        setMusicLibrary(fallbackTracks);
        setCategories(['all', 'Animecore']);
        
        // Autoplay da primeira música fallback se usuário logado
        if (fallbackTracks.length > 0 && user) {
          setTimeout(() => {
            setCurrentTrack(0);
            setIsPlaying(true);
          }, 1000);
        }
      } finally {
        setLoadingTracks(false);
      }
    };

    loadTracks();
  }, [user]); // Adiciona user como dependência para reagir ao login

  // Filtrar músicas por categoria
  const filteredTracks = activeCategory === 'all' 
    ? musicLibrary 
    : musicLibrary.filter(track => track.category === activeCategory);

  const handlePlayTrack = async (index) => {
    // Only allow playback if user is logged in
    if (!user) {
      router.push('/auth?mode=login');
      return;
    }

    const track = filteredTracks[index];
    if (!track) return;

    if (currentTrack === index && isPlaying) {
      // Pause if same track is playing
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play new track or resume paused track
      setCurrentTrack(index);
      setIsPlaying(true);
      
      // Registrar evento de play na API
      try {
        await fetch('/api/music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trackId: track.id,
            action: 'increment_play_count',
            userId: user.id
          })
        });
      } catch (error) {
        console.error('Erro ao registrar play:', error);
      }
    }
  };

  const handleFavoriteClick = (trackId) => {
    if (!user) {
      router.push('/auth?mode=login');
      return;
    }
    toggleFavorite(trackId);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Função para detectar duração real do arquivo
  const detectAudioDuration = (src, trackId) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        const realDuration = audio.duration;
        setTrackDurations(prev => ({
          ...prev,
          [trackId]: realDuration
        }));
        resolve(realDuration);
      });
      audio.addEventListener('error', () => {
        resolve(0);
      });
      audio.src = src;
    });
  };

  // Detectar durações ao montar o componente
  useEffect(() => {
    musicLibrary.forEach(track => {
      if (!trackDurations[track.id]) {
        const audioSrc = track.signed_url || track.src;
        if (audioSrc) {
          detectAudioDuration(audioSrc, track.id);
        }
      }
    });
  }, [musicLibrary, trackDurations]);

  useEffect(() => {
    if (currentTrack !== null && audioRef.current) {
      audioRef.current.load();
      // Configura volume para 30%
      audioRef.current.volume = 0.3;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Autoplay prevented by browser:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      // Configura volume sempre que o estado de reprodução muda
      audioRef.current.volume = 0.3;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Playback prevented by browser:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Background Effects - Múltiplas camadas para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-violet-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 scale-150"></div>
        </div>
        
        {/* Subtle animated lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl gradient-bg-animated"></div>
          <div className="relative z-10 py-12">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                Biblioteca Musical
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nossa coleção sonora. Cada composição conta uma história única, criada para momentos especiais.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`category-pill ${
              activeCategory === 'all' 
                ? 'active bg-purple-500 text-white' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
            } px-6 py-3 rounded-full text-sm font-medium transition-all duration-300`}
          >
            Todas ({musicLibrary.length})
          </button>
          {categories.map(category => {
            const count = musicLibrary.filter(track => track.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-pill ${
                  activeCategory === category 
                    ? 'active bg-purple-500 text-white' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                } px-6 py-3 rounded-full text-sm font-medium transition-all duration-300`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Music Library - Lista */}
        {loadingTracks ? (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-12 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-400">Carregando biblioteca musical...</p>
          </div>
        ) : filteredTracks.length === 0 ? (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-12 text-center">
            <p className="text-gray-400 text-lg">Nenhuma música encontrada nesta categoria.</p>
            <p className="text-gray-500 text-sm mt-2">Experimente selecionar uma categoria diferente ou aguarde novos uploads.</p>
          </div>
        ) : (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden mb-8">
            <div className="divide-y divide-gray-800/50">
              {filteredTracks.map((track, index) => (
              <div key={track.id}>
                <div
                  className={`flex items-center p-6 transition-all duration-300 hover:bg-gray-800/30 ${
                    currentTrack === index 
                      ? 'bg-purple-500/10 border-l-4 border-l-purple-500' 
                      : ''
                  }`}
                >
                  {/* Play Button */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center mr-6">
                    <button
                      onClick={() => handlePlayTrack(index)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        currentTrack === index && isPlaying
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-400 hover:to-violet-500' 
                          : currentTrack === index
                          ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-400 hover:to-violet-500'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                    >
                      {currentTrack === index && isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Cover Art */}
                  <div className="flex-shrink-0 w-16 h-16 mr-6">
                    {track.cover_signed_url || track.cover ? (
                      <img
                        src={track.cover_signed_url || track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-grow min-w-0 mr-6">
                    <h3 className="font-bold text-white text-lg truncate mb-1">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {track.artist} • {track.mood}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-1">
                      {track.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="hidden lg:flex items-center space-x-2 mr-6">
                    {(track.tags || []).slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {track.genre && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {track.genre}
                      </span>
                    )}
                  </div>

                  {/* Duration & Category */}
                  <div className="flex-shrink-0 text-right mr-4">
                    <div className="text-purple-300 font-bold text-lg mb-1">
                      {trackDurations[track.id] ? formatTime(trackDurations[track.id]) : track.duration}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {track.category}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(track.id);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isFavorite(track.id)
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-red-400'
                      }`}
                      title={isFavorite(track.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill={isFavorite(track.id) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Enhanced Integrated Audio Player - Shows when track is selected */}
                {currentTrack === index && (
                  <div className="relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-purple-500/10 animate-pulse"></div>
                    
                    <div className="relative px-6 pb-6 pt-4">
                      <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/10 hover:border-purple-400/50 transition-all duration-500">
                        {/* Audio Element */}
                        <audio
                          ref={audioRef}
                          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                          onLoadedMetadata={() => {
                            const realDuration = audioRef.current?.duration || 0;
                            setDuration(realDuration);
                            // Configura volume para 30%
                            if (audioRef.current) {
                              audioRef.current.volume = 0.3;
                            }
                            // Atualiza o cache de durações com o valor real
                            if (realDuration > 0) {
                              setTrackDurations(prev => ({
                                ...prev,
                                [track.id]: realDuration
                              }));
                            }
                          }}
                          onCanPlay={() => {
                            // Configura volume quando o áudio pode ser reproduzido
                            if (audioRef.current) {
                              audioRef.current.volume = 0.3;
                            }
                          }}
                          onEnded={() => setIsPlaying(false)}
                          className="hidden"
                          volume={0.3}
                        >
                          <source src={track.signed_url || track.src} type="audio/wav" />
                          <source src={track.signed_url || track.src} type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>

                        {/* Enhanced Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
                            <span className="text-purple-300 text-sm font-medium">Tocando agora</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs font-medium">
                              {track.category}
                            </div>
                            {track.mood && (
                              <div className="px-2 py-1 bg-violet-500/20 rounded-full text-violet-300 text-xs font-medium">
                                {track.mood}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Player Controls */}
                        <div className="flex items-center space-x-4 mb-4">
                          {/* Enhanced Play/Pause Button */}
                          <button
                            onClick={() => handlePlayTrack(index)}
                            className="group relative w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white hover:from-purple-400 hover:to-violet-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/50"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isPlaying ? (
                              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 ml-0.5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </button>

                          {/* Enhanced Track Info */}
                          <div className="flex-grow space-y-1">
                            <h4 className="text-white font-semibold text-lg truncate">
                              {track.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-300">{track.artist}</span>
                              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                              <span className="text-gray-400">{track.genre || 'Música Original'}</span>
                            </div>
                            {track.description && (
                              <p className="text-gray-400 text-sm truncate max-w-lg">
                                {track.description}
                              </p>
                            )}
                          </div>

                          {/* Enhanced Time Display */}
                          <div className="text-right space-y-1">
                            <div className="text-lg font-bold text-purple-300 font-mono">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {duration > 0 ? `${Math.round((currentTime / duration) * 100)}%` : '0%'} concluído
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="space-y-2">
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max={duration || 0}
                              value={currentTime}
                              onChange={(e) => {
                                const time = parseFloat(e.target.value);
                                setCurrentTime(time);
                                if (audioRef.current) {
                                  audioRef.current.currentTime = time;
                                }
                              }}
                              className="w-full h-3 bg-gray-700/50 rounded-full appearance-none cursor-pointer custom-slider overflow-hidden"
                              style={{
                                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                              }}
                            />
                            {/* Glow effect on progress */}
                            <div 
                              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full pointer-events-none transition-all duration-200"
                              style={{
                                width: `${(currentTime / duration) * 100}%`,
                                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                          <div className="flex items-center space-x-3">
                            {/* Volume indicator */}
                            <div className="flex items-center space-x-1 text-gray-400">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.814a1 1 0 011.617.814zM14.567 2.343a1 1 0 011.414 0A9.967 9.967 0 0118 10a9.967 9.967 0 01-1.019 7.657 1 1 0 11-1.414-1.414A7.967 7.967 0 0016 10c0-2.137-.833-4.146-2.433-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
                                <path d="M14.567 6.343a1 1 0 011.414 0A5.978 5.978 0 0117 10a5.978 5.978 0 01-1.019 3.657 1 1 0 11-1.414-1.414A3.978 3.978 0 0015 10c0-.851-.295-1.661-.833-2.343a1 1 0 010-1.414z" />
                              </svg>
                              <span className="text-xs">HD</span>
                            </div>

                            {/* Quality indicator */}
                            <div className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium">
                              {track.signed_url ? 'Cloud' : 'Local'} • WAV
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Download button */}
                            <button
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = track.signed_url || track.src;
                                link.download = `${track.title} - ${track.artist}.wav`;
                                link.click();
                              }}
                              className="p-2 text-gray-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-all duration-300 group"
                              title="Download da faixa"
                            >
                              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>

                            {/* Share button */}
                            <button
                              onClick={() => {
                                if (navigator.share) {
                                  navigator.share({
                                    title: track.title,
                                    text: `Ouça "${track.title}" por ${track.artist}`,
                                    url: window.location.href
                                  });
                                } else {
                                  navigator.clipboard.writeText(window.location.href);
                                  // Could add a toast notification here
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-all duration-300 group"
                              title="Compartilhar faixa"
                            >
                              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              ))}
            </div>
          </div>
        )}



        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto glass-morphism hover-lift">
            <h3 className="text-xl font-semibold text-white mb-3">
              Gostou do que ouviu?
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Cada trilha é única. Conte sua visão e criamos algo exclusivo para o seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push(user ? '/requests' : '/auth?mode=login')}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Criar minha trilha
              </button>
              <button
                onClick={() => router.push(user ? '/samples' : '/auth?mode=login')}
                className="px-8 py-3 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all"
              >
                Baixar samples
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}