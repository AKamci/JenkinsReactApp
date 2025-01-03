import React, { useEffect } from 'react';
import { useAppDispatch } from '../../infrastructure/store/store';
import { setUpdateNotification } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';
import { toast } from 'react-toastify';

export const UpdateNotification: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkProbability = () => {
            const random = Math.random();
            if (random <= 0.1) {
                dispatch(setUpdateNotification(true));
                toast.info(
                    <div style={{ fontSize: '16px', padding: '10px' }}>
                        <h4 style={{ marginBottom: '10px', color: '#0288d1' }}>
                        Sistem Güncellemesi Mevcut!</h4>
                        <br />
                        <p>Devam etmek için sistemi güncelleyin.</p>
                        <br />
                        <p>Sistemi güncellemek için <strong>CTRL + ALT + F</strong> tuş kombinasyonunu kullanınız.</p>
                    </div>,
                    {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                            background: '#fff',
                            color: '#333',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: '1px solid #0288d1',
                            borderRadius: '8px'
                        }
                    }
                );
            }
        };

        const interval = setInterval(checkProbability, 900000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return null;
};

export default React.memo(UpdateNotification); 