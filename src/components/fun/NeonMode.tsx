import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const NeonMode: React.FC = () => {
  const isActive = useAppSelector((state) => state.funFeatures.isNeonModeActive);

  if (!isActive) return null;

  return (
    <style>
      {`
        * {
          --neon-text-color: #f40;
          --neon-border-color: #08f;
        }

        button, 
        input, 
        select, 
        .MuiButton-root,
        .MuiPaper-root,
        .MuiCard-root {
          box-shadow: 0 0 5px var(--neon-border-color),
                    0 0 10px var(--neon-border-color),
                    0 0 20px var(--neon-border-color) !important;
          transition: all 0.3s ease !important;
        }

        button:hover, 
        .MuiButton-root:hover {
          box-shadow: 0 0 5px var(--neon-text-color),
                    0 0 10px var(--neon-text-color),
                    0 0 20px var(--neon-text-color) !important;
        }

        h1, h2, h3, h4, h5, h6 {
          text-shadow: 0 0 5px var(--neon-text-color),
                     0 0 10px var(--neon-text-color),
                     0 0 20px var(--neon-text-color) !important;
          color: #fff !important;
        }

        a {
          text-shadow: 0 0 5px var(--neon-border-color),
                     0 0 10px var(--neon-border-color) !important;
          color: #fff !important;
        }

        .MuiPaper-root {
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(10px) !important;
        }
      `}
    </style>
  );
}; 