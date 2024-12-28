import { createSlice } from '@reduxjs/toolkit';

interface ShowRedOnlyState {
  isShowRedOnly: boolean;
}

const initialState: ShowRedOnlyState = {
  isShowRedOnly: false,
};

export const showRedOnlySlice = createSlice({
  name: 'showRedOnly',
  initialState,
  reducers: {
    setShowRedOnly: (state, action) => {
      state.isShowRedOnly = action.payload;
    },
  },
});

export const { setShowRedOnly } = showRedOnlySlice.actions;
export default showRedOnlySlice.reducer; 