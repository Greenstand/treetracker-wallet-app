import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image as RNImage,
} from "react-native";
import { THEME, TypographyWeight } from "@/theme";
import Avatar from "@components/ui/common/Avatar";

export default function QRCodeDisplay({ onPress }: { onPress?: () => void }) {
  const { colors, spacing, typography, layout } = THEME;
  const qrIconUri = RNImage.resolveAssetSource(
    require("@assets/images/QRIcon.png"),
  ).uri;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Scan or show QR code"
      accessibilityHint="Open QR code actions to send or request tokens"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.white,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          marginTop: 30,
          borderRadius: layout.cardBorderRadius,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.avatarWrapper}>
        <Avatar
          id="scan-qr-card"
          avatarUrl={qrIconUri}
          fallbackImage={require("@assets/images/QRIcon.png")}
          size={48}
          backgroundColor="transparent"
        />
      </View>
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
            {
              color: colors.gray500,
              fontSize: typography.size.sm,
            },
          ]}
        >
          Quickly send or request tokens
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
});
