import { DrawerContent } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DarkModeText from "~/components/darkModeOption/text";
import { Camera, Construction, Fullscreen, ScanQrCode } from "~/lib/icons";

const DrawerLayout = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Drawer>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Part 1: Camera
        </Text>
      </View>
      <Drawer.Screen
        name="(camera)/(tabs)/index"
        options={{
          headerTitle: "Camera",
          drawerLabel: "Camera",
          drawerIcon: ({ size, color }) => <Camera color={color} size={28} />,
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(camera)/(tabs)/scan-qr"
        options={{
          headerTitle: "Scan QR",
          drawerLabel: "Scan QR",
          drawerIcon: ({ size, color }) => (
            <ScanQrCode color={color} size={28} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(camera)/(tabs)/screenshot"
        options={{
          headerTitle: "Screenshot",
          drawerLabel: "Screenshot",
          drawerIcon: ({ size, color }) => (
            <Fullscreen color={color} size={28} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(camera)/(tabs)/prevent-screenshot"
        options={{
          headerTitle: "Prevent Screenshot",
          drawerLabel: "Prevent Screenshot",
          drawerIcon: ({ size, color }) => (
            <Construction color={color} size={28} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Part 2: Audio-Video
        </Text>
      </View>
      <Drawer.Screen
        name="(audio-video)/music-audio/index"
        options={{
          headerTitle: "Play Audio",
          drawerLabel: "Play Audio",
          drawerIcon: ({ size, color }) => (
            <Icon name="music" size={size} color={color} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(audio-video)/video/index"
        options={{
          headerTitle: "Play Video",
          drawerLabel: "Play Video",
          drawerIcon: ({ size, color }) => (
            <Icon name="film" size={size} color={color} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(audio-video)/text-to-speech/index"
        options={{
          headerTitle: "Text to Speech",
          drawerLabel: "Text to Speech",
          drawerIcon: ({ size, color }) => (
            <Icon name="volume-up" size={size} color={color} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(audio-video)/speech-to-text/index"
        options={{
          headerTitle: "Speech to Text",
          drawerLabel: "Speech to Text",
          drawerIcon: ({ size, color }) => (
            <Icon name="microphone-alt" size={size} color={color} />
          ),
          headerRight: () => <DarkModeText />,
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
