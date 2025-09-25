import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Wallpaper from '@/components/Wallpaper';
import LockScreen from '@/components/LockScreen';

export const metadata: Metadata = {
  title: 'Dynamic Wallpaper',
  description: 'Your wallpaper, alive with sound.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppContextProvider>
          <Wallpaper />
          <LockScreen />
          {children}
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  );
}
