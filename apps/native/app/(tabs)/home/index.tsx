import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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
  const params = useLocalSearchParams();
  const { start } = useCopilot();
  const hasStartedRef = useRef(false);
  const lastSnackbarKeyRef = useRef<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const snackbarKey = useMemo(() => {
    const key = params.snackbarKey;
    return Array.isArray(key) ? key[0] : key;
  }, [params.snackbarKey]);

  const snackbarAmount = useMemo(() => {
    const amount = params.snackbarAmount;
    return Array.isArray(amount) ? amount[0] : amount;
  }, [params.snackbarAmount]);

  const snackbarAction = useMemo(() => {
    const action = params.snackbarAction;
    return Array.isArray(action) ? action[0] : action;
  }, [params.snackbarAction]);

  useEffect(() => {
    if (!snackbarKey || snackbarKey === lastSnackbarKeyRef.current) {
      return;
    }

    const parsedAmount = Number.parseFloat(snackbarAmount ?? "");
    const amountText = Number.isFinite(parsedAmount) ? parsedAmount : 0;
    const actionText = snackbarAction === "request" ? "requested!" : "sent!";

    setSnackbarMessage(`${amountText} Tokens ${actionText}`);
    setSnackbarVisible(true);
    lastSnackbarKeyRef.current = snackbarKey;
  }, [snackbarAction, snackbarAmount, snackbarKey]);

  useEffect(() => {
    if (!snackbarVisible) {
      return;
    }

    const timeout = setTimeout(() => {
      setSnackbarVisible(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [snackbarVisible]);

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

      {snackbarVisible ? (
        <View style={styles.snackbarContainer}>
          <Text style={styles.snackbarMessage}>{snackbarMessage}</Text>
          <Pressable
            onPress={() => setSnackbarVisible(false)}
            style={styles.snackbarUndoButton}
          >
            <Text style={styles.snackbarUndoText}>UNDO</Text>
          </Pressable>
          <Pressable onPress={() => setSnackbarVisible(false)}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </Pressable>
        </View>
      ) : null}
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

  snackbarContainer: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 92,
    borderRadius: 4,
    backgroundColor: "#323232",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 7,
  },
  snackbarMessage: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 28 / 2,
  },
  snackbarUndoButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  snackbarUndoText: {
    color: "#61892F",
    fontSize: 12,
    fontWeight: "700",
  },
});
