import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetGlobalSystemMessage } from '../../infrastructure/store/slices/Notification/WelcomeUser-Slice';

const WelcomeAnimation: React.FC = () => {
    const dispatch = useAppDispatch();
    const welcomeUser = useAppSelector((state) => state.getWelcomeUser.message);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(GetGlobalSystemMessage());
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!show) return null;

    return (
        <div className="welcome-overlay">
            <div className="welcome-text">
                Hoş Geldin <br />{welcomeUser?.name ? ` ${welcomeUser.name}` : '...'}
                <br />
            </div>
        </div>
    );
};

export default WelcomeAnimation; 