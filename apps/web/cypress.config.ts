import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            react: path.resolve(__dirname, "node_modules/react"),
            "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
          },
        },
      },
    },
  },

  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    env: {
      api_server:
        process.env.NEXT_PUBLIC_WALLET_APP_API || "http://localhost:8080",
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
  retries: 1,
});
