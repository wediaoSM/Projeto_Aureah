'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Carrega favoritos do localStorage ao inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('musicFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Salva favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('musicFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (trackId) => {
    setFavorites(prev => {
      if (!prev.includes(trackId)) {
        return [...prev, trackId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (trackId) => {
    setFavorites(prev => prev.filter(id => id !== trackId));
  };

  const toggleFavorite = (trackId) => {
    if (favorites.includes(trackId)) {
      removeFromFavorites(trackId);
    } else {
      addToFavorites(trackId);
    }
  };

  const isFavorite = (trackId) => {
    return favorites.includes(trackId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      getFavoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}