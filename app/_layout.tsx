import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import { SupabaseProvider } from '@/context/SupaBaseContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!


  const InitialLayout = () => {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
  
    useEffect(() => {
      if (!isLoaded) return;
  
      const inAuthGroup = segments[0] === '(authenticated)';
  
      if (isSignedIn && !inAuthGroup) {
        router.replace('/(authenticated)/(tabs)/index');
      } else if (!isSignedIn) {
        router.replace('/');
      }
    }, [isSignedIn]);
  
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
  
    return (
      <SupabaseProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
        </Stack>
      </SupabaseProvider>
    );
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey} >
      <ActionSheetProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ThemeProvider>
    </ActionSheetProvider>
    </ClerkProvider>
  );
}
