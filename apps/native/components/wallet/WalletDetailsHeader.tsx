import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type WalletDetailsHeaderProps = {
  title: string;
  showAction?: boolean;
  onBack?: () => void;
  onActionPress?: () => void;
};

export function WalletDetailsHeader({
  title,
  showAction = false,
  onBack,
  onActionPress,
}: WalletDetailsHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        hitSlop={12}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Ionicons name="arrow-back" size={22} color={Colors.darkGray} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {showAction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open filters"
          onPress={onActionPress}
          hitSlop={12}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.filterIcon}>
            <View style={styles.filterLineLong} />
            <View style={styles.filterLineMid} />
            <View style={styles.filterLineShort} />
          </View>
        </Pressable>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E3E3E3",
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlaceholder: {
    width: 36,
    height: 36,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.darkGray,
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  filterIcon: {
    width: 20,
    height: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterLineLong: {
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
  filterLineMid: {
    width: 14,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
  filterLineShort: {
    width: 8,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
});
