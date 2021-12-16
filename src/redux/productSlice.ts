import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  categories: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items = action.payload;
    },
    addCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addItems, addCategories } = productSlice.actions;

export default productSlice.reducer;
