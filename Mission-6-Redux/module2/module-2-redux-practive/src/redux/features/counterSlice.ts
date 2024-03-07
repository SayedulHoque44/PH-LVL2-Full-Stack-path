import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//
const initialState = { count: 0 };

//
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count = state.count + action.payload;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

//
export const { increment, decrement, incrementByValue } = counterSlice.actions;
//
export default counterSlice.reducer;
