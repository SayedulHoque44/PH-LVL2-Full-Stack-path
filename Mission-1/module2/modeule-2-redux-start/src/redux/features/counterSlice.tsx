import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//type declaration
type CounterType = {
  count: number;
};
//
const initialState: CounterType = { count: 0 };
//
const counterSlice = createSlice({
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

//  export those for use as a dispatch
export const { increment, decrement, incrementByValue } = counterSlice.actions;

// export for connect it with store
export default counterSlice.reducer;
