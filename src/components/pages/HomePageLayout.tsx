import React from 'react';
import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import HomePageLeftNav from '../left-nav/HomePageLeftNav';
import HomePageMain from '../main/HomePageMain';

interface LayoutProps {
    layout: {
        isCollapsed: boolean;
        isHeaderHidden: boolean;
    };
    onToggleSidebar: () => void;
    checkedJobs: Record<string, boolean>;
    setCheckedJobs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const HomePageLayout: React.FC<LayoutProps> = ({
    layout,
    onToggleSidebar,
    checkedJobs,
    setCheckedJobs
}) => (
    <Page>
        <Page.Header hidden={layout.isHeaderHidden}>
            <Navbar toggleSidebar={onToggleSidebar} />
        </Page.Header>
        <Page.Aside collapsed={layout.isCollapsed}>
            <HomePageLeftNav 
                checkedJobs={checkedJobs}
                setCheckedJobs={setCheckedJobs}
            />
        </Page.Aside>
        <Page.Main fullPage={layout.isCollapsed}>
            <HomePageMain />
        </Page.Main>
    </Page>
);