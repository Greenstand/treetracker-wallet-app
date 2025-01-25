import React from "react";
import { StyleSheet, Text } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { ThemedSafeAreaView } from "@/components/ThemeSafeArea";

export default function Send() {
  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ThemedStatusBar />
      <ThemedView style={[styles.container]}>
        <Text style={[styles.commonText, styles.description]}>Send</Text>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f5f5f5",
  },
  content: {
    marginTop: 32,
  },
  commonText: {
    textAlign: "center",
    color: "#222629DE",
  },
  description: {
    fontSize: 20,
  },
});
