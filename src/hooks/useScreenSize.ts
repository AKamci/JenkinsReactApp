import { useState, useEffect } from 'react';
import { useAppSelector } from '../infrastructure/store/store';

export type ScreenType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv' | '4k' | '8k';

interface ScreenSize {
  width: number;
  height: number;
  type: ScreenType;
  scaling: number;
}

export const SCREEN_SCALES = {
  '8k': 4,
  '4k': 3,
  'tv': 1.7,
  'desktop': 1.2,
  'laptop': 1.0,
  'tablet': 1,
  'mobile': 0.8
} as const;

export const SCREEN_BREAKPOINTS = {
  '8k': 7680,
  '4k': 3840,
  'tv': 2560,
  'desktop': 1920,
  'laptop': 1366,
  'tablet': 768,
  'mobile': 0
} as const;

const getScreenType = (width: number, pixelDensity: number): ScreenType => {
  const physicalWidth = width / (96 * pixelDensity);

  if (width >= SCREEN_BREAKPOINTS['8k']) return '8k';
  if (width >= SCREEN_BREAKPOINTS['4k']) return '4k';
  if (width >= SCREEN_BREAKPOINTS.tv || physicalWidth >= 40) return 'tv';
  if (width >= SCREEN_BREAKPOINTS.desktop) return 'desktop';
  if (width >= SCREEN_BREAKPOINTS.laptop) return 'laptop';
  if (width >= SCREEN_BREAKPOINTS.tablet) return 'tablet';
  return 'mobile';
};

const getScaling = (type: ScreenType, customScales: typeof SCREEN_SCALES): number => {
  return customScales[type];
};

export const useScreenSize = (): ScreenSize => {
  const customScales = useAppSelector((state) => state.screenScales.scales);
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    const type = getScreenType(window.innerWidth, window.devicePixelRatio);
    const scaling = getScaling(type, customScales);

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      type,
      scaling
    };
  });

  useEffect(() => {
    const type = screenSize.type;
    const scaling = getScaling(type, customScales);
    
    setScreenSize(prev => ({
      ...prev,
      scaling
    }));
  }, [customScales]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const type = getScreenType(window.innerWidth, window.devicePixelRatio);
        const scaling = getScaling(type, customScales);

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
  }, [customScales]);

  return screenSize;
}; 