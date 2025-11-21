import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@utils/dimensions";

// Scale function for responsive design
export const scaleSize = (size: number) => {
  const scale = WINDOW_WIDTH / 375;
  return Math.round(size * Math.min(scale, 1.5));
};

export const LAYOUT = {
  screenPadding: WINDOW_WIDTH * 0.05,
  listBottomPadding: WINDOW_HEIGHT * 0.02,
  sectionSpacing: WINDOW_HEIGHT * 0.03,
  itemSpacing: WINDOW_HEIGHT * 0.015,
  cardBorderRadius: 4,
  iconSize: 32,
  buttonHeight: 48,
} as const;

export const COLORS = {
  primary: "#61892F",
  green: "#61892F",
  lightGreen: "#86C232",
  tint: "#61892F",

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  charcoal: "#3f4245",

  // Gray Scale (enhanced from your existing colors)
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E0E0E0",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  lightGray: "#EEEEEE",
  darkGray: "#2226298F",
  gray: "#E0E0E0",

  muted: "#22262999",
  success: "#86C232",
  error: "#D32F2F",
  warning: "#FF7A00",
  info: "#3B82F6",

  red: "#D32F2F",
  lightOrange: "#FF7A0080",

  background: "#F5F5F5",
  surface: "#F8F9FA",

  blackOverlay: "rgba(0, 0, 0, 0.5)",
  shadowLight: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.2)",

  tabIconDefault: "#2226298F",
  tabIconSelected: "#61892F",
} as const;

export const TYPOGRAPHY = {
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 34,
  },
  weight: {
    regular: "Roboto_400Regular" as const,
    medium: "Roboto_500Medium" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const THEME = {
  layout: LAYOUT,
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  scaleSize,
} as const;

export type ColorPalette = keyof typeof COLORS;
export type TypographySize = keyof typeof TYPOGRAPHY.size;
export type TypographyWeight = keyof typeof TYPOGRAPHY.weight;
export type SpacingSize = keyof typeof SPACING;
