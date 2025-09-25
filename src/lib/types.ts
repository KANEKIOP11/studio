export type Media = {
  id: string;
  type: 'song' | 'podcast';
  title: string;
  artist: string;
  albumArtUrl?: string;
  theme?: string;
};
