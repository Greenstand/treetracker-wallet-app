import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function NotificationsLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.side}>
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
            style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Notifications</Text>

        <View style={styles.side}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <MaterialCommunityIcons name="wallet-outline" size={80} color="gray" />
        <Text style={styles.message}>
          Come back here to get information about recent transactions, mentions,
          and much more.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "relative",
  },
  side: {
    width: 40, // same width left and right to reserve space
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: "-20%",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: "gray",
    fontSize: 16,
    lineHeight: 22,
  },
});
