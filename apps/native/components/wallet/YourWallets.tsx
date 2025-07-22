import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Wallet {
  id: string;
  name: string;
  balance: number;
  date: string;
}

interface YourWalletsProps {
  wallets: Wallet[];
  onWalletPress?: (walletId: string) => void;
}

export function YourWallets({ wallets, onWalletPress }: YourWalletsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your wallets</Text>

      <View style={styles.walletCard}>
        {wallets.map((wallet, index) => (
          <React.Fragment key={wallet.id}>
            <TouchableOpacity
              style={styles.walletItem}
              onPress={() => onWalletPress?.(wallet.id)}>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletDate}>{wallet.date}</Text>
              </View>
              <View style={styles.walletBalanceContainer}>
                <Text style={styles.walletBalance}>{wallet.balance}</Text>
                <Ionicons name="chevron-forward" size={18} color="#999999" />
              </View>
            </TouchableOpacity>
            {index < wallets.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 32,
    letterSpacing: 0.15,
    color: "rgba(34, 38, 41, 0.87)",
    marginBottom: 8,
  },
  walletCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  walletItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.17,
    color: "rgba(34, 38, 41, 0.87)",
  },
  walletDate: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.17,
    color: "rgba(34, 38, 41, 0.6)",
    marginTop: 2,
  },
  walletBalanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletBalance: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#68B030",
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
});
