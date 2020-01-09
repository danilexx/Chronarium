// src/hooks.ts

import { createTypedHooks } from "easy-peasy"; // 👈import the helper
import { StoreModel } from "./model"; // 👈 import our model type

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreModel>();

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
