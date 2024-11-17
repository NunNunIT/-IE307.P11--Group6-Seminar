import { Stack } from 'expo-router';

import { CameraProvider } from '~/components/CameraProvider';

export default function CameraLayout() {
  return (
    <CameraProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="image-preview"
          options={{
            headerShown: false,
            title: 'Image Review',
            presentation: 'modal',
          }}
        />
      </Stack>
    </CameraProvider>
  );
}
