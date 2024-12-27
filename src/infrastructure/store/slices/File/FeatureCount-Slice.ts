import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeatureCountState {
  count: number;
}

const initialState: FeatureCountState = {
  count: 3 
};

const featureCountSlice = createSlice({
  name: "featureCount",
  initialState,
  reducers: {
    setFeatureCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    incrementCount(state) {
      state.count += 1;
    },
    decrementCount(state) {
      state.count -= 1;
    },
    resetCount(state) {
      state.count = 3;
    }
  }
});

export const {
  setFeatureCount,
  incrementCount, 
  decrementCount,
  resetCount
} = featureCountSlice.actions;

export default featureCountSlice.reducer;