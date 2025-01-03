import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../components/pages/HomePage';
import React from 'react';

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default React.memo(Routers);
