import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
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

const WalkthroughableView = walkthroughable(View);

export default function Home() {
  const [isSearching] = useAtom(isSearchingAtom);
  const [isLoading] = useAtom(searchLoadingAtom);
  const [, selectCategory] = useAtom(selectCategoryAtom);
  const { start } = useCopilot();
  const hasStartedRef = useRef(false);

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

  useEffect(() => {
    if (isSearching || isLoading || hasStartedRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      hasStartedRef.current = true;
      start();
    }, 300);

    return () => clearTimeout(timeout);
  }, [isLoading, isSearching, start]);

  const ActivityHeader = () => (
    <View
      style={{
        marginTop: layout.sectionSpacing,
        marginBottom: layout.itemSpacing,
      }}
    >
      <View style={[styles.balancesContainer, { gap: spacing.md }]}>
        {balanceData.map((item) => (
          <BalanceCard
            key={item.id}
            item={item}
            cardWidth={Math.max(layout.screenPadding * 8, 140)}
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

function BalanceCard({
  item,
  cardWidth,
}: {
  item: (typeof balanceData)[number];
  cardWidth: number;
}) {
  const { colors } = THEME;

  const content = (
    <WalletSummary
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
      style={[styles.balanceCard, { width: cardWidth }]}
    />
  );

  if (item.label === "Tokens") {
    return (
      <CopilotStep
        text={
          "Here you can view the total amount of tokens (a digital asset representing your contributions)."
        }
        order={1}
        name="homeTokens"
      >
        <WalkthroughableView>{content}</WalkthroughableView>
      </CopilotStep>
    );
  }

  if (item.label === "Wallets") {
    return (
      <CopilotStep
        text={
          "Here you can see the total amount of wallets (restricted to max 2 at this time)."
        }
        order={2}
        name="homeWallets"
      >
        <WalkthroughableView>{content}</WalkthroughableView>
      </CopilotStep>
    );
  }

  return content;
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
