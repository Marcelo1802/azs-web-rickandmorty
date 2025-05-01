import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Episode } from '../types/apiTypes';

interface FavoritesContextProps {
  favorites: Episode[];
  toggleFavorite: (episode: Episode) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Episode[]>([]);

  const toggleFavorite = (episode: Episode) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.id === episode.id)) {
        return prevFavorites.filter((fav) => fav.id !== episode.id);
      } else {
        return [...prevFavorites, episode];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 