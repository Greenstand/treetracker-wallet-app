import React, { useMemo } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function WalletDetailsScreen() {
  const { walletId } = useLocalSearchParams<{ walletId?: string | string[] }>();

  const readableWalletName = useMemo(() => {
    const value = Array.isArray(walletId) ? walletId[0] : walletId;

    if (!value) {
      return "Wallet";
    }

    return value
      .split("-")
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");
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
});
