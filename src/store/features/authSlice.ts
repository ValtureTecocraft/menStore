import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IState {
  msg: string;
  error: string;
  loading: boolean;
  user: string;
  token: string;
}

const initialState: IState = {
  msg: "",
  error: "",
  loading: false,
  user: "",
  token: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
