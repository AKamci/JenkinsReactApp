import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const RetroMode: React.FC = () => {
  const isActive = useAppSelector((state) => state.funFeatures.isRetroModeActive);

  if (!isActive) return null;

  return (
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        * {
          font-family: 'VT323', monospace !important;
          color: #33ff33 !important;
        }

        body {
          background-color: #000 !important;
          position: relative;
        }

        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: scan 10s linear infinite;
        }

        @keyframes scan {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 100%;
          }
        }

        button,
        input,
        select,
        .MuiButton-root,
        .MuiPaper-root {
          background-color: #000 !important;
          border: 1px solid #33ff33 !important;
          box-shadow: none !important;
        }

        button:hover,
        .MuiButton-root:hover {
          background-color: #33ff33 !important;
          color: #000 !important;
        }

        input::placeholder {
          color: #33ff33 !important;
          opacity: 0.7;
        }

        .MuiPaper-root {
          background: #000 !important;
        }

        ::-webkit-scrollbar {
          width: 10px;
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #33ff33;
          border: 1px solid #000;
        }
      `}
    </style>
  );
}; 