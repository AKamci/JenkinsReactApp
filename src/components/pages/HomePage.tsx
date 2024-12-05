import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import React, { useState } from 'react';
import HomePageLeftNav from '../left-nav/HomePageLeftNav';
import HomePageMain from '../main/HomePageMain';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const HomePage = () => {
	console.log('Homepage is rendered.');
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<Page>
			<Page.Header>
				<Navbar />
				<Button id='sidebarToggle 'className="sidebar-button" onClick={toggleSidebar} aria-expanded={!isCollapsed} aria-label="Toggle Sidebar">
				{isCollapsed ? '→' : '←'}
				</Button>
			</Page.Header>
			<Page.Aside collapsed={isCollapsed}>
				<HomePageLeftNav />
			</Page.Aside>
			<Page.Main fullPage={isCollapsed}>
				<HomePageMain />
			</Page.Main>
		</Page>
	);
};

export default React.memo(HomePage);
