import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface FeatureCountState {
  count: number;
}

const savedFeatureCount = Cookies.get('featureCount');
const initialState: FeatureCountState = {
  count: savedFeatureCount ? parseInt(savedFeatureCount) : 3
};

const featureCountSlice = createSlice({
  name: "featureCount",
  initialState,
  reducers: {
    setFeatureCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
      Cookies.set('featureCount', action.payload.toString(), { expires: 30 });
    },
    incrementCount(state) {
      state.count += 1;
      Cookies.set('featureCount', state.count.toString(), { expires: 30 });
    },
    decrementCount(state) {
      state.count -= 1;
      Cookies.set('featureCount', state.count.toString(), { expires: 30 });
    },
    resetCount(state) {
      state.count = 3;
      Cookies.set('featureCount', '3', { expires: 30 });
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