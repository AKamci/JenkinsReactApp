import React, { useState, useCallback } from 'react';
import { useKeyboardShortcut } from '../../shortcuts/useKeyboardShortcut';
import { HomePageLayout } from './HomePageLayout';

const HomePage: React.FC = () => {
    const [layout, setLayout] = useState({
        isCollapsed: false,
        isHeaderHidden: false
    });

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

    useKeyboardShortcut('shift+t', toggleHeaderVisibility);

    return (
        <HomePageLayout
            layout={layout}
            onToggleSidebar={toggleSidebar}
        />
    );
};

export default React.memo(HomePage);