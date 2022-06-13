import { createSlice, createAction } from "@reduxjs/toolkit";
import api from "./api";

export const logout = createAction("logout");

const ISSERVER = typeof window === "undefined";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: !ISSERVER && localStorage?.getItem("user")
      ? JSON.parse(localStorage?.getItem("user"))
      : null,
    token: !ISSERVER && localStorage?.getItem("token")
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logout, state => {
        !ISSERVER && localStorage?.removeItem("token");
        !ISSERVER && localStorage?.removeItem("user");
        state.user = null;
        state.token = null;
      })
      .addMatcher(
        api.endpoints.authenticate.matchFulfilled,
        (state, { payload }) => {
          const { accessToken, ...data } = payload;
          let user;
          if (data.user) {
            user = { ...data.user };
          } else {
            user = { ...data };
          }
          state.token = accessToken;
          if (!user.profilePic) {
            user.profilePic = false;
          }
          user.fullName = `${user.firstName} ${user.lastName}`;
          state.user = user;
          !ISSERVER && localStorage?.setItem("token", accessToken);
          !ISSERVER && localStorage?.setItem("user", JSON.stringify(user));
        }
      );
  }
});

export default authSlice.reducer;
