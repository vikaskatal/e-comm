import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state) => {

    },
    remove: (state) => {

    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
