import React, { useEffect, useState, useMemo } from 'react';
import { checkTodaysBirthdays, Birthday } from './birthdayCheck';
import Confetti from 'react-confetti';
import Fireworks from '@fireworks-js/react';
import './BirthDayAnimation.css';
import { useScreenSize } from '../../hooks/useScreenSize';

const BirthDayAnimation: React.FC = () => {
  const [todaysBirthdays, setTodaysBirthdays] = useState<Birthday[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const { width, height, scaling } = useScreenSize();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const confettiProps = useMemo(() => ({
    width,
    height,
    numberOfPieces: 250,
    recycle: false,
    colors: ['#ff4081', '#ffd700', '#4caf50', '#2196f3', '#9c27b0'],
    gravity: 0.3,
    tweenDuration: 3000,
    run: isVisible
  }), [width, height, isVisible]);

  const fireworksOptions = useMemo(() => ({
    rocketsPoint: {
      min: 0,
      max: 100
    },
    explosion: 5,
    intensity: 15,
    traceLength: 2,
    traceSpeed: 8,
    flickering: 30,
    boundaries: {
      width,
      height,
    }
  }), [width, height]);

  useEffect(() => {
    const birthdays = checkTodaysBirthdays();
    setTodaysBirthdays(birthdays);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  if (todaysBirthdays.length === 0 || !isVisible) return null;

  return (
    <div className="birthday-container" onClick={handleBackgroundClick}>
      <Confetti {...confettiProps} />
      <Fireworks
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 999
        }}
        options={fireworksOptions}
      />
      <div className="birthday-animation" style={{ transform: `scale(${scaling})` }}>
        {todaysBirthdays.map((birthday, index) => (
          <div key={index} className="birthday-message">
            <div className="cake-emoji">🎂</div>
            <h3>Doğum Günün Kutlu Olsun 
            <br />{birthday.name}</h3>
            <p>Nice mutlu senelere 🎉</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthDayAnimation;
