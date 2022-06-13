import { useCallback } from "react";
import { createSlice } from "@reduxjs/toolkit";

const ISSERVER = typeof window === "undefined";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: !ISSERVER && localStorage?.getItem("user")
      ? JSON.parse(localStorage?.getItem("user"))
      : null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
