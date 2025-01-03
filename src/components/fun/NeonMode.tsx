import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

export const NeonMode: React.FC = () => {
  const isActive = useAppSelector((state) => state.funFeatures.isNeonModeActive);

  if (!isActive) return null;

  return (
    <style>
      {`
        :root {
          --neon-primary: #f40;
          --neon-secondary: #08f;
          --neon-tertiary: #0ff;
          --neon-glow-sm: 0 0 5px;
          --neon-glow-md: 0 0 10px;
          --neon-glow-lg: 0 0 20px;
          --neon-glow-xl: 0 0 30px;
        }

        button, 
        input, 
        select, 
        .MuiButton-root,
        .MuiPaper-root,
        .MuiCard-root {
          box-shadow: var(--neon-glow-sm) var(--neon-secondary),
                     var(--neon-glow-md) var(--neon-secondary),
                     var(--neon-glow-lg) var(--neon-secondary) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1px solid var(--neon-secondary) !important;
        }

        button:hover, 
        .MuiButton-root:hover {
          box-shadow: var(--neon-glow-sm) var(--neon-primary),
                     var(--neon-glow-md) var(--neon-primary),
                     var(--neon-glow-lg) var(--neon-primary),
                     var(--neon-glow-xl) var(--neon-primary) !important;
          transform: translateY(-2px);
          border-color: var(--neon-primary) !important;
        }

        h1, h2, h3, h4, h5, h6 {
          text-shadow: var(--neon-glow-sm) var(--neon-primary),
                      var(--neon-glow-md) var(--neon-primary),
                      var(--neon-glow-lg) var(--neon-primary) !important;
          color: #fff !important;
          letter-spacing: 1px;
        }

        a {
          text-shadow: var(--neon-glow-sm) var(--neon-tertiary),
                      var(--neon-glow-md) var(--neon-tertiary) !important;
          color: var(--neon-tertiary) !important;
          transition: all 0.2s ease-in-out;
        }

        a:hover {
          text-shadow: var(--neon-glow-sm) var(--neon-primary),
                      var(--neon-glow-md) var(--neon-primary),
                      var(--neon-glow-lg) var(--neon-primary) !important;
          color: var(--neon-primary) !important;
        }

        .MuiPaper-root {
          background: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(12px) saturate(180%) !important;
          border: 1px solid var(--neon-secondary) !important;
        }

        @keyframes neonPulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }

        .MuiCard-root {
          animation: neonPulse 2s infinite;
        }
      `}
    </style>
  );
};