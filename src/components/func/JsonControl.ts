import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { getAllJobForControl } from '../../infrastructure/store/slices/Job/GetAllJobForControl-Slice';
import ApiState from '../../infrastructure/Enums/ApiState';

let globalInterval: NodeJS.Timeout | null = null;
let subscribers = new Set<(hasChanged: boolean) => void>();
let lastHash: string = '';
let isInitialCheck = true;

const generateHash = (data: any): string => {
  try {
    return JSON.stringify(data)
      .split('')
      .reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
      }, 0)
      .toString();
  } catch (error) {
    console.error('Hash generation error:', error);
    return Date.now().toString();
  }
};

const debounce = (fn: Function, ms = 100) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), ms);
  };
};

export const useJsonControl = (interval: number = 5000): boolean => {
  const dispatch = useAppDispatch();
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { data, state } = useAppSelector((state) => state.getAllJobForControl);
  const mountedRef = useRef(true);
  const lastDispatchTime = useRef(0);
  const currentHashRef = useRef<string>('');

  const notifySubscribers = useCallback(
    debounce((newValue: boolean) => {
      if (mountedRef.current) {
        subscribers.forEach(callback => callback(newValue));
      }
    }, 100),
    []
  );

  const checkForChanges = useCallback(async () => {
    const now = Date.now();
    if (!isInitialCheck && now - lastDispatchTime.current < interval * 0.9) return;

    try {
      lastDispatchTime.current = now;
      isInitialCheck = false;
      await dispatch(getAllJobForControl());
    } catch (error) {
      console.error('Error checking for changes:', error);
    }
  }, [dispatch, interval]);

  useEffect(() => {
    subscribers.add(setHasChanged);
    mountedRef.current = true;

    if (!globalInterval) {
      checkForChanges();
      globalInterval = setInterval(checkForChanges, interval);
    }

    return () => {
      mountedRef.current = false;
      subscribers.delete(setHasChanged);
      if (subscribers.size === 0 && globalInterval) {
        clearInterval(globalInterval);
        globalInterval = null;
        lastHash = '';
        isInitialCheck = true;
      }
    };
  }, [checkForChanges, interval]);

  useEffect(() => {
    if (state === ApiState.Fulfilled && data) {
      const currentHash = generateHash(data);
      currentHashRef.current = currentHash;
      
      if (currentHash !== lastHash) {
        console.log('Hash değişti:', { 
          önceki: lastHash, 
          yeni: currentHash,
          değişimVar: currentHash !== lastHash 
        });
        
        lastHash = currentHash;
        notifySubscribers(true);
        
        setTimeout(() => {
          if (mountedRef.current) {
            notifySubscribers(false);
          }
        }, 200);
      }
    }
  }, [data, state, notifySubscribers]);

  return hasChanged;
};
