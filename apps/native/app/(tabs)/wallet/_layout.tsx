import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function WalletLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Wallets" }} />
      <Stack.Screen
        name="[walletId]"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: Colors.darkGray,
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTransparent: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
            color: Colors.darkGray,
          },
        }}
      />
    </Stack>
  );
}
