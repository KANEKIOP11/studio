'use client';

import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const { settings, updateSettings } = useAppContext();

  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Customize your experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="wallpaper-toggle" className="text-base font-medium">
              Change Wallpaper
            </Label>
            <p className="text-sm text-muted-foreground">
              Update background based on playing media.
            </p>
          </div>
          <Switch
            id="wallpaper-toggle"
            checked={settings.changeWallpaper}
            onCheckedChange={(checked) => updateSettings({ changeWallpaper: checked })}
            aria-label="Toggle wallpaper change"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="lockscreen-toggle" className="text-base font-medium">
              Enable Lock Screen
            </Label>
            <p className="text-sm text-muted-foreground">
              Show album art when music starts.
            </p>
          </div>
          <Switch
            id="lockscreen-toggle"
            checked={settings.changeLockScreen}
            onCheckedChange={(checked) => updateSettings({ changeLockScreen: checked })}
            aria-label="Toggle lock screen"
          />
        </div>
      </CardContent>
    </Card>
  );
}
