import { createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../@types";

interface initialStateType {
  order?: OrderType;
}

const initialState: initialStateType = {};

export const orderSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setOrder(state, { payload }) {
      state.order = payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
