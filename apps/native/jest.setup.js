// jest.setup.js

// 1. Mock @expo/vector-icons
// This resolves the issue where Ionicons depends on expo-font/native modules.
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
  // Add other icon libraries used in your component here if needed
}));

// 2. Mock Expo Modules Core
// This resolves the critical "__fbBatchedBridgeConfig is not set" error by simulating native functionality.
jest.mock("expo-modules-core", () => ({
  // Mock NativeModulesProxy, which is the entry point for most Expo native modules
  NativeModulesProxy: {
    ExpoFont: {
      getAssetClassName: jest.fn(),
      loadAsync: jest.fn(),
    },
    // Mock ExponentConstants, which is often required during module initialization
    ExponentConstants: {
      isDevice: true,
    },
    // Add other native Expo modules here if tests fail
  },
  requireNativeViewManager: jest.fn(),
  requireNativeModule: jest.fn(),
}));

// 3. Mock React Native Navigation / Reanimated (Often unnecessary but good for context)
// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Note: If your code or dependencies use 'react-native-gesture-handler', you may need to mock it here as well.
