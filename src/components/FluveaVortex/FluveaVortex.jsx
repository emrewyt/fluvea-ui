import React, { useEffect, useRef } from 'react';

/**
 * FluveaVortex - Cosmic Vortex Dissolve & Particle Transition Overlay
 * (Formerly VortexDissolve)
 */
export const FluveaVortex = ({
  onComplete,
  sourceColor = '#c084fc',
  targetColor = '#34d399',
  particleDensity = 400,
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const screenCx = width / 2;
    const screenCy = height / 2;

    const particles = [];

    // Distribute particles across the viewport
    for (let i = 0; i < particleDensity; i++) {
      const px = screenCx + (Math.random() - 0.5) * width * 0.9;
      const py = screenCy + (Math.random() - 0.5) * height * 0.9;
      const angle = Math.atan2(py - screenCy, px - screenCx);
      const dist = Math.hypot(px - screenCx, py - screenCy) || Math.random() * 80 + 20;

      particles.push({
        x: px,
        y: py,
        angle,
        radius: dist,
        angularSpeed: Math.random() * 0.055 + 0.04,
        radialSpeed: Math.random() * 2 - 1,
        size: Math.random() * 2.4 + 1.2,
        color: sourceColor,
        targetColor: targetColor,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.018,
      });
    }

    let animationId = null;
    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      frameCount++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cosmic swirl acceleration towards the singularity
        p.angularSpeed *= 1.015;
        p.angle += p.angularSpeed;
        p.radius *= 0.985;

        p.x = screenCx + Math.cos(p.angle) * p.radius;
        p.y = screenCy + Math.sin(p.angle) * p.radius;
        p.alpha = Math.max(0, p.alpha - p.decay);

        if (p.alpha > 0.01) {
          activeCount++;
          ctx.save();
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.targetColor;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = frameCount > 15 ? p.targetColor : p.color;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (activeCount === 0 || frameCount > 65) {
        onComplete?.();
        return;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [onComplete, sourceColor, targetColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-40 pointer-events-none w-full h-full ${className}`}
    />
  );
};

export default FluveaVortex;
