import type { Media } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const album1 = PlaceHolderImages.find((img) => img.id === 'album1')?.imageUrl || '';
const album2 = PlaceHolderImages.find((img) => img.id === 'album2')?.imageUrl || '';
const album3 = PlaceHolderImages.find((img) => img.id === 'album3')?.imageUrl || '';

export const songs: Media[] = [
  {
    id: 'song1',
    type: 'song',
    title: 'Mirage',
    artist: 'Stellardrone',
    albumArtUrl: album1,
  },
  {
    id: 'song2',
    type: 'song',
    title: 'Echoes in the Void',
    artist: 'Cosmic Waves',
    albumArtUrl: album2,
  },
  {
    id: 'song3',
    type: 'song',
    title: 'Neon Dreams',
    artist: 'Cyber-Symphony',
    albumArtUrl: album3,
  },
];

export const podcasts: Media[] = [
  {
    id: 'podcast1',
    type: 'podcast',
    title: 'The Future of AI',
    artist: 'Tech Forward',
    theme: 'artificial intelligence breakthroughs',
  },
  {
    id: 'podcast2',
    type: 'podcast',
    title: 'Deep Dive: Quantum Physics',
    artist: 'Science Unlocked',
    theme: 'quantum mechanics concepts',
  },
  {
    id: 'podcast3',
    type: 'podcast',
    title: 'History of Ancient Rome',
    artist: 'Past Perspectives',
    theme: 'ancient roman empire history',
  },
];
