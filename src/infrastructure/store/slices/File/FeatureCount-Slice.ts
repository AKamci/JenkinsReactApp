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
      console.log(action.payload, "action.payload")
      state.count = action.payload;
    },
    incrementCount(state) {
        console.log("incrementCount")
      state.count += 1;
    },
    decrementCount(state) {
      console.log("decrementCount")
      state.count -= 1;
    },
    resetCount(state) {
      console.log("resetCount")
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