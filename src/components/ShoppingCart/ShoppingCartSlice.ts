import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { initialState, type CartItem } from "./shoppingCartModels";
import type { RootState } from "../../state/store";

type AddItemPayload = Omit<CartItem, "quantity">;

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
        const item = state.items.find(item => item.id === action.payload.id)
        if(item) {
            item.quantity = action.payload.quantity
        }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) => state.shoppingCart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const { addItem, emptyCart, removeItem, updateQuantity } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
