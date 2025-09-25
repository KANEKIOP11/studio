'use client';

import { useAppContext } from '@/context/AppContext';
import { songs, podcasts } from '@/lib/data';
import type { Media } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Image from 'next/image';
import { Music, Pause, Play, Podcast, Square, Rss } from 'lucide-react';
import { Separator } from './ui/separator';

export default function Player() {
  const { currentMedia, isPlaying, playMedia, stopMedia } = useAppContext();

  const MediaItem = ({ item }: { item: Media }) => (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        {item.type === 'song' && item.albumArtUrl ? (
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={item.albumArtUrl} alt={item.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-muted">
            <Rss className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.artist}</p>
        </div>
      </div>
      {isPlaying && currentMedia?.id === item.id ? (
        <Button variant="ghost" size="icon" onClick={stopMedia} aria-label="Stop">
          <Square className="h-5 w-5 text-primary" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => playMedia(item)} aria-label="Play">
          <Play className="h-5 w-5" />
        </Button>
      )}
    </div>
  );

  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Media Player</CardTitle>
        <CardDescription>Select music or a podcast to begin.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPlaying && currentMedia && (
          <div className="mb-6">
            <p className="text-sm font-medium text-accent mb-2">Now Playing</p>
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              {currentMedia.type === 'song' && currentMedia.albumArtUrl ? (
                 <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={currentMedia.albumArtUrl} alt={currentMedia.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-muted">
                  <Rss className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-grow">
                <p className="font-bold text-lg">{currentMedia.title}</p>
                <p className="text-muted-foreground">{currentMedia.artist}</p>
              </div>
               <Button variant="outline" size="icon" onClick={stopMedia} aria-label="Stop">
                <Pause className="h-5 w-5" />
              </Button>
            </div>
             <Separator className="my-6" />
          </div>
        )}
       
        <Tabs defaultValue="music">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">
              <Music className="mr-2 h-4 w-4" /> Music
            </TabsTrigger>
            <TabsTrigger value="podcasts">
              <Podcast className="mr-2 h-4 w-4" /> Podcasts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="music" className="mt-4 space-y-2">
            {songs.map((song) => (
              <MediaItem key={song.id} item={song} />
            ))}
          </TabsContent>
          <TabsContent value="podcasts" className="mt-4 space-y-2">
            {podcasts.map((podcast) => (
              <MediaItem key={podcast.id} item={podcast} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
