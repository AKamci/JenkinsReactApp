import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface GridLayoutState {
  itemsPerRow: number;
  spacing: number;
}

const defaultGridLayout = {
  itemsPerRow: 4,
  spacing: 2,
};

const savedGridLayout = Cookies.get('gridLayout');
const initialState: GridLayoutState = savedGridLayout
  ? { ...defaultGridLayout, ...JSON.parse(savedGridLayout) }
  : defaultGridLayout;

const gridLayoutSlice = createSlice({
  name: 'gridLayout',
  initialState,
  reducers: {
    setItemsPerRow: (state, action: PayloadAction<number>) => {
      state.itemsPerRow = Math.min(Math.max(action.payload, 1), 8);
      Cookies.set('gridLayout', JSON.stringify({ ...state }), { expires: 30 });
    },
    setSpacing: (state, action: PayloadAction<number>) => {
      state.spacing = action.payload;
      Cookies.set('gridLayout', JSON.stringify({ ...state }), { expires: 30 });
    },
  },
});

export const { setItemsPerRow, setSpacing } = gridLayoutSlice.actions;
export default gridLayoutSlice.reducer; 