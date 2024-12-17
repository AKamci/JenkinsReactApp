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
    setApiSettings(state, action: PayloadAction<string[]>) {
      console.log(action.payload, "action.payload");
      state.selectedApiSettings = action.payload;
    },
    addApiSettings(state, action: PayloadAction<string>) {
        console.log("Added Project");
        console.log("Action Payload:", action.payload);
        console.log("Before Removal:", state.selectedApiSettings);
      if (!state.selectedApiSettings.includes(action.payload)) {
        state.selectedApiSettings.push(action.payload);
      }
    },
    removeApiSettings(state, action: PayloadAction<string>) {
      console.log("Removed Project");
      console.log("Action Payload:", action.payload);
      console.log("Before Removal:", state.selectedApiSettings);
      state.selectedApiSettings = state.selectedApiSettings.filter(
        project => project !== action.payload
      );
      console.log(state.selectedApiSettings);
    },
    clearApiSettings(state) {
      state.selectedApiSettings = [];
    },
  },
});

export const {
  setApiSettings,
  addApiSettings,
  removeApiSettings,
  clearApiSettings,
} = ApiSettingsSlice.actions;

export default ApiSettingsSlice.reducer;