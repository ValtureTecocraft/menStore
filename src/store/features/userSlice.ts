import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../UserData";

export interface IUser {
  id: number;
  name: string;
  userName: string;
}

interface UserState {
  value: IUser[];
}

const initialState: UserState = {
  value: UserData,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
    updateUserName: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.userName = action.payload.newUserName;
        }
      });
    },
  },
});

export const { addUser, deleteUser, updateUserName } = userSlice.actions;
export default userSlice.reducer;
