import { Stack } from "expo-router";

const mapParamsToString = (param?: string | string[]): string => {
  if (Array.isArray(param)) {
    return param.join("");
  }

  return param ?? "";
};

export default function WalletLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="[walletId]"
        options={({ route }) => {
          const params = route.params as
            | { name?: string | string[] }
            | undefined;
          const walletName = mapParamsToString(params?.name);

          return {
            headerShown: true,
            headerShadowVisible: false,
            title: walletName.trim() || "Wallet",
          };
        }}
      />
    </Stack>
  );
}
