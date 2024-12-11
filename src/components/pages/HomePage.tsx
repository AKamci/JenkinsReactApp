import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import React, { useState } from 'react';
import HomePageLeftNav from '../left-nav/HomePageLeftNav';
import HomePageMain from '../main/HomePageMain';

const HomePage = () => {
  console.log('Homepage is rendered.');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  
const toggleNavbarVisibility = () => {
  setIsNavbarVisible(!isNavbarVisible);
};

  return (
    <Page>
    <Page.Header>
      {isNavbarVisible && <Navbar toggleSidebar={toggleSidebar} />}
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