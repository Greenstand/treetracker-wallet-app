import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { WIDTH } from "../../utils/dimensions";

interface BalanceCardProps {
  icon: any;
  label: string;
  value: string;
}

export default function BalanceCard({ icon, label, value }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: WIDTH / 2 - 30,
    height: WIDTH / 2 - 80,
    maxWidth: 400,
    backgroundColor: "#fff",
    paddingVertical: WIDTH * 0.02,
    paddingHorizontal: WIDTH * 0.04,
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    gap: WIDTH * 0.02,
    alignItems: "center",
    // justifyContent: "center",
    margin: 10,
  },
  iconContainer: {
    alignSelf: "flex-end",
  },
  label: {
    fontSize: WIDTH * 0.04,
  },
  valueContainer: {
    alignItems: "flex-end",
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
  },
  value: {
    fontSize: 34,
    textAlign: "right",
    flex: 1,
  },
});
