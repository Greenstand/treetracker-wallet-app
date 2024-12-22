import {
  SafeAreaView,
  type StyleProp,
  type ViewProps,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedSafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  style: StyleProp<ViewStyle>;
};

export function ThemedSafeAreaView({
  darkColor,
  lightColor,
  style,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor(
    { dark: darkColor, light: lightColor },
    "background",
  );

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
