import Player from '@/components/Player';
import Settings from '@/components/Settings';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="relative z-10 w-full max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Dynamic Wallpaper
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Your environment, alive with sound.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Player />
          </div>
          <div className="lg:col-span-2">
            <Settings />
          </div>
        </div>
      </div>
    </main>
  );
}
