import { useState, useEffect } from 'react';

export type ScreenType = 'mobile' | 'laptop' | 'desktop' | 'tv' | '4k';

interface ScreenSize {
  width: number;
  height: number;
  type: ScreenType;
  scaling: number;
}

export const SCREEN_SCALES = {
  '4k': 3,
  'tv': 1.5,
  'desktop': 1.5,
  'laptop': 1,
  'mobile': 0.8
} as const;

export const SCREEN_BREAKPOINTS = {
  '4k': 3840,
  'tv': 2560,
  'desktop': 1920,
  'laptop': 1366,
  'mobile': 0
} as const;

const getScreenType = (width: number, pixelDensity: number): ScreenType => {
  const physicalWidth = width / (96 * pixelDensity);

  if (width >= SCREEN_BREAKPOINTS['4k']) return '4k';
  if (width >= SCREEN_BREAKPOINTS.tv || physicalWidth >= 40) return 'tv';
  if (width >= SCREEN_BREAKPOINTS.desktop) return 'desktop';
  if (width >= SCREEN_BREAKPOINTS.laptop) return 'laptop';
  return 'mobile';
};

const getScaling = (type: ScreenType): number => {
  const scaling = SCREEN_SCALES[type];
  return scaling;
};

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    const type = getScreenType(window.innerWidth, window.devicePixelRatio);
    const scaling = getScaling(type);

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      type,
      scaling
    };
  });

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const type = getScreenType(window.innerWidth, window.devicePixelRatio);
        const scaling = getScaling(type);

        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type,
          scaling
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);

  return screenSize;
}; 