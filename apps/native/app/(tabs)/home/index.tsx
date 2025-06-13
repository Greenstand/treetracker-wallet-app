import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BalanceCard from "@/components/ui/BalanceCard";
import { Colors } from "@/constants/Colors";
// import Title from "@/components/ui/common/Title";
import useWalletList from "core/src/hooks/wallet";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomTitle from "@/components/ui/common/CustomTitle";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const balanceData = [
  { value: "1000", label: "Tokens", icon: "toll", color: "#2E7D32" },
  {
    value: "2",
    label: "Wallets",
    icon: "wallet-outline",
    color: "#1A237E",
  },
];

type WalletActivity = {
  id: string;
  logo: string;
  name: string;
  status: string;
  balance: number;
};

const BalanceCardList = () => (
  <View style={[styles.balanceContainer, { marginTop: WINDOW_HEIGHT * 0.03 }]}>
    {balanceData.map(item => (
      <BalanceCard
        key={item.label}
        value={item.value}
        icon={
          item.icon == "toll" ? (
            <MaterialIcons
              name={item.icon}
              size={scaleSize(24)}
              color={item.color}
            />
          ) : (
            <MaterialCommunityIcons
              name={item.icon}
              size={scaleSize(24)}
              color={item.color}
            />
          )
        }
        label={item.label}
        style={styles.balanceCard}
      />
    ))}
  </View>
);

const WalletActivityItem = ({ item }: { item: WalletActivity }) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: Colors.white }]}>
      <View style={styles.leftColumn}>
        <Image
          source={{ uri: item.logo }}
          style={styles.icon}
          resizeMode="cover"
        />
        <View>
          <Text style={[styles.title, { color: Colors.darkGray }]}>
            {item.name}
          </Text>
          <Text style={[styles.status, { color: Colors.darkGray }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.value,
          {
            color: item.status === "Received" ? Colors.green : Colors.darkGray,
          },
        ]}>
        {item.balance}
      </Text>
    </View>
  );
};

const WalletActivityList = ({ walletList }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.footerContainer}>
      {walletList?.length > 0 ? (
        walletList.map(item => <WalletActivityItem key={item.id} item={item} />)
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={30}
            color={Colors.darkGray}
          />

          <Text style={[styles.emptyText, { color: Colors.darkGray }]}>
            No recent activities yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default function Home() {
  const [user, setUser] = useState<{ userId: string }>({
    userId: "default-user",
  });
  const { colors } = useTheme();
  const walletList = useWalletList(user?.userId);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View>
      <BalanceCardList />
      <View
        style={[styles.activityContainer, { marginTop: WINDOW_HEIGHT * 0.03 }]}>
        <View style={styles.activityHeader}>
          <CustomTitle
            title="Recent activity"
            style={{ color: Colors.charcoal }}
          />
          <TouchableOpacity>
            <Text style={[styles.activityLink, { color: Colors.green }]}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlashList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <WalletActivityList walletList={walletList?.list} />
        )}
        estimatedItemSize={scaleSize(70)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const scaleSize = (size: number) => {
  const scale = WINDOW_WIDTH / 375;
  return Math.round(size * Math.min(scale, 1.5));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
  balanceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: scaleSize(12),
  },
  balanceCard: {
    width: Math.max(WINDOW_WIDTH * 0.43, scaleSize(140)),
    flexGrow: 1,
    flexShrink: 1,
  },
  activityContainer: {
    marginVertical: WINDOW_HEIGHT * 0.015,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  activityLink: {
    fontSize: scaleSize(16),
    textDecorationLine: "underline",
  },
  footerContainer: {
    paddingBottom: WINDOW_HEIGHT * 0.1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleSize(16),
    marginVertical: scaleSize(1),
    borderRadius: 4,
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleSize(12),
  },
  icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
  },
  title: {
    fontSize: scaleSize(16),
    fontWeight: "500",
  },
  status: {
    fontSize: scaleSize(14),
  },
  value: {
    fontSize: scaleSize(18),
    fontWeight: "600",
  },
  emptyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
  },
  emptyText: {
    fontSize: scaleSize(16),
    opacity: 0.7,
  },
  loadingContainer: {
    paddingVertical: scaleSize(20),
    alignItems: "center",
  },
  listContent: {
    paddingBottom: WINDOW_HEIGHT * 0.02,
  },
});
