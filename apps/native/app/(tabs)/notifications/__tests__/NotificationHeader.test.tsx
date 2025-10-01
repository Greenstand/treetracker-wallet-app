// --- START OF FILE ---

// 1. MOCK NATIVE EXPO/RN MODULES (Crucial for preventing native module crashes in Jest)
jest.mock("expo-modules-core", () => ({
  NativeModulesProxy: {
    // Mock for vector-icons dependency
    ExpoFont: {
      getAssetClassName: jest.fn(),
      loadAsync: jest.fn(),
    },
    // Mock core Expo constants
    ExponentConstants: {
      isDevice: true,
    },
  },
  requireNativeViewManager: jest.fn(),
  requireNativeModule: jest.fn(),
}));

// 2. MOCK VECTOR ICONS
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
  AntDesign: "AntDesign",
}));

// ----------------------------------------------------
// ORIGINAL TEST IMPORTS START HERE
// ----------------------------------------------------
import React from "react";
// Import testing utilities
import { render, screen, fireEvent } from "@testing-library/react-native";
import NotificationHeader from "../NotificationHeader";

// ----------------------------------------------------
// MOCK EXPO ROUTER (Simulate navigation functionality)
// ----------------------------------------------------
const mockReplace = jest.fn();
const mockPush = jest.fn();

jest.mock("expo-router", () => {
  // Core Fix: Dynamically require TouchableOpacity inside the mock to avoid hoisting errors
  const { TouchableOpacity } = require("react-native");

  return {
    useRouter: () => ({
      replace: mockReplace,
      push: mockPush,
      back: jest.fn(),
    }),
    Stack: (props: any) => <>{props.children}</>,
    // Ensure Link uses a mocked TouchableOpacity
    Link: ({ children, ...props }: any) => (
      <TouchableOpacity {...props}>{children}</TouchableOpacity>
    ),
  };
});

describe("NotificationHeader Component Tests", () => {
  // Reset navigation mocks before each test to ensure clean assertions
  beforeEach(() => {
    mockReplace.mockClear();
    mockPush.mockClear();
  });

  // Test 1: Verify the Header renders all design elements (Visual/Structure Check)
  it('should successfully render the "Notifications" title and two clickable icons', () => {
    render(<NotificationHeader />);

    const titleElement = screen.getByText("Notifications");
    expect(titleElement).toBeDefined();

    // Check for the presence of the two buttons (back and settings)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  // Test 2: Verify the Back button triggers the correct navigation logic
  it("should navigate to /home using replace when the back button is pressed", () => {
    render(<NotificationHeader />);

    // Get the first button (Back)
    const backButton = screen.getAllByRole("button")[0];
    fireEvent.press(backButton);

    // Assert that router.replace was called with the home route
    expect(mockReplace).toHaveBeenCalledWith("/home");
  });

  // Test 3: Verify the Settings button triggers the correct navigation logic
  it("should navigate to /settings using push when the settings button is pressed", () => {
    render(<NotificationHeader />);

    // Get the second button (Settings)
    const settingsButton = screen.getAllByRole("button")[1];

    fireEvent.press(settingsButton);

    // Assert that router.push was called with the settings route
    expect(mockPush).toHaveBeenCalledWith("/settings");
  });
});
