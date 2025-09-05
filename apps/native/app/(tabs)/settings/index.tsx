import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type SettingsItemType = {
  id: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  subtitle?: string;
};

const settingsItems: SettingsItemType[] = [
  {
    id: "account",
    title: "Account",
    icon: "person",
    route: "/settings/account",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "notifications",
    route: "/settings/notifications",
  },
  {
    id: "privacy",
    title: "Data & Privacy",
    icon: "security",
    route: "/settings/privacy",
  },
  {
    id: "legal",
    title: "Legal",
    icon: "description",
    route: "/settings/legal",
  },
  {
    id: "support",
    title: "Support",
    icon: "help-outline",
    route: "/settings/support",
  },
  {
    id: "about",
    title: "About",
    icon: "info-outline",
    route: "/settings/about",
  },
  {
    id: "feedback",
    title: "Send feedback",
    subtitle: "App version 1.0",
    icon: "feedback",
    route: "/settings/feedback",
  },
];

const SettingsItem = ({
  item,
  onPress,
}: {
  item: SettingsItemType;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.settingsItem} onPress={onPress}>
      <View style={styles.itemLeftSection}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={item.icon} size={24} color="#666" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </Pressable>
  );
};

export default function Settings() {
  const handleItemPress = (route: string) => {
    // Navigation logic would go here
    console.log(`Navigate to: ${route}`);
  };

  const handleLogout = () => {
    // Logout logic would go here
    console.log("Logging out...");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header - commented out because header should not be implemented but ready to be added back or replaced.
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#666" />
        <Text style={styles.headerTitle}>Settings</Text>
        <Ionicons name="settings-outline" size={24} color="#666" />
      </View>
      */}

      <ScrollView style={styles.scrollContainer}>
        {/* Settings Title */}
        <Text style={styles.settingsTitle}>Settings</Text>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <View key={item.id}>
              <SettingsItem
                item={item}
                onPress={() => handleItemPress(item.route)}
              />
              {index < settingsItems.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Pressable onPress={handleLogout}>
            <Text style={styles.logoutText}>LOG OUT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // Header styles
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   backgroundColor: "#f5f5f5",
  // },
  // headerTitle: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   color: "#333",
  // },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginTop: 24,
    marginBottom: 16,
  },
  settingsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 24,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 68,
  },
  logoutContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textTransform: "uppercase",
  },
});
