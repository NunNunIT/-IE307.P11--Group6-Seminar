import * as ScreenCapture from 'expo-screen-capture';
import { useCallback, useState } from 'react';
import { Platform, View, SafeAreaView } from 'react-native';

import { Alert, AlertTitle } from '~/components/deprecated-ui/alert';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { AlertCircle } from '~/lib/icons';

export default function ScreenCaptureSettings() {
  const [isPreventing, setIsPreventing] = useState(false);

  // Handle toggle
  const togglePreventing = useCallback(async () => {
    try {
      if (!isPreventing) {
        await ScreenCapture.preventScreenCaptureAsync();
      } else {
        await ScreenCapture.allowScreenCaptureAsync();
      }
      setIsPreventing((prev) => !prev);
    } catch (error: any) {
      console.log('Toggle screen capture error:', error.message);
    }
  }, [isPreventing]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-background">
      {Platform.OS !== 'android' && (
        <View className="p-4">
          <Alert variant="destructive" icon={AlertCircle}>
            <AlertTitle>This feature is only available on Android</AlertTitle>
          </Alert>
        </View>
      )}
      <View className="p-4">
        <Button
          onPress={togglePreventing}
          variant="ghost"
          className="w-full flex-row items-center justify-between rounded-lg bg-card p-4">
          <View className="flex-row items-center space-x-3">
            <Label className="text-base font-medium">Prevent Screenshots</Label>
          </View>
          <Switch checked={isPreventing} onCheckedChange={togglePreventing} className="ml-auto" />
        </Button>
      </View>
    </SafeAreaView>
  );
}
