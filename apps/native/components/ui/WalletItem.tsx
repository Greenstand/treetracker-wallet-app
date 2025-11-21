import { THEME, TypographyWeight } from "@/theme";
import React from "react";
import { Image, StyleSheet, Text, View, ImageStyle } from "react-native";
const { colors, typography, layout, spacing } = THEME;

interface WalletItemProps {
  item: {
    id: string;
    logo?: any;
    name: string;
    status: string;
    balance: number;
  };
}

const WalletItem = ({ item }: WalletItemProps) => {
  return (
    <View style={styles.walletItemContainer}>
      <View style={styles.rowAlignCenter}>
        <Image
          source={require("../../assets/images/greenstandLogo.png")}
          style={styles.walletIcon as ImageStyle}
        />
        <View>
          <Text style={styles.walletName}>{item.name}</Text>
          <Text style={[styles.walletStatus, styles.textMuted]}>
            {item.status}
          </Text>
        </View>
      </View>
      <Text style={[styles.walletBalance, styles.textMuted]}>
        {item.balance}
      </Text>
    </View>
  );
};
export default WalletItem;

const styles = StyleSheet.create({
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  textMuted: {
    color: colors.charcoal,
  },

  walletItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    marginBottom: 2,
  },

  walletIcon: {
    width: layout.iconSize,
    height: layout.iconSize,
    borderRadius: layout.iconSize / 2,
    margin: 10,
  },

  walletName: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.regular as TypographyWeight,
    color: colors.black,
    marginBottom: spacing.xs,
  },

  walletStatus: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular as TypographyWeight,
  },

  walletBalance: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.regular as TypographyWeight,
    color: colors.charcoal,
  },
});
