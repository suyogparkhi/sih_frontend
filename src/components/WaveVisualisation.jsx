import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function WaveVisualization() {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
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

    gsap.to(waves, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: 'sine.inOut',
    });

    const animate = () => {
      // Clear the canvas with a black background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `#e0f7fa`); // Light cyan (from landing page)
        gradient.addColorStop(1, `#80deea`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        ctx.beginPath();

        // Blue-to-cyan gradient for the waves
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(0, 100, 255, 0.9)`); // Blue
        gradient.addColorStop(1, `rgba(0, 255, 255, 0.9)`); // Cyan

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;

        // Add glowing shadow effect
        ctx.shadowColor = `rgba(0, 200, 255, 0.6)`;
        ctx.shadowBlur = 20; // Increase for a more prominent glow

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            wave.y;

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
    <div className="relative w-full h-[400px] bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-50">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}
