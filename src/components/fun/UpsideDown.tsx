import React, { useEffect } from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const UpsideDown: React.FC = () => {
  const isUpsideDown = useAppSelector((state) => state.funFeatures.isUpsideDown);

  useEffect(() => {
    if (isUpsideDown) {
      document.body.style.transform = 'rotate(180deg)';
      document.body.style.transition = 'transform 1s ease';
    } else {
      document.body.style.transform = '';
      document.body.style.transition = 'transform 1s ease';
    }

    return () => {
      document.body.style.transform = '';
      document.body.style.transition = '';
    };
  }, [isUpsideDown]);

  return null;
}; 