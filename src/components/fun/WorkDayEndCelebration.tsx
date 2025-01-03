import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Typography, Box, keyframes } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { deactivateWorkDayEnd } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';
import { styled } from '@mui/system';

const celebrationMessages = [
  "MESAİ BİTTİ! 🎉",
  "GÜNÜN YORGUNLUĞUNU AT! 🥳",
  "ŞİMDİ EĞLENME ZAMANI! 🎊",
  "İŞLER TAMAM, KEYİFLER BAŞLASIN! 😎",
  "HAK ETTİN, TADINI ÇIKAR! 🍹",
];

const fireworkAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const Firework = styled('div')({
  position: 'absolute',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'white',
  pointerEvents: 'none',
  animation: `${fireworkAnimation} 1s ease-out forwards`,
});


export const WorkDayEndCelebration: React.FC = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.funFeatures.isWorkDayEndActive);
  const [message, setMessage] = useState("");
  const [fireworks, setFireworks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isActive) {
      setMessage(celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]);
      const timer = setTimeout(() => {
        dispatch(deactivateWorkDayEnd());
      }, 5000);

      const createFireworks = () => {
        const newFireworks = [];
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
          newFireworks.push(
            <Firework
              key={i}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                background: color,
              }}
            />
          );
        }
        setFireworks(newFireworks);
      };

      createFireworks();

      return () => {
        clearTimeout(timer);
        setFireworks([]);
      };
    }
  }, [isActive, dispatch]);

  return (
    <Dialog
      open={isActive}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {fireworks}
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 4,
            borderRadius: 2,
            textAlign: 'center',
            animation: 'bounce 1s infinite',
            '@keyframes bounce': {
              '0%, 100%': {
                transform: 'translateY(0)',
              },
              '50%': {
                transform: 'translateY(-20px)',
              },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};