import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { WIDTH } from "../../utils/dimensions";
import { COLORS, LAYOUT, TYPOGRAPHY, TypographyWeight } from "@/theme";

interface WalletSummaryProps {
  icon: any;
  label: string;
  value: string;
  style: any;
}

export default function WalletSummary({
  icon,
  label,
  value,
}: WalletSummaryProps) {
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
    borderRadius: LAYOUT.cardBorderRadius,
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    gap: WIDTH * 0.02,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  iconContainer: {
    alignSelf: "flex-end",
  },
  label: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.darkGray,
    fontWeight: TYPOGRAPHY.weight.regular as TypographyWeight,
  },
  valueContainer: {
    alignItems: "flex-end",
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
  },
  value: {
    fontSize: TYPOGRAPHY.size.xxxl,
    fontWeight: TYPOGRAPHY.weight.regular as TypographyWeight,
    textAlign: "right",
    flex: 1,
  },
});
