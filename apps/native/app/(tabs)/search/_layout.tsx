import HeaderSearch from "@/components/HeaderSearch";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          animation: "none",
          header: () => <HeaderSearch />,
        }}
      />
    </Stack>
  );
}
