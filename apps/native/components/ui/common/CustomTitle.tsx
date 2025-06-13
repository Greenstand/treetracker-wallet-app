import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface TitleProps extends TextProps {
  title: string;
}

export default function CustomTitle({ title, style, ...rest }: TitleProps) {
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
