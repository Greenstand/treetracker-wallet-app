import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

// Import the Header component (It is now in the same directory)
import NotificationHeader from "./NotificationHeader";

export default function NotificationsLayout() {
  return (
    // SafeAreaView is required to ensure the Header is not obscured by the status bar
    <SafeAreaView style={styles.container}>
      {/* RENDER THE HEADER COMPONENT HERE (as required by the maintainer) */}
      <NotificationHeader />

      {/* Stack will render the index.tsx content below the Header */}
      <Stack
        screenOptions={{
          // Must be kept false, as we are manually rendering the Header
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
