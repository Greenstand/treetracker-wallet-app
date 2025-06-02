export default ({ config }) => ({
  ...config,
  plugins: ["expo-web-browser"],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "1821c9a9-d26e-4e8a-8812-f86497886e86",
    },
    EXPO_PUBLIC_WALLET_APP_API: process.env.EXPO_PUBLIC_WALLET_APP_API,
  },
});
