import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface HeadingProps extends TextProps {
  title: string;
}

export default function Heading({ title, style, ...rest }: HeadingProps) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
