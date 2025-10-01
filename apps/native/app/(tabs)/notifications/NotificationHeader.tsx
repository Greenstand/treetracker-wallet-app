import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// This component is the Notification Header for the Mobile App.
// It replicates the functionality and style of the Web Header using React Native components.
export default function NotificationHeader() {
  // Initialize router for navigation functionality
  const router = useRouter();

  // Handler for the back button (Home navigation)
  const handleBackPress = () => {
    // Use router.replace to navigate to the home screen (/home)
    router.replace("/home");
  };

  // Handler for the settings button
  const handleSettingsPress = () => {
    // Use router.push to navigate to the settings screen (/settings)
    router.push("/settings");
  };

  return (
    // Header container (replicating Web's Box display: flex)
    <View style={styles.header}>
      {/* Left side: Back Button and Title (replicating Web's Box gap: 2) */}
      <View style={styles.headerLeft}>
        {/* FIX: Using accessibilityRole="button" to ensure reliable unit testing */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleBackPress}
          accessibilityRole="button" // ⬅️ 关键修复
        >
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        {/* Title text */}
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Right side: Settings Button */}
      {/* FIX: Using accessibilityRole="button" to ensure reliable unit testing */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleSettingsPress}
        accessibilityRole="button" // ⬅️ 关键修复
      >
        <Ionicons name="settings-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8, // Horizontal padding alignment
    paddingVertical: 12, // Vertical padding alignment
    backgroundColor: "#fff", // White background for clean look
    borderBottomWidth: 1,
    borderBottomColor: "#eee", // Light separator line
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20, // Font size aligned with h5 equivalent
    fontWeight: "400", // Font weight aligned with typical secondary text
    color: "#666", // Color aligned with Web's text.secondary
    marginLeft: 8, // Spacing alignment
  },
  iconButton: {
    padding: 8, // Touch target padding
  },
});
