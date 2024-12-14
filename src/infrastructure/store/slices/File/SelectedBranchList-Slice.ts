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
      console.log(action.payload, "action.payload");
      state.selectedBranch = action.payload;
    },
    addBranchList(state, action: PayloadAction<string>) {
        console.log("Added Project");
        console.log("Action Payload:", action.payload);
        console.log("Before Removal:", state.selectedBranch);
      if (!state.selectedBranch.includes(action.payload)) {
        state.selectedBranch.push(action.payload);
      }
    },
    removeBranchList(state, action: PayloadAction<string>) {
      console.log("Removed Project");
      console.log("Action Payload:", action.payload);
      console.log("Before Removal:", state.selectedBranch);
      state.selectedBranch = state.selectedBranch.filter(
        project => project !== action.payload
      );
      console.log(state.selectedBranch);
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