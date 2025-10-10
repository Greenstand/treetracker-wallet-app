import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Import the Header component (It is now in the same directory)
import NotificationHeader from "./NotificationHeader";

export default function NotificationsLayout() {
  return (
    // SafeAreaView is required to ensure the Header is not obscured by the status bar
    <SafeAreaView style={styles.container}>
      {/* RENDER THE CUSTOM HEADER */}
      <NotificationHeader />

      {/* Stack renders the content of the child routes (index.tsx)
          We set headerShown: false because the header is manually rendered above. */}
      <Stack
        screenOptions={{
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
