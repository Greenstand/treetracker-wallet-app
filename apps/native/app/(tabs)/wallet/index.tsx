import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
const WalletScreen = () => {
  const wallets = [
    {
      id: 1,
      name: "Wallet 2",
      date: "May 22, 2024",
      balance: "1000",
    },
    {
      id: 2,
      name: "Wallet 1",
      date: "May 16, 2024",
      balance: "3455",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8BC34A" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet logo</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Create Wallet Button */}
        <TouchableOpacity style={styles.createWalletButton}>
          <AntDesign name="plus" size={24} color="#666" />
          <Text style={styles.createWalletText}>CREATE WALLET</Text>
          <Entypo
            name="info-with-circle"
            size={20}
            color="#666"
            style={styles.infoIcon}
          />
        </TouchableOpacity>

        {/* Your Wallets Section */}
        <Text style={styles.sectionTitle}>Your wallets</Text>

        {wallets.map(wallet => (
          <TouchableOpacity key={wallet.id} style={styles.walletCard}>
            <View style={styles.walletInfo}>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <Text style={styles.walletDate}>{wallet.date}</Text>
            </View>
            <View style={styles.walletBalance}>
              <Text style={styles.balanceText}>{wallet.balance}</Text>
              <Entypo name="chevron-small-right" size={24} color="#8BC34A" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#8BC34A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  createWalletButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  createWalletText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
  infoIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  walletCard: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  walletDate: {
    fontSize: 14,
    color: "#666",
  },
  walletBalance: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8BC34A",
    marginRight: 8,
  },
});

export default WalletScreen;
