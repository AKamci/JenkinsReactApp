import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import React, { useState } from 'react';
import HomePageLeftNav from '../left-nav/HomePageLeftNav';
import HomePageMain from '../main/HomePageMain';

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
				<button onClick={toggleSidebar} aria-expanded={!isCollapsed} aria-label="Toggle Sidebar">
					{isCollapsed ? '→' : '←'}
				</button>
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
