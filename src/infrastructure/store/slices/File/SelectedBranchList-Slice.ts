import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedBranchState {
  selectedBranch: string[];
}

const initialState: SelectedBranchState = {
  selectedBranch: [],
};

const SelectedBranchListSlice = createSlice({
  name: "selected-branch-list",
  initialState,
  reducers: {
    setBranchList(state, action: PayloadAction<string[]>) {
      state.selectedBranch = action.payload;
    },
    addBranchList(state, action: PayloadAction<string>) {
      if (!state.selectedBranch.includes(action.payload)) {
        state.selectedBranch.push(action.payload);
      }
    },
    removeBranchList(state, action: PayloadAction<string>) {
      state.selectedBranch = state.selectedBranch.filter(
        project => project !== action.payload
      );
    },
    clearBranchList(state) {
      state.selectedBranch = [];
    },
  },
});

export const {
  setBranchList,
  addBranchList,
  removeBranchList,
  clearBranchList,
} = SelectedBranchListSlice.actions;

export default SelectedBranchListSlice.reducer;