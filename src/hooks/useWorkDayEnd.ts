import { useEffect } from 'react';
import { useAppDispatch } from '../infrastructure/store/store';
import { activateWorkDayEnd } from '../infrastructure/store/slices/Settings/FunFeatures-Slice';

export const useWorkDayEnd = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkWorkDayEnd = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Saat 17:00'da kontrol et
            if (hours === 17 && minutes === 0) {
                dispatch(activateWorkDayEnd());
            }
        };

        // Her dakika kontrol et
        const interval = setInterval(checkWorkDayEnd, 60000); // 60000 ms = 1 dakika

        // İlk yüklemede de kontrol et
        checkWorkDayEnd();

        return () => clearInterval(interval);
    }, [dispatch]);
}; 