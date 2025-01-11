import React from "react";

import { ThemedText } from "./ThemedText";

import { TouchableOpacity, StyleSheet } from "react-native";

export type ButtonProps = {
  onPress: () => void;
  title: string;
};

export function Button({ onPress, title }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.87}>
      <ThemedText type="title" style={styles.text}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#61892F",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
