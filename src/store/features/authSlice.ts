import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const usersAPI = "http://localhost:4000/users";

let userData;

export const fetchUsers: any = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const data = await axios.get(usersAPI);
    userData = await data.data;
    return data.data;
  }
);

export const getUser: any = createAsyncThunk(
  "user/getUser",
  async (data: any) => {
    debugger;
    const user = await axios.get(
      `http://localhost:4000/users/?email=${data.email}&password=${data.password}`
    );
    debugger;
    return user.data;
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
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.user = action.payload; // Update the user
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload; // Update the user
      state.loading = false;
      state.user = action;
      state.isAuthenticated = true;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
