import { configureStore, combineReducers } from "@reduxjs/toolkit";
import api from "./api";
import authSliceReducer, { logout } from "./authSlice";

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSliceReducer,
});

const rootReducer = (state, action) => {
  if (logout.match(action)) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: md => md().concat(api.middleware)
});
