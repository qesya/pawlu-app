import { APP_CONFIG } from "@/src/config/app-config";
import { useColorScheme } from "@/src/hooks";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadAsync, useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { JSX, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

WebBrowser.maybeCompleteAuthSession();

const queryClient = new QueryClient();

function RootLayout(): JSX.Element | null {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterExtraLight: require("../assets/fonts/Inter_ExtraLight.ttf"),
    InterLight: require("../assets/fonts/Inter_Light.ttf"),
    InterRegular: require("../assets/fonts/Inter_Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter_Medium.ttf"),
    InterSemibold: require("../assets/fonts/Inter_SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter_Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen
                  name="product-details"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="checkout"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="my-cart" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="dark" />
            </ThemeProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

let AppEntryPoint: React.ComponentType = RootLayout;

if (APP_CONFIG.STORYBOOK_MODE === "true") {
  SplashScreen.hideAsync();
  loadAsync({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterExtraLight: require("../assets/fonts/Inter_ExtraLight.ttf"),
    InterLight: require("../assets/fonts/Inter_Light.ttf"),
    InterRegular: require("../assets/fonts/Inter_Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter_Medium.ttf"),
    InterSemibold: require("../assets/fonts/Inter_SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter_Bold.ttf"),
  });
  AppEntryPoint = require("../../.storybook").default;
}

export default AppEntryPoint;
