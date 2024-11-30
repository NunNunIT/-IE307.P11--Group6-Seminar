import { Alert, AlertTitle } from '@/components/deprecated-ui/alert';
import { AlertCircle, Aperture, SwitchCamera, Zap, ZapOff } from '~/lib/icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView, Text, Vibration, View } from 'react-native';
import { useRef, useState } from 'react';

import { Button } from '~/components/ui/button';
import { useCamera } from '~/components/CameraProvider';
import { useFocusEffect } from '@react-navigation/native'; // Import the hook

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(true); // State to control camera visibility
  const [isFlashMode, setIsFlashMode] = useState(false);
  const { photoUri, setPhotoUri } = useCamera(); // Get the photo URI and setter
  const cameraRef = useRef<CameraView>(null);

  // Use useFocusEffect to handle screen focus/unfocus
  useFocusEffect(() => {
    // When screen is focused, show the camera
    setIsCameraVisible(true);

    // Cleanup function for when screen is unfocused
    return () => {
      setIsCameraVisible(false); // Hide the camera (unmount it)
      // Cancel any ongoing vibration when screen is unfocused
      Vibration.cancel();
    };
  });

  // Vibration patterns
  const shortVibration = () => {
    Vibration.vibrate(100); // Short vibration for 100ms
  };

  const shutterVibration = () => {
    // Pattern: wait 0ms -> vibrate 50ms -> wait 50ms -> vibrate 50ms
    Vibration.vibrate([0, 50, 50, 0]);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Alert variant="destructive" icon={AlertCircle}>
          <AlertTitle>Can't find the permission</AlertTitle>
        </Alert>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView className="flex flex-1">
        <View className="flex flex-1 justify-center">
          <Text className="pb-10 text-center">We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <Text>Grant permission</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
    shortVibration(); // Add feedback for camera flip
  }

  // Function to take a picture
  async function takePicture() {
    if (cameraRef.current) {
      shutterVibration();
      const photo = await cameraRef.current.takePictureAsync();
      if (photoUri) {
        URL.revokeObjectURL(photoUri); // Revoke the object URL
      }
      setPhotoUri(photo?.uri ?? null); // Save the photo URI
    }
  }

  const FlashIcon = isFlashMode ? Zap : ZapOff;

  return (
    <SafeAreaView className="flex flex-1">
      {isCameraVisible && (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          ref={cameraRef}
          flash={isFlashMode ? 'on' : 'off'}>
          <Button
            variant="ghost"
            size="icon"
            onPress={() => setIsFlashMode((prev) => !prev)}
            className="absolute left-3.5 top-3.5">
            <FlashIcon className="size-14 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onPress={toggleCameraFacing}
            className="absolute right-3.5 top-3.5">
            <SwitchCamera className="size-14 text-white" />
          </Button>
          <View className="absolute inset-x-0 bottom-0">
            <Button
              variant="ghost"
              size="icon"
              onPress={takePicture}
              className="absolute left-1/2 bottom-8 -translate-x-1/2">
              <Aperture className="text-white" size={48} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onPress={takePicture}
              className="absolute bottom-8 right-3.5">
              <Aperture className="text-white" size={48} />
            </Button>
          </View>
        </CameraView>
      )}
    </SafeAreaView>
  );
}
