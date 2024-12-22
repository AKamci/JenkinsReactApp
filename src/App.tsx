import Routers from './infrastructure/Routers/Routers';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import './assets/app.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HotKeys } from 'react-hotkeys';
import KeyMap from './shortcuts/KeyMap';
import  {Handlers}  from './shortcuts/Handlers';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from './infrastructure/store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme/theme';

const App = () => {
	useDocumentTitle();
	
	const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
	const theme = createAppTheme(isDarkMode);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HotKeys keyMap={KeyMap} handlers={Handlers}>
				<>
					<Routers />
					<ToastContainer theme={isDarkMode ? 'dark' : 'light'} />
				</>
			</HotKeys>
		</ThemeProvider>
	);
};

export default React.memo(App);