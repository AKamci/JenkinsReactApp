import React, { useState, useCallback } from 'react';
import { useKeyboardShortcut } from '../../shortcuts/useKeyboardShortcut';
import { HomePageLayout } from './PagesLayout/HomePageLayout';

const HomePage: React.FC = () => {
    const [layout, setLayout] = useState({
        isCollapsed: false,
        isHeaderHidden: false
    });
    
    const [checkedJobs, setCheckedJobs] = useState<Record<string, boolean>>({});

    const toggleSidebar = useCallback(() => {
        setLayout(prev => ({
            ...prev,
            isCollapsed: !prev.isCollapsed
        }));
    }, []);

    const toggleHeaderVisibility = useCallback(() => {
        setLayout(prev => ({
            isHeaderHidden: !prev.isHeaderHidden,
            isCollapsed: !prev.isHeaderHidden
        }));
    }, []);

    useKeyboardShortcut('shift', toggleHeaderVisibility);

    return (
        <HomePageLayout
            layout={layout}
            onToggleSidebar={toggleSidebar}
            checkedJobs={checkedJobs}
            setCheckedJobs={setCheckedJobs}
        />
    );
};

export default React.memo(HomePage);