import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  isLaoding: boolean;
  coupon: number;
}
const initialState: InitialStateType = {
  isLaoding: false,
  coupon: 0,
};
const cuponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon(state, { payload }) {
      state.coupon = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLaoding = payload;
    },
  },
});

export const { setIsLoading, setCoupon } = cuponSlice.actions;
export default cuponSlice.reducer;
