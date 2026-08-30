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
};

// Empty state when no notifications exist
const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.walletIcon}>
      <WalletSvg width={60} height={60} />
    </View>
    <Text style={styles.emptyText}>
      Come back here to get information about recent transactions, mentions and
      much more!
    </Text>
  </View>
);

// Main notifications screen component
export default function NotificationsLayout() {
  const hasNotifications = notifications.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header - commented out because header should not be implemented but ready to be added back or replaced.
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#666" />
        <Text style={styles.headerTitle}>Notifications</Text>
        <Ionicons name="settings-outline" size={24} color="#666" />
      </View>
      */}

      {/* Conditional rendering: show notifications list or empty state */}
      {hasNotifications ? (
        <ScrollView style={styles.scrollContainer}>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isLatest={index === 0}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
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
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9E9E9E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  walletIcon: {
    marginBottom: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    lineHeight: 24,
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
