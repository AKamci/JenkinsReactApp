import React, { useState, useEffect } from 'react';
import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import HomePageLeftNav from '../left-nav/HomePageLeftNav';
import HomePageMain from '../main/HomePageMain';
import { Handlers } from '../../shortcuts/Handlers';

const HomePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleHeaderVisibility = () => {
    setIsHeaderHidden(!isHeaderHidden);
    setIsCollapsed(!isHeaderHidden); 
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === 't') {
        Handlers.TEST(event, toggleHeaderVisibility);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleHeaderVisibility]); 

  return (
    <Page>
      <Page.Header hidden={isHeaderHidden}>
        <Navbar toggleSidebar={toggleSidebar} />
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