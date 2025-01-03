import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../infrastructure/store/store';
import { 
  toggleLoadingScreen, 
  toggleConfetti, 
  toggleMatrix,
  toggleDiscoMode,
  toggleUpsideDown,
  togglePixelated,
  toggleShortcutsModal,
  activateCodename,
  toggleChat,
  toggleRainEffect,
  toggleNeonMode,
  toggleRetroMode,
  toggleNinjaMode,
} from '../infrastructure/store/slices/Settings/FunFeatures-Slice';

export const useFunFeatures = () => {
  const dispatch = useAppDispatch();
  const isLoadingScreenActive = useAppSelector((state) => state.funFeatures.isLoadingScreenActive);
  const isConfettiActive = useAppSelector((state) => state.funFeatures.isConfettiActive);
  const isMatrixActive = useAppSelector((state) => state.funFeatures.isMatrixActive);
  const isDiscoMode = useAppSelector((state) => state.funFeatures.isDiscoMode);
  const isUpsideDown = useAppSelector((state) => state.funFeatures.isUpsideDown);
  const isPixelated = useAppSelector((state) => state.funFeatures.isPixelated);
  const isShortcutsModalOpen = useAppSelector((state) => state.funFeatures.isShortcutsModalOpen);
  const isWorkDayEndActive = useAppSelector((state) => state.funFeatures.isWorkDayEndActive);
  const isCodenameActive = useAppSelector((state) => state.funFeatures.isCodenameActive);
  const isChatOpen = useAppSelector((state) => state.funFeatures.isChatOpen);
  const isRainEffectActive = useAppSelector((state) => state.funFeatures.isRainEffectActive);
  const isNeonModeActive = useAppSelector((state) => state.funFeatures.isNeonModeActive);
  const isRetroModeActive = useAppSelector((state) => state.funFeatures.isRetroModeActive);
  const isSpaceModeActive = useAppSelector((state) => state.funFeatures.isSpaceModeActive);
  const isKaraokeModeActive = useAppSelector((state) => state.funFeatures.isKaraokeModeActive);
  const isNinjaModeActive = useAppSelector((state) => state.funFeatures.isNinjaModeActive);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'f') {
        event.preventDefault(); 
        dispatch(toggleLoadingScreen());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        dispatch(toggleConfetti());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        dispatch(toggleMatrix());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        dispatch(toggleDiscoMode());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        dispatch(toggleUpsideDown());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        dispatch(togglePixelated());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        dispatch(toggleShortcutsModal());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'g') {
        event.preventDefault();
        dispatch(activateCodename());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        dispatch(toggleChat());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        dispatch(toggleRainEffect());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        dispatch(toggleNeonMode());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        dispatch(toggleRetroMode());
      }
      if (event.altKey && event.ctrlKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        dispatch(toggleNinjaMode());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch]);

  return {
    isLoadingScreenActive,
    isConfettiActive,
    isMatrixActive,
    isDiscoMode,
    isUpsideDown,
    isPixelated,
    isShortcutsModalOpen,
    isWorkDayEndActive,
    isCodenameActive,
    isChatOpen,
    isRainEffectActive,
    isNeonModeActive,
    isRetroModeActive,
    isSpaceModeActive,
    isKaraokeModeActive,
    isNinjaModeActive,
  };
}; 