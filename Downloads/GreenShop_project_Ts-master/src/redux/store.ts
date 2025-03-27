import { configureStore } from "@reduxjs/toolkit";
import modalslice from "./modal.slice";
import shopSlice from "./shop.slice";
import cuponSlice from "./cupon_slice";
import orderSlice from "./order-slice";
export const store = configureStore({
  reducer: { modalslice, shopSlice, cuponSlice, orderSlice },
});

export type DispatchType = typeof store.dispatch;
export type Rootstore = ReturnType<typeof store.getState>;
