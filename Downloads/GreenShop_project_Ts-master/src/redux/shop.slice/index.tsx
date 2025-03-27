import { createSlice } from "@reduxjs/toolkit";
import { getStore, SetStore } from "../../store";
import { CardType } from "../../@types";

interface initialStatesType {
  shop: CardType[];
}

const initialState: initialStatesType = {
  shop: getStore("shop") || [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getProductshop(state, { payload }) {
      const exist = state.shop.find((item) => item._id === payload._id);
      if (exist) {
        state.shop = state.shop.map((value) => {
          if (value._id === payload._id) {
            return {
              ...value,
              count: Number(value.count) + 1,
            };
          }
          return value;
        });
        SetStore("shop", state.shop);
        return;
      }
      state.shop = [...state.shop, { ...payload, count: 1 }];
      SetStore("shop", state.shop);
    },
    deleteProduct(state, { payload }) {
      state.shop = state.shop.filter((value) => value._id !== payload);
      SetStore("shop", state.shop);
    },
    icrement(state, { payload }) {
      state.shop = state.shop.map((value) => {
        if (value._id === payload) {
          return {
            ...value,
            count: Number(value.count) + 1,
          };
        }
        return value;
      });
      SetStore("shop", state.shop);
    },

    decrement(state, { payload }) {
      state.shop = state.shop.map((value) => {
        if (value._id === payload) {
          return {
            ...value,
            count: Number(value.count) - 1,
          };
        }
        return value;
      });
      SetStore("shop", state.shop);
    },
  },
});

export const { getProductshop, deleteProduct, icrement, decrement } =
  shopSlice.actions;
export default shopSlice.reducer;
