import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Wallet {
  id: string;
  name: string;
  balance: number;
  date: string;
}

export function YourWallets() {
  const [wallets] = useState<Wallet[]>([
    { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
    { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
  ]);

  const handleCreateWallet = () => {
    console.log("Create new wallet");
  };

  const handleWalletClick = (walletId: string) => {
    console.log("Navigate to wallet:", walletId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateWallet}>
        <Ionicons name="add" size={20} color="#68B030" />
        <Text style={styles.createButtonText}>CREATE WALLET</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your wallets</Text>

      {wallets.map(wallet => (
        <TouchableOpacity
          key={wallet.id}
          style={styles.walletItem}
          onPress={() => handleWalletClick(wallet.id)}>
          <View style={styles.walletInfo}>
            <Text style={styles.walletName}>{wallet.name}</Text>
            <Text style={styles.walletDate}>{wallet.date}</Text>
          </View>
          <View style={styles.walletRight}>
            <Text style={styles.walletBalance}>{wallet.balance}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  createButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  walletItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  walletDate: {
    fontSize: 14,
    color: "#666666",
  },
  walletRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: "600",
    color: "#68B030",
    marginRight: 12,
  },
});
