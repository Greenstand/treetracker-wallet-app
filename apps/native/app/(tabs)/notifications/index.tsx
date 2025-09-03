import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function NotificationsLayout() {
  const handleBackPress = () => {
    // Replace with navigation.goBack() if using React Navigation
    console.log("Back button pressed");
  };

  const handleSettingsPress = () => {
    console.log("Settings button pressed");
  };
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#222629DE" />
          </TouchableOpacity>

          <Text style={[styles.commonText, styles.description]}>
            Notifications
          </Text>

          <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons name="settings-outline" size={24} color="#222629DE" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
});
