import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShopState {
  cart: Product[];
}

const initialState: ShopState = {
  cart: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = shopSlice.actions;
export default shopSlice.reducer;