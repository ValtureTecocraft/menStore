import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import userApiReducer from "./features/userApiSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    usersApi: userApiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
