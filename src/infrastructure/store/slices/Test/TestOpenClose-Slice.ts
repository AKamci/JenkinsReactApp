import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TestOpenCloseState {
  isOpen: boolean;
}

const initialState: TestOpenCloseState = {
  isOpen: false
};

const TestOpenCloseSlice = createSlice({
  name: "testOpenClose",
  initialState,
  reducers: {
    toggleTestOpenClose(state) {
      state.isOpen = !state.isOpen;
    },
    setTestOpenClose(state, action: PayloadAction<boolean>) {
      console.log(action.payload);
      state.isOpen = action.payload;
    }
  }
});

export const {
  toggleTestOpenClose,
  setTestOpenClose
} = TestOpenCloseSlice.actions;

export default TestOpenCloseSlice.reducer;