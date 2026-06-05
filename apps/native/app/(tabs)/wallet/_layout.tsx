import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import HeaderSearch from "@/components/HeaderSearch";

export default function WalletLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Wallets",
          headerShown: true,
          header: () => <HeaderSearch />,
        }}
      />
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