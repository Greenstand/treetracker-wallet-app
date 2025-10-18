import React from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import { WalletList } from "../../../components/wallet/WalletList";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const handleWalletPress = (walletId: string) => {
    console.log("Wallet pressed:", walletId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <WalletList wallets={mockWallets} onWalletPress={handleWalletPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
