import { Stack } from "expo-router";
import HeaderSearch from "@/components/HeaderSearch";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <HeaderSearch />,
        }}
      />
    </Stack>
  );
}
