import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BalanceCard from "@/components/ui/BalanceCard";
import { WIDTH } from "../../utils/dimensions";
import { ThemedText } from "@/components/ThemedText";

const data = [
  { value: "1000", label: "Tokens" },
  { value: "2", label: "Wallets" },
];

const iconMapping = {
  Tokens: <MaterialIcons name="toll" size={24} color="#2E7D32" />,
  Wallets: (
    <MaterialIcons name="account-balance-wallet" size={24} color="#1A237E" />
  ),
};

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.logoContainer}>
            <ThemedText
              type="title"
              lightColor="black"
              darkColor="white"
              style={[styles.commonText]}>
              Wallet Logo
            </ThemedText>
          </View>

          <View style={[styles.iconContainer, { gap: WIDTH * 0.05 }]}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </View>
        </View>
      </View>

      <View style={[styles.row, { gap: WIDTH * 0.05 }]}>
        {data.map((item, index) => (
          <BalanceCard
            key={index}
            value={item.value}
            icon={iconMapping[item.label]}
            label={item.label}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#86C232",
    paddingVertical: WIDTH * 0.05,
    paddingHorizontal: WIDTH * 0.06,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    gap: WIDTH * 0.02,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
  },
  commonText: {
    textAlign: "left",
    color: "#222629DE",
    fontSize: 16,
  },
  label: {
    fontSize: WIDTH * 0.04,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  value: {
    fontSize: 34,
    textAlign: "right",
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: WIDTH * 0.02,
    paddingHorizontal: WIDTH * 0.03,
    paddingVertical: WIDTH * 0.02,
  },
  textBackground: {
    backgroundColor: "gray",
    padding: WIDTH * 0.02,
    width: WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
    height: WIDTH * 0.1,
    borderRadius: 50,
  },
});
