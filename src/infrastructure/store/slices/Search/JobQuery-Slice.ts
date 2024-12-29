import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorFilterState {
  selectedColors: string[];
}

const initialState: ColorFilterState = {
  selectedColors: [],
};

export const colorFilterSlice = createSlice({
  name: 'colorFilter',
  initialState,
  reducers: {
    setSelectedColors: (state, action: PayloadAction<string[]>) => {
      state.selectedColors = action.payload;
    },
    addColor: (state, action: PayloadAction<string>) => {
      if (!state.selectedColors.includes(action.payload)) {
        state.selectedColors.push(action.payload);
      }
    },
    removeColor: (state, action: PayloadAction<string>) => {
      state.selectedColors = state.selectedColors.filter(color => color !== action.payload);
    },
    clearColors: (state) => {
      state.selectedColors = [];
    }
  },
});

export const { setSelectedColors, addColor, removeColor, clearColors } = colorFilterSlice.actions;
export default colorFilterSlice.reducer; 