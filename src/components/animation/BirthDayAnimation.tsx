import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface BirthDayAnimationProps {
    onComplete?: () => void;
    duration?: number;
}

const BirthDayAnimation: React.FC<BirthDayAnimationProps> = ({
    onComplete,
    duration = 10000
}) => {
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const detectSize = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        const timer = setTimeout(() => {
            onComplete?.();
        }, duration);

        return () => {
            window.removeEventListener('resize', detectSize);
            clearTimeout(timer);
        };
    }, [duration, onComplete]);

    return (
        <>
            <Confetti
                width={windowDimension.width}
                height={windowDimension.height}
                numberOfPieces={800}
                recycle={true}
                colors={['#FFD700', '#FF69B4', '#00CED1', '#9370DB', '#FF6347', '#32CD32']}
                gravity={0.3}
                tweenDuration={5000}
            />
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '4rem',
                borderRadius: '3rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                animation: 'fadeInScale 1.5s ease-out',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.3)'
            }}>
                <style>
                    {`
                        @keyframes fadeInScale {
                            0% {
                                opacity: 0;
                                transform: translate(-50%, -50%) scale(0.8);
                            }
                            100% {
                                opacity: 1;
                                transform: translate(-50%, -50%) scale(1);
                            }
                        }
                        @keyframes float {
                            0%, 100% {
                                transform: translateY(0);
                            }
                            50% {
                                transform: translateY(-15px);
                            }
                        }
                    `}
                </style>
                <h1 style={{
                    fontSize: '4rem',
                    background: 'linear-gradient(45deg, #FF69B4, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontWeight: 'bold',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    🎉 Doğum Günün Kutlu Olsun! 🎉
                    <br /> 
                    🎂Nazif İLBEK🎂
                </h1>
                <p style={{
                    fontSize: '1.8rem',
                    color: '#333',
                    textAlign: 'center',
                    lineHeight: '1.8',
                    margin: '0'
                }}>
                    ✨ Nice mutlu, sağlıklı ve başarılı yıllara! 🎈
                </p>
            </div>
        </>
    );
};

export default BirthDayAnimation;
