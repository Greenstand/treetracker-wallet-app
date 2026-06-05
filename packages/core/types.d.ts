declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TREETRACKER_USER_API: string;
    }
  }
}

export {};
