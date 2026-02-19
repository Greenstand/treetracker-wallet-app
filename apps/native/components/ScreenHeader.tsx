import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "@/theme";

type ScreenHeaderProps = {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  onBackPress,
  showBackButton = false,
  rightAction,
}: ScreenHeaderProps) {
  const { colors, typography, spacing } = THEME;

  return (
    <View style={[styles.header, { backgroundColor: colors.white }]}>
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && (
          <Pressable
            onPress={onBackPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.charcoal}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text
          style={[
            styles.title,
            {
              fontSize: typography.size.lg,
              fontWeight: "600",
              color: colors.charcoal,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>{rightAction}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  leftSection: {
    width: 40,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
  },
  rightSection: {
    width: 40,
    alignItems: "flex-end",
  },
});
