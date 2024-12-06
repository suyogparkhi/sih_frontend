import React, { useRef, useEffect } from 'react';
//import { gsap } from 'gsap';

export default function WaveVisualization({featuresRef}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;

      // Ensure the canvas fully covers the viewport horizontally
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `400px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const waves = Array.from({ length: 8 }, (_, i) => ({
      amplitude: 25 + i * 5,
      frequency: 0.02 - i * 0.002,
      phase: (i * Math.PI) / 6,
      y: 0,
      speed: 0.02 + i * 0.002,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();

        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        waveGradient.addColorStop(0, 'rgba(0, 100, 255, 0.6)');
        waveGradient.addColorStop(1, 'rgba(0, 255, 255, 0.6)');

        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 3;

        ctx.shadowColor = 'rgba(0, 200, 255, 0.4)';
        ctx.shadowBlur = 20;

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        wave.phase += wave.speed;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);
  

  return (
    <div
      className="absolute w-screen h-[400px]  overflow-hidden"
      style={{ top:( featuresRef?.current?.offset  || 0)-110, margin:0 }}
    >
      <canvas ref={canvasRef} className="absolute w-full h-full" />
    </div>
  );
}
