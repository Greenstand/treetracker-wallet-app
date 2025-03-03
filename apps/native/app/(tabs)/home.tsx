import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BalanceCard from "@/components/ui/BalanceCard";
import { WIDTH } from "../../utils/dimensions";

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
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
