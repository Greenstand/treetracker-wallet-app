import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { YourWallets } from "../../../components/wallet/YourWallets";
import LimitInfoModal from "../../../components/wallet/LimitInfoModal";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const [showLimitInfo, setShowLimitInfo] = useState(false);

  const handleWalletPress = (walletId: string) => {
    console.log("Wallet pressed:", walletId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.headerSubtitle}>Wallet/Exceeded limit</Text>
        </View>

        <View style={styles.infoIconRow}>
          <TouchableOpacity
            onPress={() => setShowLimitInfo(true)}
            style={styles.infoIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID="info-icon">
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <YourWallets wallets={mockWallets} onWalletPress={handleWalletPress} />
      </ScrollView>

      <LimitInfoModal
        visible={showLimitInfo}
        onClose={() => setShowLimitInfo(false)}
        walletLimit={2}
      />
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "300",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "400",
  },
  infoIconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoIcon: {
    backgroundColor: "#9E9E9E",
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
