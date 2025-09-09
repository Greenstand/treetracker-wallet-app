import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { SvgXml } from "react-native-svg";
import PlusIcon from "../../../assets/plus-icon.svg";
import InfoIcon from "../../../assets/info-icon.svg";

export default function Wallet() {
  const handleCreateWallet = () => {
    console.log("Create wallet pressed");
  };

  const handleInfoPress = () => {
    console.log("Info icon pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>
     

      <View style={styles.container}>
        <View style={styles.createWalletSection}>
          <TouchableOpacity style={styles.createWalletButton} onPress={handleCreateWallet}>
            <PlusIcon width={14} height={14} style={styles.plusIcon} />
            <Text style={styles.createWalletText}>CREATE WALLET</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoIcon} onPress={handleInfoPress}>
            <InfoIcon width={18} height={18} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  createWalletSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  createWalletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  plusIcon: {
    marginRight: 8,
    alignSelf: "center",
    marginBottom: 0,
  },
  createWalletText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: 0.46,
    textTransform: "uppercase",
    color: "#999",
  },
  infoIcon: {
    marginLeft: 8,
  },
});
