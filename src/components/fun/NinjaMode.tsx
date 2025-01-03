import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../infrastructure/store/store';

interface Star {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

export const NinjaMode: React.FC = () => {
  const isActive = useAppSelector((state) => state.funFeatures.isNinjaModeActive);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastStarTimeRef = useRef(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createStar = (x: number, y: number) => {
      const star: Star = {
        x,
        y,
        rotation: Math.random() * Math.PI * 2,
        scale: 1,
        opacity: 1
      };
      starsRef.current.push(star);
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, scale: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.moveTo(0, -10);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(0, -10);
        ctx.lineTo(5, -5);
        ctx.lineTo(10, 0);
        ctx.lineTo(5, 5);
      }
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current = starsRef.current.filter(star => {
        star.rotation += 0.2;
        star.scale *= 0.95;
        star.opacity *= 0.95;

        if (star.opacity > 0.1) {
          drawStar(ctx, star.x, star.y, star.rotation, star.scale, star.opacity);
          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastStarTimeRef.current > 50) { 
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createStar(x, y);
        lastStarTimeRef.current = currentTime;
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      starsRef.current = [];
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}; 