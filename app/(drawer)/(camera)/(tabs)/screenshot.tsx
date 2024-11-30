import { useRef } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';

import { useCamera } from '~/components/CameraProvider';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Aperture, CircleX } from '~/lib/icons';

export default function Index() {
  const { photoUri, setPhotoUri } = useCamera();
  const imageRef = useRef<View>(null);

  const screenshot = async () => {
    try {
      const localUri = await captureRef(imageRef);

      setPhotoUri(localUri);
    } catch (e: any) {
      console.error(e?.message);
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View
        ref={imageRef}
        className="flex-1 border-2 border-red-500 p-4"
        // style={{ flex: 1, padding: 16, borderWidth: 2, borderColor: 'red' }}
        // options={{ format: 'png', quality: 1, result: 'data-uri' }}
        collapsable={false}>
        {photoUri ? (
          <Image className="flex-1" source={{ uri: photoUri }} />
        ) : (
          <View className="flex flex-1 items-center justify-center">
            <Text>Don't have Photo</Text>
          </View>
        )}
      </View>
      <View className="absolute inset-x-0 bottom-16 h-24">
        <Button
          variant="ghost"
          size="icon"
          onPress={() => setPhotoUri(null)}
          className="absolute left-3.5 top-0">
          <CircleX className="size-14 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onPress={screenshot}
          className="left-1/2 top-0 -translate-x-1/2 border-2 border-white">
          <Aperture className="size-14 text-white" />
        </Button>
      </View>
    </SafeAreaView>
  );
}
