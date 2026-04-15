import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { ErrorHandler } from '@/components/error-handler/error-handler';
import { queryClient } from '@/lib/query-client';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  require("../../ReactotronConfig");
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Set the navigation bar style
      NavigationBar.setStyle('light');
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DefaultTheme}>
          <ErrorHandler>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="feed"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                  ...(Platform.OS === 'ios' ? { fullScreenGestureEnabled: true } : {}),
                }}
              />
            </Stack>
          </ErrorHandler>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
