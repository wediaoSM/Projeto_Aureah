"use client";

import { useRef, useState, useEffect } from 'react';

export default function AudioPlayer({ src, title = '', className = '' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Waveform heights: deterministic on server, randomized on client
  const [waveHeights, setWaveHeights] = useState(() => Array.from({ length: 32 }, () => 8));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    setWaveHeights(() => Array.from({ length: 32 }, () => rand(4, 20)));
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    setIsLoading(true);
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.log('Playback failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setProgress((current / total) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const percent = e.target.value;
    const newTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percent);
    setCurrentTime(newTime);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ouça: ${title}`,
          text: 'Confira esta trilha incrível!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing failed:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // Aqui você pode adicionar um toast/notification
    console.log('Link copiado para a área de transferência!');
  };

  return (
    <div className={`w-full flex flex-col space-y-3 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
        crossOrigin="anonymous"
      />
      
      {/* Header com título e ações */}
      <div className="flex items-center justify-between">
        {title && (
          <span className="text-sm font-medium text-gray-300 truncate flex-1">
            {title}
          </span>
        )}
        <div className="flex items-center space-x-2 ml-3">
          <button
            onClick={handleDownload}
            className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Download áudio"
            title="Download"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Compartilhar áudio"
            title="Compartilhar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Player principal */}
      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polygon points="6,4 20,12 6,20" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Barra de progresso */}
        <div className="flex-1 space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 slider"
            aria-label="Progresso do áudio"
          />
          
          {/* Tempos */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Waveform animada simples */}
      <div className="h-8 bg-gray-800/30 rounded-lg flex items-center justify-center space-x-0.5 px-2">
        {[...Array(32)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 bg-gradient-to-t from-purple-500 to-violet-400 rounded-full transition-all duration-150 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              height: `${waveHeights[i]}px`,
              animationDelay: `${i * 50}ms`,
              opacity: progress > (i / 32) * 100 ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
}
