import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useFunFeatures } from '../../hooks/useFunFeatures';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../infrastructure/store/store';

export const FakeLoadingScreen: React.FC = () => {
  const username = useAppSelector((state) => state.getWelcomeUser.userDetails);
  const { isLoadingScreenActive } = useFunFeatures();
  const [timeLeft, setTimeLeft] = useState(20);

  const targetDate = new Date('2024-04-01');
  const currentDate = new Date();
  const isTargetDate = currentDate.getDate() === targetDate.getDate() &&
                      currentDate.getMonth() === targetDate.getMonth() &&
                      currentDate.getFullYear() === targetDate.getFullYear();

  const shouldShow = Math.random() < 0.05;

  if (!isTargetDate || !shouldShow || !isLoadingScreenActive) return null;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoadingScreenActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      toast.error('Sistem ile ilgili kritik hata tespiti yapıldı.'+ 
        'Lütfen birim yöneticiniz ile iletişime geçiniz ve ilgili durumu bildiriniz. Hata kodu: ERR_MJSRT74S', {
        position: "top-center",
        autoClose: 100000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    }

    return () => {
      if (timer) clearInterval(timer);
      if (!isLoadingScreenActive) setTimeLeft(20);
    };
  }, [isLoadingScreenActive, timeLeft]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} sx={{ color: 'white' }} />
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          mt: 2,
          animation: 'blink 1.5s infinite',
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.3 },
            '100%': { opacity: 1 },
          },
          textAlign: 'center'
        }}
      >
        Merhaba {username?.fullName} 
        <br />
        {timeLeft !== 0 && (
          <div>
            <span> Sistem Gereksinimleri Yükleniyor...</span>
            <span>(Kalan süre: {timeLeft} saniye)</span>
          </div>
        )}
                {timeLeft === 0 && (
          <div>
            <span> Sistem gereksinimleri yüklenemedi.</span>
            <span>Bağlantında bir problem olabilir.</span>
          </div>
        )}
        
      </Typography>
    </Box>
  );
}; 