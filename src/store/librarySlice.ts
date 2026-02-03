import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FountainPen = {
  id: string;
  brand: string;
  model: string;
  nib_size: string;
  nib_unit: string;
  filling_mechanism: string;
};

export type MachinedPen = {
  id: string;
  brand: string;
  model: string;
  mechanism: string;
  refill_standard: string;
};

type LibraryState = {
  fountainPens: FountainPen[];
  machinedPens: MachinedPen[];
};

const initialState: LibraryState = {
  fountainPens: [],
  machinedPens: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addFountainPen(state, action: PayloadAction<FountainPen>) {
      state.fountainPens.push(action.payload);
    },
    addMachinedPen(state, action: PayloadAction<MachinedPen>) {
      state.machinedPens.push(action.payload);
    },
  },
});

export const { addFountainPen, addMachinedPen } = librarySlice.actions;
export default librarySlice.reducer;
