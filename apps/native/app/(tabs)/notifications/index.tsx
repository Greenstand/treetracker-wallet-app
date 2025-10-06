import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import WalletSvg from "../../../assets/svg/wallet.svg";

// Mock notification data
const notifications: Notification[] = [
  {
    id: 1,
    type: "pending",
    title: "Pending tokens from Restaurant XY to Wallet 1",
    description:
      "You will receive confirmation once the transaction is successful.",
    time: "1h",
    icon: "XY",
  },
  {
    id: 2,
    type: "received",
    title: "Received tokens from Restaurant XY to Wallet 1",
    description:
      "You received 100 tokens to your Wallet 1 from Restaurant XY_wallet.",
    time: "6d",
    icon: "XY",
  },
  {
    id: 3,
    type: "pending",
    title: "Pending tokens from Restaurant XY to Wallet 1",
    description:
      "You will receive confirmation once the transaction is successful.",
    time: "6d",
    icon: "XY",
  },
  {
    id: 4,
    type: "sent",
    title: "Sent tokens to Greenstand from Wallet 2",
    description:
      "You have sent 200 tokens from your Wallet 2 to Greenstand_wallet.",
    time: "7d",
    icon: "GR",
  },
];

// Notification data structure
type Notification = {
  id: number;
  type: "pending" | "received" | "sent";
  title: string;
  description: string;
  time: string;
  icon: string;
};

// Individual notification item component
const NotificationItem = ({
  notification,
  isLatest,
}: {
  notification: Notification;
  isLatest?: boolean;
}) => {
  // Highlight latest pending notifications
  const getBackgroundColor = () => {
    if (isLatest && notification.type === "pending") {
      return "#FFF3CD";
    }
    return "#F8F9FA";
  };

  return (
    <View
      style={[
        styles.notificationItem,
        { backgroundColor: getBackgroundColor() },
      ]}>
      {/* Icon container */}
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{notification.icon}</Text>
      </View>
      {/* Notification content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
      </View>
      {/* Timestamp */}
      <Text style={styles.time}>{notification.time}</Text>
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
    // contentWrapper now handles the flexible layout of the main content area
    <View style={styles.contentWrapper}>
      {/* Header rendering logic was removed, as it now resides in _layout.tsx */}

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
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    // Container equivalent for main content
    flex: 1,
  },
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
});
