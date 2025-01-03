import React, { useState, useCallback, useMemo } from 'react';
import { useKeyboardShortcut } from '../../shortcuts/useKeyboardShortcut';
import { HomePageLayout } from './PagesLayout/HomePageLayout';
import BirthDayAnimation from '../animation/BirthDayAnimation';
import GlobalSystemNotification from '../notification/GlobalSystemNotification';
import Cookies from 'js-cookie';

const HomePage: React.FC = React.memo(() => {
    const [layout, setLayout] = useState(() => ({
        isCollapsed: Cookies.get('leftNav') === undefined ? false : JSON.parse(Cookies.get('leftNav') || 'true'),
        isHeaderHidden: false
    }));
    
    const [checkedJobs, setCheckedJobs] = useState<Record<string, boolean>>({});
    const [showBirthday, setShowBirthday] = useState(true);

    const toggleSidebar = useCallback(() => {
        setLayout(prev => {
            const newCollapsed = !prev.isCollapsed;
            Cookies.set('leftNav', JSON.stringify(newCollapsed));
            return {
                ...prev,
                isCollapsed: newCollapsed
            };
        });
    }, []);

    const toggleHeaderVisibility = useCallback(() => {
        setLayout(prev => ({
            ...prev,
            isHeaderHidden: !prev.isHeaderHidden,
            isCollapsed: prev.isHeaderHidden ? prev.isCollapsed : true
        }));
    }, []);

    useKeyboardShortcut('shift', toggleHeaderVisibility);
    
    const handleBirthdayComplete = useCallback(() => {
        setShowBirthday(false);
    }, []);

    const memoizedLayout = useMemo(() => ({
        isCollapsed: layout.isCollapsed,
        isHeaderHidden: layout.isHeaderHidden
    }), [layout.isCollapsed, layout.isHeaderHidden]);

    return (
        <>
            <HomePageLayout
                layout={memoizedLayout}
                onToggleSidebar={toggleSidebar}
                checkedJobs={checkedJobs}
                setCheckedJobs={setCheckedJobs}
            />
            {showBirthday && <BirthDayAnimation onAnimationComplete={handleBirthdayComplete} />}
            <GlobalSystemNotification />
        </>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;