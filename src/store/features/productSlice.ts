import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

interface IState {
  products: Product[];
  loading: boolean;
  error: string;
}

const initialState: IState = {
  products: [],
  loading: false,
  error: "",
};

const fetchProduct = createAsyncThunk("products/fetchProducts", async () => {
  const data = await axios.get(API + "/products");
  return data.data;
});

const postSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add your reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload;
    });
  },
});

// Export the slice and the thunk
export const { actions } = postSlice;
// export const { fetchProducts } = actions;
export default postSlice.reducer;
