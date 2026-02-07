import React from "react";
import { Stack, router } from "expo-router";
import { Pressable, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "@/theme";
import { WINDOW_WIDTH } from "@utils/dimensions";

export default function ScanCodeLayout() {
  const { colors, layout } = THEME;
  const HEADER_HEIGHT = WINDOW_WIDTH * 0.25;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{
                padding: 8,
                marginLeft: 0,
              }}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
            </Pressable>
          ),
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </>
  );
}
