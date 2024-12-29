import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SCREEN_SCALES, ScreenType } from '../../../../hooks/useScreenSize';
import Cookies from 'js-cookie';

type MutableScreenScales = {
  [K in ScreenType]: number;
};

interface ScreenScalesState {
  scales: MutableScreenScales;
}

const savedScales = Cookies.get('screenScales');
const initialState: ScreenScalesState = {
  scales: savedScales 
    ? (JSON.parse(savedScales) as MutableScreenScales) 
    : { ...SCREEN_SCALES }
};

const screenScalesSlice = createSlice({
  name: 'screenScales',
  initialState,
  reducers: {
    updateScale: (state, action: PayloadAction<{ type: ScreenType; scale: number }>) => {
      const { type, scale } = action.payload;
      state.scales[type] = scale;
      Cookies.set('screenScales', JSON.stringify(state.scales), { expires: 30 });
    },
    resetScales: (state) => {
      state.scales = { ...SCREEN_SCALES };
      Cookies.set('screenScales', JSON.stringify(state.scales), { expires: 30 });
    }
  }
});

export const { updateScale, resetScales } = screenScalesSlice.actions;
export default screenScalesSlice.reducer; 