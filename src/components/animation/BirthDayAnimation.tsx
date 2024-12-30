import React, { useEffect, useState } from 'react';
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
    }, 20000);

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
      <Confetti
        width={width}
        height={height}
        numberOfPieces={500}
        recycle={true}
        colors={['#ff4081', '#ffd700', '#4caf50', '#2196f3', '#9c27b0', '#ff6b6b', '#48dbfb', '#1dd1a1']}
        gravity={0.2}
        tweenDuration={5000}
      />
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
        options={{
          rocketsPoint: {
            min: 0,
            max: 100
          },
          explosion: 8,
          intensity: 30,
          traceLength: 3,
          traceSpeed: 10,
          flickering: 50
        }}
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
