import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../UserData";

export interface IUser {
  id: number;
  name: string;
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
  reducers: {},
});

export default userSlice.reducer;
