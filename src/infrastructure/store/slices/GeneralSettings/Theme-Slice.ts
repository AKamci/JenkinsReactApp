import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface ThemeState {
  isDarkMode: boolean;
  themeVariant: 'classic' | 'default' | 'nature' | 'sunset' | 'ocean' | 'lavender' | 'modern';
}

const loadThemeFromCookie = (): ThemeState => {
  const savedTheme = Cookies.get('theme-preferences');
  if (savedTheme) {
    return JSON.parse(savedTheme);
  }
  return {
    isDarkMode: true,
    themeVariant: 'default'
  };
};

const initialState: ThemeState = loadThemeFromCookie();

const saveThemeToCookie = (state: ThemeState) => {
  Cookies.set('theme-preferences', JSON.stringify(state), { expires: 365 }); 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      saveThemeToCookie(state);
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
      saveThemeToCookie(state);
    },
    setThemeVariant(state, action: PayloadAction<'classic' | 'default' | 'nature' | 'sunset' | 'ocean' | 'lavender' | 'modern'>) {
      state.themeVariant = action.payload;
      saveThemeToCookie(state);
    }
  }
});

export const {
  toggleTheme,
  setDarkMode,
  setThemeVariant
} = themeSlice.actions;

export default themeSlice.reducer;