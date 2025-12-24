import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { THEME, TypographyWeight } from "@/theme";

export default function ScanQRCodeCard({ onPress }: { onPress?: () => void }) {
  const { colors, spacing, typography, layout } = THEME;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
          padding: spacing.md,
          borderRadius: layout.cardBorderRadius,
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={require("@assets/images/QRIcon.png")}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              color: colors.gray900,
              fontSize: typography.size.lg,
              fontWeight: typography.weight.medium as TypographyWeight,
            },
          ]}
        >
          Scan or show QR code
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.gray500,
              fontSize: typography.size.sm,
            },
          ]}
        >
          Quickly send or request tokens
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {},
});
