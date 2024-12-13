import { useEffect } from 'react';

export const useKeyboardShortcut = (
    shortcut: string,
    callback: () => void
) => {
    useEffect(() => {
        const keys = shortcut.toLowerCase().split('+');
        
        const handleKeyDown = (event: KeyboardEvent) => {
            const isShiftRequired = keys.includes('shift');
            if (isShiftRequired && !event.shiftKey) return;
            
            const key = event.key.toLowerCase();
            if (keys.includes(key)) {
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcut, callback]);
};