import React from "react";
import { StatusBar, type StatusBarProps } from "react-native";

export type ThemedStatusBarProps = StatusBarProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedStatusBar({
  darkColor,
  lightColor,
  ...otherProps
}: ThemedStatusBarProps) {
  return (
    <StatusBar
      barStyle={darkColor ? "light-content" : "dark-content"}
      {...otherProps}
    />
  );
}
