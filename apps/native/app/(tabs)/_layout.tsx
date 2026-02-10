import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";
import { CopilotProvider } from "react-native-copilot";

export default function TabLayout() {
  return (
    <CopilotProvider>
      <Tabs
        // @ts-ignore
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="wallet" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen
          name="search"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </CopilotProvider>
  );
}
