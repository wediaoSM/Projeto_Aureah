'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatedSection, ScrollReveal, TypingEffect, AnimatedCounter, FloatingParticles } from './Animations';

export default function HeroSection() {
  // Player state compacto
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();

  // Waveform heights: initialize deterministically so server HTML matches
  const [miniHeights, setMiniHeights] = useState(() => Array.from({ length: 8 }, () => 8));
  const [waveHeights, setWaveHeights] = useState(() => Array.from({ length: 24 }, () => 8));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  const [volume, setVolume] = useState(15); // Volume em porcentagem (15%)
  const playButtonRef = useRef(null);

  const tracks = [
    { name: "Revive Again", category: "Animecore.", src: "/audio/Animecore/Revive again.wav", cover: "/logo-revive.jpeg" },
    { name: "Falling Again", category: "Animecore.", src: "/audio/Animecore/Falling again.wav", cover: "/logo-falling.jpeg" }
  ];

  const handleWelcomeClick = () => {
    console.log('🎵 Usuário clicou em "Iniciar Experiência"');
    setHasInteracted(true);
    setShowWelcomeOverlay(false);
    
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume / 100;
      audioRef.current.play().then(() => {
        console.log('✅ Música iniciada após clique real do usuário!');
        setIsPlaying(true);
      }).catch((error) => {
        console.log('❌ Erro mesmo com clique real:', error);
      });
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      console.log(`🔊 Volume alterado para ${newVolume}%`);
    }
  };

  const togglePlay = () => {
    console.log('🎵 togglePlay chamado! Estado atual:', { isPlaying, hasInteracted });
    
    if (audioRef.current) {
      console.log('🎵 audioRef disponível, processando...');
      
      // Marca como interagido na primeira vez
      if (!hasInteracted) {
        console.log('🎵 Primeira interação detectada');
        setHasInteracted(true);
      }
      
      // Remove mute se necessário e configura volume
      audioRef.current.muted = false;
      audioRef.current.volume = volume / 100;
      console.log(`🎵 Volume configurado para ${volume}%, mute removido`);
      
      if (isPlaying) {
        console.log('🎵 Pausando música...');
        audioRef.current.pause();
      } else {
        console.log('🎵 Tentando tocar música...');
        audioRef.current.play().then(() => {
          console.log('✅ Música iniciada com sucesso!');
        }).catch((error) => {
          console.log('❌ Erro ao tocar música:', error);
        });
      }
      setIsPlaying(!isPlaying);
      console.log('🎵 Estado atualizado para:', !isPlaying);
    } else {
      console.log('❌ audioRef não disponível');
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Only randomize heights on the client after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    setMiniHeights(() => Array.from({ length: 8 }, () => rand(6, 18)));
    setWaveHeights(() => Array.from({ length: 24 }, () => rand(4, 20)));
    
    // Overlay já aparece inicialmente como true
    console.log('HeroSection montado - overlay de boas-vindas ativo');

    return () => {}; // Cleanup vazio
  }, []);

  // Tenta autoplay na primeira interação do usuário
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        console.log('Primeira interação detectada, ativando áudio...');
        setHasInteracted(true);
        
        // Se estava tocando silencioso, remove mute e ajusta volume
        if (audioRef.current.muted) {
          audioRef.current.muted = false;
          audioRef.current.volume = 0.3;
          console.log('Áudio unmuted e volume configurado para 30%');
        } else {
          // Se não estava tocando, inicia reprodução
          audioRef.current.volume = 0.3;
          audioRef.current.play().then(() => {
            console.log('Autoplay iniciado após interação!');
            setIsPlaying(true);
          }).catch(error => {
            console.log('Ainda assim não conseguiu tocar:', error);
          });
        }
      }
    };

    // Adiciona listeners para vários tipos de interação
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio element with new source
      // Configura volume para 30%
      audioRef.current.volume = 0.3;
    }
  }, [currentTrack]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <FloatingParticles />
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-6 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-7 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Content */}
        <AnimatedSection animation="fadeInLeft" className="text-left space-y-8">
          <div className="space-y-6">
            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-base font-medium">
                ✨ Powered by AI + Human Touch
              </div>
            </AnimatedSection>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Músicas exclusivas para{' '}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                <TypingEffect text="criadores de conteúdo" speed={100} />
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-4">
              <strong className="text-white">Biblioteca com centenas de trilhas exclusivas</strong> para TikTok, YouTube e redes sociais. 
              Ou crie algo 100% personalizado para sua marca.
            </p>

            {/* Value propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-purple-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Biblioteca com 500+ trilhas únicas</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Trilhas personalizadas em 24h</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">100% livres de direitos autorais</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">IA + produção humana</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push('/portfolio')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 text-lg"
              >
                🎵 Explorar Biblioteca Musical
              </button>
              <button 
                onClick={() => router.push(user ? '/requests' : '/auth?mode=login')}
                className="px-8 py-4 border border-purple-400 text-white font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300 text-lg"
              >
                ✨ Criar Trilha Personalizada
              </button>
            </div>
          </ScrollReveal>

          {/* Stats - Compacto */}
          <ScrollReveal direction="up" delay={600}>
            <div className="flex gap-6 pt-6 border-t border-gray-800/50">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <div className="text-sm text-gray-500">Trilhas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  <AnimatedCounter value={98} suffix="%" />
                </div>
                <div className="text-sm text-gray-500">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  <AnimatedCounter value={24} suffix="h" />
                </div>
                <div className="text-sm text-gray-500">Entrega</div>
              </div>
            </div>
          </ScrollReveal>
        </AnimatedSection>

        {/* Right side - Compact Premium Player */}
        <AnimatedSection animation="fadeInRight" delay={300} className="relative flex justify-center lg:justify-end">
          {/* Compact glass container */}
          <div className="relative glass-morphism rounded-2xl p-6 shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover-lift max-w-sm mx-auto lg:mx-0">
            
            {/* Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1.5 animate-pulse"></span>
                IA + Humano
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Prévia Exclusiva
              </h3>
              <p className="text-gray-400 text-sm">
                {!isPlaying && !hasInteracted ? 'Clique ▶️ para ouvir' : 'Trilhas criadas em tempo real'}
              </p>
            </div>

            {/* Compact album art */}
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-purple-600 via-violet-500 to-purple-800 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                  {/* Mini animated bars */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-0.5 opacity-40">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-gradient-to-t from-purple-500 to-violet-400 rounded-full animate-pulse"
                        style={{
                          height: `${miniHeights[i]}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1.5s'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Center image - changes based on current track */}
                  <div className="relative z-10">
                    <img
                      src={tracks[currentTrack].cover}
                      alt={tracks[currentTrack].name}
                      className="w-20 h-20 object-cover rounded-md shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Track info */}
            <div className="text-center mb-4">
              <h4 className="text-base font-semibold text-white mb-0.5">
                {tracks[currentTrack].name}
              </h4>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-purple-300 font-medium">
                  {tracks[currentTrack].category}
                </span>
                <span className="w-0.5 h-0.5 bg-gray-500 rounded-full"></span>
                <span className="text-gray-400">0:30</span>
              </div>
            </div>

            {/* Compact Waveform */}
            <div className="mb-4">
              <div className="h-8 bg-gray-900/30 rounded-lg flex items-end justify-center space-x-0.5 p-2 backdrop-blur-sm">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-0.5 bg-gradient-to-t rounded-full transition-all duration-200 ${
                      isPlaying 
                        ? 'from-purple-500 to-violet-400 animate-pulse' 
                        : 'from-purple-600/50 to-purple-400/50'
                    }`}
                    style={{
                      height: `${waveHeights[i]}px`,
                      animationDelay: `${i * 30}ms`,
                      opacity: isPlaying && i < 12 ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
              
              {/* Mini progress bar */}
              <div className="mt-2 px-0.5">
                <div className="h-0.5 bg-gray-700/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? '40%' : '0%' }}
                  />
                </div>
              </div>
            </div>

            {/* Compact Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={nextTrack}
                className="p-1.5 text-gray-400 hover:text-purple-300 transition-all duration-300 hover:scale-110"
                aria-label="Faixa anterior"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              <button
                ref={playButtonRef}
                onClick={togglePlay}
                className={`p-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full hover:from-purple-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 ${
                  !hasInteracted && !isPlaying ? 'animate-pulse' : ''
                }`}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-1.5 text-gray-400 hover:text-purple-300 transition-all duration-300 hover:scale-110"
                aria-label="Próxima faixa"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>
            </div>

            {/* Controle de Volume */}
            <div className="mb-4 px-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.814a1 1 0 011.617.814z" clipRule="evenodd" />
                    {volume > 50 ? (
                      <path d="M14.657 2.929a1 1 0 011.414 0A9.967 9.967 0 0118 10a9.967 9.967 0 01-1.929 7.071 1 1 0 11-1.414-1.414A7.967 7.967 0 0016 10c0-2.137-.833-4.146-2.343-5.657a1 1 0 010-1.414z" />
                    ) : volume > 0 ? (
                      <path d="M14.657 6.343a1 1 0 011.414 0A5.978 5.978 0 0117 10a5.978 5.978 0 01-1.929 3.657 1 1 0 11-1.414-1.414A3.978 3.978 0 0015 10c0-.851-.295-1.661-.833-2.343a1 1 0 010-1.414z" />
                    ) : null}
                  </svg>
                </div>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume}%, #374151 ${volume}%, #374151 100%)`
                    }}
                  />
                </div>
                
                <div className="text-xs text-gray-400 w-8 text-right">
                  {volume}%
                </div>
              </div>
            </div>

            {/* Compact track selector */}
            <div className="space-y-1 mb-4">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full text-left p-2 rounded-lg transition-all duration-300 text-sm ${
                    currentTrack === index
                      ? 'bg-purple-500/20 border border-purple-500/50 text-white'
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        currentTrack === index 
                          ? 'bg-purple-400 animate-pulse' 
                          : 'bg-gray-600'
                      }`} />
                      <span className="font-medium">{track.name}</span>
                    </div>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-800/50 rounded text-gray-400">
                      {track.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Compact CTA */}
            <button 
              onClick={() => router.push(user ? '/requests' : '/auth?mode=login')}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600/80 to-violet-600/80 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-lg transition-all duration-300 text-sm hover:shadow-lg hover:shadow-purple-500/20"
            >
              Criar Minha Trilha
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Overlay de Boas-Vindas */}
      {showWelcomeOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          {/* Fundo animado com gradiente e partículas */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d0b4a] to-[#0a001a] animate-gradient-move opacity-95 pointer-events-none"></div>
          {/* Partículas fake com blur */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute right-1/4 bottom-1/4 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute left-2/3 top-2/3 w-16 h-16 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
          <div className="relative max-w-lg mx-4 w-full">
            <div className="bg-gradient-to-br from-[#1a0033] via-[#2d0b4a] to-[#0a001a] border-4 border-purple-500/40 rounded-3xl p-10 text-center shadow-[0_0_60px_10px_rgba(128,0,255,0.25)] backdrop-blur-xl animate-scale-in">
              {/* Ícone animado com glow */}
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_40px_10px_rgba(128,0,255,0.35)]">
                <svg className="w-12 h-12 text-white drop-shadow-lg animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              {/* Título com gradiente */}
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-purple-300 via-white to-violet-400 bg-clip-text text-transparent mb-4 drop-shadow-lg animate-fade-in">
                🎵 Trilhas exclusivas para criadores!
              </h3>
              {/* Descrição */}
              <p className="text-gray-200 mb-8 leading-relaxed text-lg animate-fade-in">
                <span className="font-bold text-white">TikTokers, YouTubers e criadores de conteúdo:</span> Descubra nossa biblioteca com centenas de trilhas únicas, ou solicite algo <span className="text-purple-300 font-bold">100% personalizado</span> para seu projeto!
              </p>
              {/* Botão principal com glow e animação */}
              <button
                onClick={handleWelcomeClick}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_5px_rgba(128,0,255,0.35)] hover:shadow-purple-500/60 mb-4 text-lg animate-fade-in"
              >
                🚀 Iniciar Experiência Musical
              </button>
              {/* Link secundário com efeito neon */}
              <button
                onClick={() => {
                  setShowWelcomeOverlay(false);
                  setHasInteracted(true);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setIsPlaying(false);
                  }
                }}
                className="text-purple-300 hover:text-white text-sm transition-colors underline animate-fade-in"
              >
                Pular e navegar silenciosamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Player de áudio real conectado ao card */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = hasInteracted ? (volume / 100) : 0;
          }
        }}
        onCanPlay={() => {
          if (audioRef.current) {
            audioRef.current.volume = hasInteracted ? (volume / 100) : 0;
          }
        }}
        volume={hasInteracted ? (volume / 100) : 0}
        preload="auto"
      />
    </section>
  );
}