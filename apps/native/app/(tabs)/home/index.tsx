import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Heading from "@common/Heading";
import WalletSummary from "@components/ui/WalletSummary";
import { THEME, TypographyWeight } from "@/theme";
import WalletItem from "@components/ui/WalletItem";
import { mockWalletActivity } from "@/data/data";

import {
  isSearchingAtom,
  searchLoadingAtom,
  selectCategoryAtom,
} from "core/src/atoms/search";
import SearchResults from "@components/ui/SearchResults";
import QRCodeDisplay from "@components/ui/QRCodeDisplay";

export const balanceData = [
  { id: 1, value: "1000", label: "Tokens" },
  { id: 2, value: "2", label: "Wallets", icon: "wallet-outline" },
];

export default function Home() {
  const [isSearching] = useAtom(isSearchingAtom);
  const [isLoading] = useAtom(searchLoadingAtom);
  const [, selectCategory] = useAtom(selectCategoryAtom);

  const router = useRouter();

  function handlePress() {
    router.push("/scancode");
  }

  const { colors, typography, layout, spacing } = THEME;
  useEffect(() => {
    if (!isSearching) {
      selectCategory("all");
    }
  }, [selectCategory, isSearching]);

  const ActivityHeader = () => (
    <View
      style={{
        marginTop: layout.sectionSpacing,
        marginBottom: layout.itemSpacing,
      }}
    >
      <View style={[styles.balancesContainer, { gap: spacing.md }]}>
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
            style={[
              styles.balanceCard,
              { width: Math.max(layout.screenPadding * 8, 140) },
            ]}
          />
        ))}
      </View>

      <View
        style={[
          styles.sectionHeader,
          { marginTop: spacing.xl, paddingHorizontal: spacing.xs },
        ]}
      >
        <Heading
          title="Recent Activity"
          style={{
            fontWeight: typography.weight.medium as TypographyWeight,
          }}
        />
        <TouchableOpacity style={{ padding: spacing.xs }}>
          <Text
            style={[
              styles.viewAllText,
              {
                fontSize: typography.size.base,
                textDecorationLine: "underline",
                color: colors.tint,
                fontWeight: typography.weight.medium as TypographyWeight,
              },
            ]}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: layout.screenPadding,
          backgroundColor: colors.background,
        },
      ]}
    >
      {isSearching ? (
        <>
          <View style={{ marginTop: spacing.md }}>
            <QRCodeDisplay onPress={handlePress} />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 30,
            }}
          >
            <Heading
              title="Top wallets"
              style={{
                fontWeight: typography.weight.medium as TypographyWeight,
              }}
            />
          </View>
          <SearchResults />
        </>
      ) : (
        <>
          <ActivityHeader />
          <FlashList
            data={mockWalletActivity}
            renderItem={({ item }) => <WalletItem item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: layout.listBottomPadding }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  balancesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  balanceCard: {
    flexGrow: 1,
    flexShrink: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAllText: {
    textDecorationLine: "underline",
  },
});
