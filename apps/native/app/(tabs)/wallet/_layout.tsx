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
      <Stack.Screen name="index" />
      <Stack.Screen name="[walletId]" options={{ headerShown: false }} />
    </Stack>
  );
}
