import { useFocusEffect } from '@react-navigation/native'; // Import the hook
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { SafeAreaView, Text, View, Vibration } from 'react-native';

import { useCamera } from '~/components/CameraProvider';
import { Button } from '~/components/ui/button';
import { Aperture, SwitchCamera, Zap, ZapOff } from '~/lib/icons';

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
    return <View />;
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
          <View className="absolute inset-x-0 bottom-10 h-20">
            <Button
              variant="ghost"
              size="icon"
              onPress={takePicture}
              className="left-1/2 top-0 -translate-x-1/2 border-2 border-white">
              <Aperture className="size-14 text-white" />
            </Button>
          </View>
        </CameraView>
      )}
    </SafeAreaView>
  );
}
