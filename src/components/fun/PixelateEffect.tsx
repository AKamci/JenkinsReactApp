import React, { useEffect } from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const PixelateEffect: React.FC = () => {
  const isPixelated = useAppSelector((state) => state.funFeatures.isPixelated);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'pixelate-style';

    if (isPixelated) {
      style.innerHTML = `
        body * {
          image-rendering: pixelated !important;
          transform: scale(1.01) !important;
          filter: blur(0.5px) !important;
        }
        img, svg {
          image-rendering: pixelated !important;
          transform: scale(1.2) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById('pixelate-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isPixelated]);

  return null;
}; 