import HeaderSearch from "@/components/HeaderSearch";
import { Stack } from "expo-router";

export default function HomeLayout() {
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
