import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { ThemedSafeAreaView } from "@/components/ThemeSafeArea";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

import { Button } from "../components/Button";

export default function Index() {
  const handleGoTo = () => {
    // Do something
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ThemedStatusBar />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Account created!
          </ThemedText>

          <View style={styles.iconContainer}>
            <Feather name="check-circle" size={64} color={Colors.green} />
          </View>

          <ThemedText type="default" style={styles.welcomeText}>
            Welcome and thank you for joining our reforestation mission and
            becoming part of our global community dedicated to positive
            environmental impact.
          </ThemedText>

          <ThemedText type="default" style={styles.walletText}>
            Upon creating your account, you will automatically receive your
            wallet, which you can rename later.
          </ThemedText>
        </View>

        <Button onPress={handleGoTo} title="CONTINUE" />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 32,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  walletText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
