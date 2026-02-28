import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME, TYPOGRAPHY } from "@/theme";

interface ActionButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
}

function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  const { colors, typography, spacing } = THEME;

  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: colors.gray300 }]}>
        <MaterialIcons name={icon} size={28} color={colors.white} />
      </View>
      <Text
        style={[
          styles.actionText,
          {
            color: colors.gray700,
            fontSize: typography.size.sm,
            fontFamily: typography.weight.medium,
            fontWeight: "500",
            marginTop: spacing.xs,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function RequestTab() {
  const { colors, typography, spacing } = THEME;

  return (
    <View style={styles.requestContent}>
      <Text
        style={[
          styles.walletName,
          {
            color: colors.gray700,
            fontSize: typography.size.xxl,
            fontFamily: typography.weight.regular,
          },
        ]}
      >
        Greenstand
      </Text>
      <View style={[styles.avatar, { backgroundColor: colors.gray400 }]}>
        <Text
          style={[
            styles.avatarText,
            {
              color: colors.white,
              fontSize: typography.size.xl,
              fontFamily: typography.weight.medium,
            },
          ]}
        >
          GR
        </Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <MaterialIcons name="qr-code-2" size={240} color={colors.gray800} />
      </View>
      <View style={styles.actionButtons}>
        <ActionButton icon="print" label="Print" />
        <ActionButton icon="message" label="Messages" />
        <ActionButton icon="share" label="Share" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  walletName: {
    marginVertical: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  avatarText: {
    fontWeight: "500",
  },
  qrCodeContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 10,
    marginBottom: 32,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 40,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    textAlign: "center",
  },
});
