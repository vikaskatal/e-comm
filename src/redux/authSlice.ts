import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;
