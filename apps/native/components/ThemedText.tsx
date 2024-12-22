import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  darkColor,
  lightColor,
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "roboto",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "roboto",
  },
  link: {
    color: "#0a7ea4",
    fontSize: 16,
    lineHeight: 30,
    fontFamily: "roboto",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "roboto",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
});
