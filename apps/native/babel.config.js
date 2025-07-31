module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    env: {
      production: {
        plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
      },
    },
  };
};
