import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BalanceCard from "@/components/ui/BalanceCard";
import { WIDTH } from "../../utils/dimensions";
import useWalletList from "wallet_state/src/hooks/wallet";
import { Colors } from "@/constants/Colors";
import Title from "@/components/ui/common/Title";

const balanceData = [
  { value: "1000", label: "Tokens", icon: "toll", color: "#2E7D32" },
  {
    value: "2",
    label: "Wallets",
    icon: "account-balance-wallet",
    color: "#1A237E",
  },
];

type ItemProps = {
  id: string;
  logo: string;
  name: string;
  status: string;
  balance: number;
};

export default function Home() {
  const [user, setUser] = useState<{ userId: string }>({
    userId: "default-user",
  });

  const walletList = useWalletList(user?.userId);

  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap: WIDTH * 0.05, marginTop: 30 }]}>
        {balanceData.map(item => (
          <BalanceCard
            key={item.label}
            value={item.value}
            icon={
              <MaterialIcons name={item.icon} size={24} color={item.color} />
            }
            label={item.label}
          />
        ))}
      </View>

      <View style={styles.activityContainer}>
        <View style={styles.activityHeader}>
          <Title title="Recent activity" />
          <Text style={styles.activityLink}>View all</Text>
        </View>
      </View>
      <FlashList
        data={walletList?.list || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityItem item={item} />}
        estimatedItemSize={50}
      />
    </View>
  );
}

const ActivityItem = ({ item }: { item: ItemProps }) => (
  <View style={styles.itemContainer}>
    <View style={styles.leftColumn}>
      <Image source={{ uri: item.logo }} style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
    <Text
      style={[
        styles.value,
        {
          color:
            item.status === "Received" ? Colors.green : Colors.blackOverlay,
        },
      ]}>
      {item.balance}
    </Text>
  </View>
);

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
  activityContainer: {
    marginTop: 30,
    marginVertical: 8,
    paddingTop: 24,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  activityTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  activityLink: {
    fontSize: 16,
    color: Colors.green,
    textDecorationLine: "underline",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
