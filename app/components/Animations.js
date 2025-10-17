'use client';

import { useState, useEffect, useRef } from 'react';

// Hook para detectar quando elemento entra na viewport
export function useInView(threshold = 0.1) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Fallback: se por algum motivo o observer não disparar, mostra após 500ms
    const fallback = setTimeout(() => setInView(true), 500);

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            clearTimeout(fallback);
          }
        },
        { threshold, rootMargin: '0px 0px -10% 0px' }
      );

      if (ref.current) observer.observe(ref.current);

      return () => {
        try { observer.disconnect(); } catch {}
        clearTimeout(fallback);
      };
    }

    // Caso IntersectionObserver não exista
    return () => clearTimeout(fallback);
  }, [threshold]);

  return [ref, inView];
}

// Componente para animações de entrada
export function AnimatedSection({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  className = '' 
}) {
  const [ref, inView] = useInView(0.1);
  
  const animations = {
    fadeInUp: 'animate-fadeInUp',
    fadeInLeft: 'animate-fadeInLeft', 
    fadeInRight: 'animate-fadeInRight',
    scaleIn: 'animate-scaleIn',
    slideInUp: 'animate-slideInUp'
  };

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? animations[animation] : 'opacity-0'} transition-all duration-700`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Componente de loading melhorado
export function LoadingSpinner({ size = 'md', color = 'purple' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    purple: 'border-purple-500',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

// Componente de partículas flutuantes
export function FloatingParticles() {
  // Valores determinísticos para evitar mismatch de hidratação
  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 83) % 100}%`,
    delay: `${(i % 6) * 0.35}s`,
    duration: `${3 + (i % 4)}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-float"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}
    </div>
  );
}

// Scroll reveal para elementos
export function ScrollReveal({ children, direction = 'up', className = '' }) {
  const [ref, inView] = useInView();
  
  const directions = {
    up: 'translate-y-8',
    down: 'translate-y-[-32px]',
    left: 'translate-x-8', 
    right: 'translate-x-[-32px]'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        inView 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${directions[direction]}`
      }`}
    >
      {children}
    </div>
  );
}

// Efeito de typing
export function TypingEffect({ 
  text, 
  speed = 50, 
  className = '', 
  onComplete 
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-blink">|</span>}
    </span>
  );
}

// Counter animado
export function AnimatedCounter({ 
  value, 
  duration = 1000, 
  prefix = '', 
  suffix = '',
  className = '' 
}) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const startValue = 0;
    const endValue = value;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (endValue - startValue) + startValue));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}