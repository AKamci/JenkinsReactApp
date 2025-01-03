import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FunFeaturesState {
  isLoadingScreenActive: boolean;
  isConfettiActive: boolean;
  isMatrixActive: boolean;
  isDiscoMode: boolean;
  isUpsideDown: boolean;
  isPixelated: boolean;
  isShortcutsModalOpen: boolean;
  isWorkDayEndActive: boolean;
  isCodenameActive: boolean;
  isChatOpen: boolean;
  showUpdateNotification: boolean;
  isRainEffectActive: boolean;
  isNeonModeActive: boolean;
  isRetroModeActive: boolean;
  isSpaceModeActive: boolean;
  isKaraokeModeActive: boolean;
  isNinjaModeActive: boolean;
}

const initialState: FunFeaturesState = {
  isLoadingScreenActive: false,
  isConfettiActive: false,
  isMatrixActive: false,
  isDiscoMode: false,
  isUpsideDown: false,
  isPixelated: false,
  isShortcutsModalOpen: false,
  isWorkDayEndActive: false,
  isCodenameActive: false,
  isChatOpen: false,
  showUpdateNotification: false,
  isRainEffectActive: false,
  isNeonModeActive: false,
  isRetroModeActive: false,
  isSpaceModeActive: false,
  isKaraokeModeActive: false,
  isNinjaModeActive: false,
};

const funFeaturesSlice = createSlice({
  name: 'funFeatures',
  initialState,
  reducers: {
    toggleLoadingScreen: (state) => {
      state.isLoadingScreenActive = !state.isLoadingScreenActive;
    },
    toggleConfetti: (state) => {
      state.isConfettiActive = !state.isConfettiActive;
    },
    setConfettiActive: (state, action: PayloadAction<boolean>) => {
      state.isConfettiActive = action.payload;
    },
    toggleMatrix: (state) => {
      state.isMatrixActive = !state.isMatrixActive;
    },
    toggleDiscoMode: (state) => {
      state.isDiscoMode = !state.isDiscoMode;
    },
    toggleUpsideDown: (state) => {
      state.isUpsideDown = !state.isUpsideDown;
    },
    togglePixelated: (state) => {
      state.isPixelated = !state.isPixelated;
    },
    toggleShortcutsModal: (state) => {
      state.isShortcutsModalOpen = !state.isShortcutsModalOpen;
    },
    activateWorkDayEnd: (state) => {
      state.isWorkDayEndActive = true;
      state.isConfettiActive = true;
    },
    deactivateWorkDayEnd: (state) => {
      state.isWorkDayEndActive = false;
      state.isConfettiActive = false;
    },
    activateCodename: (state) => {
      state.isCodenameActive = true;
      window.open('https://codenames.game/room/create', '_blank');
    },
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    toggleUpdateNotification: (state) => {
      state.showUpdateNotification = !state.showUpdateNotification;
    },
    setUpdateNotification: (state, action: PayloadAction<boolean>) => {
      state.showUpdateNotification = action.payload;
    },
    toggleRainEffect: (state) => {
      state.isRainEffectActive = !state.isRainEffectActive;
    },
    toggleNeonMode: (state) => {
      state.isNeonModeActive = !state.isNeonModeActive;
    },
    toggleRetroMode: (state) => {
      state.isRetroModeActive = !state.isRetroModeActive;
    },
    toggleSpaceMode: (state) => {
      state.isSpaceModeActive = !state.isSpaceModeActive;
    },
    toggleKaraokeMode: (state) => {
      state.isKaraokeModeActive = !state.isKaraokeModeActive;
    },
    toggleNinjaMode: (state) => {
      state.isNinjaModeActive = !state.isNinjaModeActive;
    },
  },
});

export const { 
  toggleLoadingScreen, 
  toggleConfetti, 
  setConfettiActive, 
  toggleMatrix,
  toggleDiscoMode,
  toggleUpsideDown,
  togglePixelated,
  toggleShortcutsModal,
  activateWorkDayEnd,
  deactivateWorkDayEnd,
  activateCodename,
  toggleChat,
  toggleUpdateNotification,
  setUpdateNotification,
  toggleRainEffect,
  toggleNeonMode,
  toggleRetroMode,
  toggleSpaceMode,
  toggleKaraokeMode,
  toggleNinjaMode,
} = funFeaturesSlice.actions;

export default funFeaturesSlice.reducer; 