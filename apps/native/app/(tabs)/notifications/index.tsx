import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationsLayout() {
  return (
    <View>
      <Text>Notfications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f5f5f5",
  },
  content: {
    marginTop: 32,
  },
  commonText: {
    textAlign: "center",
    color: "#222629DE",
  },
  description: {
    fontSize: 20,
  },
});
