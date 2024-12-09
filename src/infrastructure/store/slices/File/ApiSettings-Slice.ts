import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiSettingsState {
  selectedApiSettings: string[];
}

const initialState: ApiSettingsState = {
  selectedApiSettings: [],
};

const ApiSettingsSlice = createSlice({
  name: "api-settings",
  initialState,
  reducers: {
    setSelectedProjects(state, action: PayloadAction<string[]>) {
      console.log(action.payload, "action.payload");
      state.selectedApiSettings = action.payload;
    },
    addSelectedProject(state, action: PayloadAction<string>) {
        console.log("Added Project");
        console.log("Action Payload:", action.payload);
        console.log("Before Removal:", state.selectedApiSettings);
      if (!state.selectedApiSettings.includes(action.payload)) {
        state.selectedApiSettings.push(action.payload);
      }
    },
    removeSelectedProject(state, action: PayloadAction<string>) {
      console.log("Removed Project");
      console.log("Action Payload:", action.payload);
      console.log("Before Removal:", state.selectedApiSettings);
      state.selectedApiSettings = state.selectedApiSettings.filter(
        project => project !== action.payload
      );
      console.log(state.selectedApiSettings);
    },
    clearSelectedProjects(state) {
      state.selectedApiSettings = [];
    },
  },
});

export const {
  setSelectedProjects,
  addSelectedProject,
  removeSelectedProject,
  clearSelectedProjects,
} = ApiSettingsSlice.actions;

export default ApiSettingsSlice.reducer;