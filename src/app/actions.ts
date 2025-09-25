'use server';

import { suggestInspirationalWallpaper } from '@/ai/flows/suggest-inspirational-wallpaper';

export async function getInspirationalWallpaper(theme: string) {
  try {
    const result = await suggestInspirationalWallpaper({ podcastTheme: theme });
    if (!result.suggestedWallpaper) {
      throw new Error('AI did not return a wallpaper.');
    }
    return { success: true, url: result.suggestedWallpaper };
  } catch (error) {
    console.error('Error generating inspirational wallpaper:', error);
    return { success: false, error: 'Failed to generate inspirational wallpaper.' };
  }
}
