declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WALLET_APP_API: string;
    }
  }
}

export {};
