import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "PawluApp",
  slug: "PawluApp",
  scheme: "pawluapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/app-icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    storybookMode: process.env.STORYBOOK_MODE,
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "co.pawlu.app",
  },

  android: {
    package: "com.pawlu.app",
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/app-icon.png",
      backgroundColor: "#ffffff",
    },
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/app-icon.png",
  },

  plugins: [
    [
      "expo-router",
      {
        origin: process.env.EXPO_PUBLIC_BASE_URL,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/app-logo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./src/assets/fonts/Inter_ExtraLight.ttf",
          "./src/assets/fonts/Inter_Light.ttf",
          "./src/assets/fonts/Inter_Regular.ttf",
          "./src/assets/fonts/Inter_Medium.ttf",
          "./src/assets/fonts/Inter_SemiBold.ttf",
          "./src/assets/fonts/Inter_Bold.ttf",
        ],
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },
});
