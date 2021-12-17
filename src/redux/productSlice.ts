import { createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../interface";

export interface IState{
  items: IProducts[],
  categories: string[],
}

const initialState = {
  items: [],
  categories: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItems: (state: IState, action) => {
      state.items = action.payload;
    },
    addCategories: (state: IState, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addItems, addCategories } = productSlice.actions;

export default productSlice.reducer;
