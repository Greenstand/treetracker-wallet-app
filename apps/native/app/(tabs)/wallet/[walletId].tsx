import React, { useMemo } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getWalletSummaryById } from "./data";

export default function WalletDetailsScreen() {
  const { walletId } = useLocalSearchParams<{ walletId?: string | string[] }>();

  const readableWalletName = useMemo(() => {
    const resolvedWalletId = Array.isArray(walletId) ? walletId[0] : walletId;
    const wallet = getWalletSummaryById(resolvedWalletId);

    if (wallet) {
      return wallet.name;
    }

    if (!resolvedWalletId) {
      return "Wallet";
    }

    return resolvedWalletId
      .split("-")
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");
  }, [walletId]);

  const walletSummary = useMemo(() => {
    const resolvedWalletId = Array.isArray(walletId) ? walletId[0] : walletId;

    if (!resolvedWalletId) {
      return undefined;
    }

    return getWalletSummaryById(resolvedWalletId);
  }, [walletId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Link href="/wallet" style={styles.backLink}>
          ‹ Back to wallets
        </Link>

        <Text style={styles.title}>{readableWalletName}</Text>
        <Text style={styles.subtitle}>
          Detailed wallet data will appear here. This placeholder confirms the
          navigation flow.
        </Text>

        {walletSummary && (
          <View style={styles.metaSection}>
            <Text style={styles.metaItem}>
              Created on:{" "}
              <Text style={styles.metaValue}>{walletSummary.createdOn}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Balance:{" "}
              <Text style={styles.metaValue}>
                {walletSummary.balance}
                {walletSummary.currency ? ` ${walletSummary.currency}` : ""}
              </Text>
            </Text>
          </View>
        )}

        {!walletSummary && (
          <View style={styles.metaSection}>
            <Text style={styles.metaItem}>
              We couldn’t find details for this wallet.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  backLink: {
    fontSize: 16,
    color: "#7CB342",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  metaSection: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    gap: 12,
  },
  metaItem: {
    fontSize: 16,
    color: "#444",
  },
  metaValue: {
    fontWeight: "600",
    color: "#2E7D32",
  },
});
