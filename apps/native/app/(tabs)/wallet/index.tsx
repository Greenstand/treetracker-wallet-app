import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { WalletList } from "../../../components/wallet/WalletList";
import { CreateWallet } from "../../../components/wallet/CreateWalletButton";
import { WalletCreateDrawer } from "../../../components/wallet/WalletCreateDrawer";
import { Colors } from "../../../constants/Colors";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const router = useRouter();
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleWalletPress = (walletId: string) => {
    const selectedWallet = mockWallets.find((wallet) => wallet.id === walletId);

    router.push({
      pathname: "/(tabs)/wallet/[walletId]",
      params: {
        walletId,
        name: selectedWallet?.name ?? "",
        balance: selectedWallet?.balance?.toString() ?? "0",
        date: selectedWallet?.date ?? "",
      },
    });
  };

  // Handle create wallet button press
  const handleCreateWalletToggle = () => {
    setIsCreatingWallet(true);
  };

  const handleDrawerRequestClose = (isDirty: boolean) => {
    console.log("handleDrawerRequestClose called, isDirty:", isDirty);
    if (isDirty) {
      console.log("Showing discard modal");
      setShowDiscardModal(true);
    } else {
      console.log("Closing drawer directly");
      setIsCreatingWallet(false);
    }
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    setIsCreatingWallet(false);
  };

  const handleKeep = () => {
    setShowDiscardModal(false);
  };

  const handleFormSubmit = (data: { name: string; description: string }) => {
    console.log("Creating wallet with:", data);
    // TODO: Call API to create wallet
    setIsCreatingWallet(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Create Wallet Button Component */}
        <CreateWallet
          onPress={handleCreateWalletToggle}
          isActive={isCreatingWallet}
        />
        <WalletCreateDrawer
          visible={isCreatingWallet}
          onRequestClose={handleDrawerRequestClose}
          onSubmit={handleFormSubmit}
          existingWalletNames={mockWallets.map((w) => w.name)}
          showDiscardPrompt={showDiscardModal}
          onDiscardConfirm={handleDiscard}
          onDiscardCancel={handleKeep}
        />

        <WalletList wallets={mockWallets} onWalletPress={handleWalletPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styling for the Wallet screen
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});
