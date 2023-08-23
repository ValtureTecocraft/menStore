import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const userAPI = "http://localhost:4000/users";

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await axios.get(userAPI);
  return data.data;
});

const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username }: { username: string }) => {
    const data = await axios.get(userAPI + `/username`);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
