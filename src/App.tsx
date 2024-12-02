import Routers from './infrastructure/Routers/Routers';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import './assets/app.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<Routers />
			<ToastContainer />
		</>
	);
};

export default React.memo(App);
