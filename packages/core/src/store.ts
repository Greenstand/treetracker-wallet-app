import { createStore } from "jotai";
import { isWeb } from "./utils/platform";

export const webStore = createStore();
export const nativeStore = createStore();

export const appStore = isWeb ? webStore : nativeStore;
