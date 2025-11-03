import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    toggleItem: (state, action) => {
      const exists = state.items.includes(action.payload);
      state.items = exists
        ? state.items.filter((id) => id !== action.payload)
        : [...state.items, action.payload];
    },
  },
});

export const { toggleItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
