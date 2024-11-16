import { useAtom } from "jotai";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
