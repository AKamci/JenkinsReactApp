import Routers from './infrastructure/Routers/Routers';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import './assets/app.css';
import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomeAnimation from './components/animation/WelcomeAnimation';

import { HotKeys } from 'react-hotkeys';
import KeyMap from './shortcuts/KeyMap';
import { Handlers } from './shortcuts/Handlers';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from './infrastructure/store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme/theme';

const App = () => {
	useDocumentTitle();
	
	const themeState = useAppSelector((state) => state.theme);
	const theme = useMemo(() => createAppTheme(themeState.isDarkMode, themeState.themeVariant, themeState.isTvMode), [themeState.isDarkMode, themeState.themeVariant, themeState.isTvMode]);

	const toastTheme = useMemo(() => themeState.isDarkMode ? 'dark' : 'light', [themeState.isDarkMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HotKeys keyMap={KeyMap} handlers={Handlers}>
				<>
					<WelcomeAnimation />
					<Routers />
					<ToastContainer theme={toastTheme} position="top-right" limit={3} />
				</>
			</HotKeys>
		</ThemeProvider>
	);
};

export default React.memo(App);