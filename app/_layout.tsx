import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="petprofile/[id]" options={{
            presentation: "containedModal",
            animation: 'fade',
            headerShown: true,
            title: 'Profile',
          }}/>
        <Stack.Screen name="welcome/index" options={{
          presentation: "fullScreenModal",
          headerShown: false,
          title: "welcome",
          animation: "slide_from_bottom",
        }}/>
        <Stack.Screen name="welcome/login" options={{
          presentation: "modal",
          animation: "flip",
          headerShown: true,
          //headerTransparent: true,
          title: "login"
        }}/>
        <Stack.Screen name="welcome/signup" options={{
          headerShown: true,
          presentation: "modal",
          animation: "flip",
          title: "Create Account..."
        }}/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
