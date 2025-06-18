jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
    back: jest.fn(),
    useLocalSearchParams: jest.fn(() => ({})),
  },
}));

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({ top: 0, bottom: 20, left: 0, right: 0 }),
}));

jest.mock("react-native-gesture-handler", () => {
  const actual = jest.requireActual("react-native-gesture-handler");
  return {
    ...actual,
    GestureHandlerRootView: jest
      .fn()
      .mockImplementation(({ children }) => children),
    GestureDetector: jest.fn().mockImplementation(({ children }) => children),
  };
});

jest.mock("react-native-keyboard-controller", () => {
  const React = require("react");
  return {
    KeyboardAwareScrollView: ({ children }) => <>{children}</>,
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
  multiMerge: jest.fn(() => Promise.resolve()),
}));
