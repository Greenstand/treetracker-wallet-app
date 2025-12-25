import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "@/components/CustomTabBar";
import NotificationHeaderComponent from "./notifications/NotificationHeader";

export default function TabLayout() {
  return (
    <Tabs
      // @ts-ignore
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="wallet" />

      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: true,
          header: ({}) => <NotificationHeaderComponent />,
          headerTransparent: true,
          headerTitle: "",
          headerStyle: { height: 0 },
        }}
      />

      <Tabs.Screen name="settings" />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
