import React, { useEffect } from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const DiscoMode: React.FC = () => {
  const isDiscoMode = useAppSelector((state) => state.funFeatures.isDiscoMode);

  useEffect(() => {
    if (!isDiscoMode) return;

    const colors = [
      '#FF0000', '#00FF00', '#0000FF', 
      '#FFFF00', '#FF00FF', '#00FFFF',
      '#FFA500', '#800080', '#FFC0CB'
    ];
    let colorIndex = 0;

    const interval = setInterval(() => {
      document.body.style.backgroundColor = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    }, 500);

    return () => {
      clearInterval(interval);
      document.body.style.backgroundColor = '';
    };
  }, [isDiscoMode]);

  if (!isDiscoMode) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 9997,
        pointerEvents: 'none',
        animation: 'pulse 1s infinite',
      }}
    />
  );
}; 