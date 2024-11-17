import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { router, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';

import { Button } from '~/components/ui/button';
import { NAV_THEME } from '~/lib/constants';
import { GalleryThumbnails } from '~/lib/icons';
import { useColorScheme } from '~/lib/useColorScheme';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Inter_700Bold',
      fontWeight: 'normal',
    },
    heavy: {
      fontFamily: 'Inter_800ExtraBold',
      fontWeight: 'normal',
    },
  },
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Inter_700Bold',
      fontWeight: 'normal',
    },
    heavy: {
      fontFamily: 'Inter_800ExtraBold',
      fontWeight: 'normal',
    },
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(camera)',
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Drawer>
        <Drawer.Screen
          name="(camera)"
          options={{
            title: 'Camera, Screenshot',
            headerRight: () => (
              <Button
                size="icon"
                variant="ghost"
                className="mr-2"
                onPress={() => router.push('/(camera)/image-preview')}>
                <GalleryThumbnails className="size-10 text-black dark:text-white" />
              </Button>
            ),
          }}
        />
        <Drawer.Screen name="(audio-video)" options={{ title: 'Audio, Video' }} />
      </Drawer>
    </ThemeProvider>
  );
}
