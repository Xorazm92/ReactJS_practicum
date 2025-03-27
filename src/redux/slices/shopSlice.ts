
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShopState {
  items: Product[];
  total: number;
}

const initialState: ShopState = {
  items: [],
  total: 0,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart } = shopSlice.actions;
export default shopSlice.reducer;
