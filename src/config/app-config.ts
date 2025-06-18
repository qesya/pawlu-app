import Constants from "expo-constants";

export const APP_CONFIG = {
  BASE_URL: Constants?.expoConfig?.extra?.baseURL ?? "",
  STORYBOOK_MODE: Constants?.expoConfig?.extra?.storybookMode ?? "",
};
