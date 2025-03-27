import { createSlice } from "@reduxjs/toolkit";

interface TypeModal {
  open: boolean;
  Loading: boolean;
}
interface OrderModalType {
  open: boolean;
  isLoading: boolean;
}
interface initialStateType {
  auth: TypeModal;
  OrderModal: OrderModalType;
  orderDetailVisiblty: boolean;
}

const initialState: initialStateType = {
  auth: {
    open: false,
    Loading: false,
  },

  OrderModal: {
    open: false,
    isLoading: false,
  },
  orderDetailVisiblty: false,
};
const modalslice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    SetAuthModal(state, { payload }) {
      state.auth = payload;
    },

    setOrderModal(state, { payload }) {
      state.OrderModal = payload;
    },
    setOrderDetails(state) {
      state.orderDetailVisiblty = !state.orderDetailVisiblty;
    },
  },
});

export const { SetAuthModal, setOrderModal, setOrderDetails } =
  modalslice.actions;
export default modalslice.reducer;
