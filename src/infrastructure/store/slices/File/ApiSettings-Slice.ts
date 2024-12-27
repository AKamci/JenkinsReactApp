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
      state.selectedApiSettings = action.payload;
    },
    addApiSettings(state, action: PayloadAction<string>) {
      if (!state.selectedApiSettings.includes(action.payload)) {
        state.selectedApiSettings.push(action.payload);
      }
    },
    removeApiSettings(state, action: PayloadAction<string>) {
      state.selectedApiSettings = state.selectedApiSettings.filter(
        project => project !== action.payload
      );
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