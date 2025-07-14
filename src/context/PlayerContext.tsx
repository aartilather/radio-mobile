import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Station = {
  id: string;
  name: string;
  country: string;
  language?: string;
  url_resolved: string;
  bitrate?: number;
  codec?: string;
  tags?: string;
  votes?: number;
  favicon?: string;
};

type PlayerContextType = {
  currentStation: Station | null;
  setCurrentStation: (station: Station | null) => void;
  isPlaying: boolean;
  togglePlayback: () => void;
  favorites: Station[];
  toggleFavorite: (station: Station) => void;
  isFavorite: (station: Station) => boolean;
  playStation: (station: Station) => void;
  recents: Station[];
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Station[]>([]);
  const [recents, setRecents] = useState<Station[]>([]); // ✅ Recents

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleFavorite = (station: Station) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.url_resolved === station.url_resolved);
      return exists
        ? prev.filter((fav) => fav.url_resolved !== station.url_resolved)
        : [...prev, station];
    });
  };

  const isFavorite = (station: Station) => {
    return favorites.some((fav) => fav.url_resolved === station.url_resolved);
  };

  const playStation = (station: Station) => {
    setCurrentStation(station);
    setIsPlaying(true);

    // ✅ Add to Recents (without duplicates)
    setRecents(prev => {
      const already = prev.find(s => s.url_resolved === station.url_resolved);
      if (already) return prev;
      return [station, ...prev.slice(0, 9)]; // max 10 items
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        currentStation,
        setCurrentStation,
        isPlaying,
        togglePlayback,
        favorites,
        toggleFavorite,
        isFavorite,
        playStation,
        recents, // ✅ Expose recents
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
