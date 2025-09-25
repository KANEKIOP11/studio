// src/ai/flows/suggest-inspirational-wallpaper.ts
'use server';
/**
 * @fileOverview Flow to suggest an inspirational wallpaper based on the theme of a podcast.
 *
 * - suggestInspirationalWallpaper - A function that suggests an inspirational wallpaper based on podcast theme.
 * - SuggestInspirationalWallpaperInput - The input type for the suggestInspirationalWallpaper function.
 * - SuggestInspirationalWallpaperOutput - The return type for the suggestInspirationalWallpaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInspirationalWallpaperInputSchema = z.object({
  podcastTheme: z
    .string()
    .describe('The theme of the podcast currently playing.'),
});
export type SuggestInspirationalWallpaperInput = z.infer<
  typeof SuggestInspirationalWallpaperInputSchema
>;

const SuggestInspirationalWallpaperOutputSchema = z.object({
  suggestedWallpaper: z.string().describe(
    'A data URI representing an inspirational wallpaper image that aligns with the podcast theme.'
  ),
});
export type SuggestInspirationalWallpaperOutput = z.infer<
  typeof SuggestInspirationalWallpaperOutputSchema
>;

export async function suggestInspirationalWallpaper(
  input: SuggestInspirationalWallpaperInput
): Promise<SuggestInspirationalWallpaperOutput> {
  return suggestInspirationalWallpaperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInspirationalWallpaperPrompt',
  input: {schema: SuggestInspirationalWallpaperInputSchema},
  output: {schema: SuggestInspirationalWallpaperOutputSchema},
  prompt: `You are an AI assistant designed to suggest inspirational wallpapers based on the theme of a podcast.

  The user is currently listening to a podcast with the theme: {{{podcastTheme}}}.

  Suggest an inspirational wallpaper that visually represents the podcast theme. Return the wallpaper as a text description that can be used to generate an image with an image generation model.
  Do not actually generate the image, just describe it.
  For example, if the theme is "space exploration", you might suggest a wallpaper of a nebula.
  `,
});

const suggestInspirationalWallpaperFlow = ai.defineFlow(
  {
    name: 'suggestInspirationalWallpaperFlow',
    inputSchema: SuggestInspirationalWallpaperInputSchema,
    outputSchema: SuggestInspirationalWallpaperOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output?.suggestedWallpaper) {
      throw new Error('No wallpaper suggested');
    }
    const image = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: output.suggestedWallpaper,
    });
    return {suggestedWallpaper: image.media?.url!};
  }
);
