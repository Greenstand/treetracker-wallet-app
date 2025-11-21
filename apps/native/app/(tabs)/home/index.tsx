import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Heading from "@common/Heading";
import WalletSummary from "@components/ui/WalletSummary";
import { THEME, TypographyWeight } from "@/theme";
import WalletItem from "@components/ui/WalletItem";
import { mockWalletActivity } from "@/data/data";

const { colors, typography, layout, spacing } = THEME;

export const balanceData = [
  { id: 1, value: "1000", label: "Tokens" },
  { id: 2, value: "2", label: "Wallets", icon: "wallet-outline" },
];

export default function Home() {
  const ActivityHeader = () => (
    <View style={styles.activitySection}>
      <View style={styles.balancesContainer}>
        {balanceData.map((item) => (
          <WalletSummary
            key={item.id}
            value={item.value}
            icon={
              item.label === "Tokens" ? (
                <MaterialIcons name="toll" size={24} color={colors.primary} />
              ) : (
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={24}
                  color={colors.gray700}
                />
              )
            }
            label={item.label}
            style={styles.balanceCard}
          />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Heading
          title="Recent Activity"
          style={{
            fontWeight: typography.weight.medium as TypographyWeight,
          }}
        />
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ActivityHeader />
      <FlashList
        data={mockWalletActivity}
        renderItem={({ item }) => <WalletItem item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    backgroundColor: colors.background,
  },

  listContent: {
    paddingBottom: layout.listBottomPadding,
  },

  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textMuted: {
    color: colors.muted,
  },

  balancesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  balanceCard: {
    width: Math.max(layout.screenPadding * 8, 140),
    flexGrow: 1,
    flexShrink: 1,
  },

  activitySection: {
    marginTop: layout.sectionSpacing,
    marginBottom: layout.itemSpacing,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xs,
  },

  viewAllButton: {
    padding: spacing.xs,
  },

  viewAllText: {
    fontSize: typography.size.base,
    textDecorationLine: "underline",
    color: colors.tint,
    fontWeight: typography.weight.medium as TypographyWeight,
  },

  activityListContainer: {
    borderRadius: layout.cardBorderRadius,
    overflow: "hidden",
    marginTop: spacing.md,
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
    fontWeight: typography.weight.medium as TypographyWeight,
    color: colors.charcoal,
    marginBottom: spacing.xs,
  },

  walletStatus: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular as TypographyWeight,
  },

  walletBalance: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium as TypographyWeight,
    color: colors.charcoal,
  },

  emptyStateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xl,
    marginTop: spacing.xl,
    backgroundColor: colors.gray50,
    borderRadius: layout.cardBorderRadius,
    marginHorizontal: spacing.sm,
  },

  emptyStateText: {
    fontSize: typography.size.base,
    color: colors.gray500,
    fontWeight: typography.weight.medium as TypographyWeight,
  },
});
