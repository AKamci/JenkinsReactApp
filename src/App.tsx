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

const App = () => {
	return (
		<HotKeys keyMap={KeyMap} handlers={Handlers}>
			<>
				<Routers />
				<ToastContainer />
			</>
		</HotKeys>
	);
};

export default React.memo(App);