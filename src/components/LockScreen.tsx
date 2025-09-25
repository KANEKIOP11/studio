'use client';

import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { Button } from './ui/button';
import { Unlock } from 'lucide-react';

export default function LockScreen() {
  const { isLocked, setLocked, currentMedia } = useAppContext();

  if (!isLocked || !currentMedia || !currentMedia.albumArtUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-2xl animate-fade-in">
      <div className="relative mb-8 h-64 w-64 overflow-hidden rounded-2xl shadow-2xl md:h-80 md:w-80">
        <Image
          src={currentMedia.albumArtUrl}
          fill
          alt={currentMedia.title}
          className="object-cover"
        />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground">{currentMedia.title}</h2>
        <p className="text-lg text-muted-foreground">{currentMedia.artist}</p>
      </div>
      <Button
        variant="ghost"
        size="lg"
        className="mt-12 text-muted-foreground hover:bg-transparent hover:text-primary-foreground"
        onClick={() => setLocked(false)}
      >
        <Unlock className="mr-2 h-5 w-5" />
        Click to Unlock
      </Button>
    </div>
  );
}
