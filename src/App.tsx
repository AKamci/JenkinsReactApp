import Routers from './infrastructure/Routers/Routers';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import './assets/app.css';
import React, { useMemo, Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomeAnimation from './components/animation/WelcomeAnimation';
import { FakeLoadingScreen } from './components/fun/FakeLoadingScreen';
import { ConfettiEffect } from './components/fun/ConfettiEffect';
import { UpdateNotification } from './components/fun/UpdateNotification';
import { useWorkDayEnd } from './hooks/useWorkDayEnd';

import { HotKeys } from 'react-hotkeys';
import KeyMap from './shortcuts/KeyMap';
import { Handlers } from './shortcuts/Handlers';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from './infrastructure/store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme/theme';

const LazyMatrixRain = lazy(() => import('./components/fun/MatrixRain').then(module => ({ default: module.MatrixRain })));
const LazyDiscoMode = lazy(() => import('./components/fun/DiscoMode').then(module => ({ default: module.DiscoMode })));
const LazyUpsideDown = lazy(() => import('./components/fun/UpsideDown').then(module => ({ default: module.UpsideDown })));
const LazyPixelateEffect = lazy(() => import('./components/fun/PixelateEffect').then(module => ({ default: module.PixelateEffect })));
const LazyShortcutsModal = lazy(() => import('./components/fun/ShortcutsModal').then(module => ({ default: module.ShortcutsModal })));
const LazyWorkDayEndCelebration = lazy(() => import('./components/fun/WorkDayEndCelebration').then(module => ({ default: module.WorkDayEndCelebration })));
const LazyChatWindow = lazy(() => import('./components/fun/ChatWindow').then(module => ({ default: module.ChatWindow })));
const LazyRainEffect = lazy(() => import('./components/fun/RainEffect').then(module => ({ default: module.RainEffect })));
const LazyNeonMode = lazy(() => import('./components/fun/NeonMode').then(module => ({ default: module.NeonMode })));
const LazyRetroMode = lazy(() => import('./components/fun/RetroMode').then(module => ({ default: module.RetroMode })));
const LazyNinjaMode = lazy(() => import('./components/fun/NinjaMode').then(module => ({ default: module.NinjaMode })));

const App = () => {
	useDocumentTitle();
	useWorkDayEnd();
	
	const themeState = useAppSelector((state) => state.theme);
	const theme = useMemo(() => createAppTheme(themeState.isDarkMode, themeState.themeVariant), [themeState.isDarkMode, themeState.themeVariant]);

	const toastTheme = useMemo(() => themeState.isDarkMode ? 'dark' : 'light', [themeState.isDarkMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HotKeys keyMap={KeyMap} handlers={Handlers}>
				<Suspense fallback={<div>Loading...</div>}>
					<WelcomeAnimation />
					<Routers />
					<FakeLoadingScreen />
					<ConfettiEffect />
					<LazyMatrixRain />
					<LazyDiscoMode />
					<LazyUpsideDown />
					<LazyPixelateEffect />
					<LazyShortcutsModal />
					<LazyWorkDayEndCelebration />
					<LazyChatWindow />
					<LazyRainEffect />
					<LazyNeonMode />
					<LazyRetroMode />
					<LazyNinjaMode />
					<UpdateNotification />
				</Suspense>
				<ToastContainer theme={toastTheme} position="top-right" limit={3} />
			</HotKeys>
		</ThemeProvider>
	);
};

export default React.memo(App);