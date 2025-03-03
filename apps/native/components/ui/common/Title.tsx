import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Title(props: { title: string }) {
  return <Text style={styles.title}>{props.title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
