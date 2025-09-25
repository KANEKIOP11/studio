'use client';

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Media } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getInspirationalWallpaper } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const defaultWallpaper = PlaceHolderImages.find((img) => img.id === 'default-wallpaper')?.imageUrl || '';

interface Settings {
  changeWallpaper: boolean;
  changeLockScreen: boolean;
}

interface AppContextType {
  isPlaying: boolean;
  currentMedia: Media | null;
  settings: Settings;
  wallpaperUrl: string;
  isLocked: boolean;
  isLoadingWallpaper: boolean;
  playMedia: (media: Media) => void;
  stopMedia: () => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
  setLocked: (locked: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const [settings, setSettings] = useState<Settings>({
    changeWallpaper: true,
    changeLockScreen: true,
  });
  const [wallpaperUrl, setWallpaperUrl] = useState<string>(defaultWallpaper);
  const [isLocked, setLocked] = useState(false);
  const [isLoadingWallpaper, setIsLoadingWallpaper] = useState(false);
  const { toast } = useToast();

  const playMedia = async (media: Media) => {
    setCurrentMedia(media);
    setIsPlaying(true);
    setLocked(false);

    if (media.type === 'song' && media.albumArtUrl) {
      if (settings.changeWallpaper) {
        setWallpaperUrl(media.albumArtUrl);
      }
      if (settings.changeLockScreen) {
        setTimeout(() => setLocked(true), 5000);
      }
    } else if (media.type === 'podcast' && media.theme) {
      if (settings.changeWallpaper) {
        setIsLoadingWallpaper(true);
        const result = await getInspirationalWallpaper(media.theme);
        if (result.success && result.url) {
          setWallpaperUrl(result.url);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error,
          });
        }
        setIsLoadingWallpaper(false);
      }
    }
  };

  const stopMedia = () => {
    setIsPlaying(false);
    setCurrentMedia(null);
    setLocked(false);
    if (settings.changeWallpaper) {
      setWallpaperUrl(defaultWallpaper);
    }
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const contextValue = useMemo(
    () => ({
      isPlaying,
      currentMedia,
      settings,
      wallpaperUrl,
      isLocked,
      isLoadingWallpaper,
      playMedia,
      stopMedia,
      updateSettings,
      setLocked,
    }),
    [isPlaying, currentMedia, settings, wallpaperUrl, isLocked, isLoadingWallpaper]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
