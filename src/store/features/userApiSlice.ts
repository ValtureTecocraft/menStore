import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IUser {
  id: number;
  name: string;
  userName: string;
}

interface UserState {
  value: IUser[];
}

const initialState: UserState = {
  value: [],
};

// Async Thunks for CRUD operations
const getUserData = createAsyncThunk(
  "userApi/getUserData",
  async (id: number) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    return response.data;
  }
);

const createUser = createAsyncThunk(
  "userApi/createUser",
  async (userData: IUser) => {
    const response = await axios.post("http://localhost:4000/users", userData);
    return response.data;
  }
);

const updateUser = createAsyncThunk(
  "userApi/updateUser",
  async (userData: IUser) => {
    const response = await axios.put(
      `http://localhost:4000/users/${userData.id}`,
      userData
    );
    return response.data;
  }
);

const deleteUser = createAsyncThunk(
  "userApi/deleteUser",
  async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    return id;
  }
);

const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //promise pending
      .addCase(getUserData.pending, (state) => {
        state.value = [];
      })
      //promise success
      .addCase(getUserData.fulfilled, (state, action) => {
        state.value = [action.payload];
      })
      //promise failed
      .addCase(getUserData.rejected, (state) => {
        state.value = [];
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.value = state.value.filter((user) => user.id !== userId);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.value.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.value[index] = updatedUser;
        }
      });
  },
});

export { getUserData, createUser, updateUser, deleteUser };
export default userApiSlice.reducer;
