import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface person {
  id: number;
  name: string;
}

interface personState {
  persons: person[];
}

const initialState: personState = {
  persons: [],
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{ name: string }>) => {
      state.persons.push({
        id: state.persons.length + 1,
        name: action.payload.name,
      });
    },
  },
});

export const { addPerson } = personSlice.actions;
export default personSlice.reducer;
