import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { setConfettiActive } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';

export const ConfettiEffect: React.FC = () => {
  const dispatch = useAppDispatch();
  const isConfettiActive = useAppSelector((state) => state.funFeatures.isConfettiActive);

  useEffect(() => {
    if (isConfettiActive) {
      const timer = setTimeout(() => {
        dispatch(setConfettiActive(false));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isConfettiActive, dispatch]);

  if (!isConfettiActive) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={500}
      recycle={false}
      gravity={0.50}
    />
  );
}; 