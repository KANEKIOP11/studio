'use client';

import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function Wallpaper() {
  const { wallpaperUrl, isLoadingWallpaper } = useAppContext();

  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <Image
        key={wallpaperUrl}
        src={wallpaperUrl}
        fill
        priority
        alt="Dynamic Wallpaper"
        className="object-cover animate-fade-in"
      />
      <div className="fixed inset-0 bg-black/50" />
      {isLoadingWallpaper && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Loader2 className="h-16 w-16 animate-spin text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
