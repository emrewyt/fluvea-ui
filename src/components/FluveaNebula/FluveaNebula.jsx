import React, { useEffect, useRef, useState } from 'react';

/**
 * FluveaNebula - Floating Starlight Particle Skeleton & Dispersal Loader
 * (Formerly ParticleSkeleton)
 */
export const FluveaNebula = ({
  isReady = false,
  onDispersed,
  colorScheme = 'purple', // 'purple' | 'emerald' | 'cyan' | 'gold' | 'pink'
  className = '',
}) => {
  const canvasRef = useRef(null);
  const [destroyed, setDestroyed] = useState(false);
  const isExplodingRef = useRef(false);

  useEffect(() => {
    if (isReady && !isExplodingRef.current) {
      isExplodingRef.current = true;
    }
  }, [isReady]);

  useEffect(() => {
    if (destroyed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];

    const getColors = () => {
      switch (colorScheme) {
        case 'emerald':
        case 'green':
          return { primary: '#34d399', glow: '#10b981', light: '#a7f3d0' };
        case 'cyan':
          return { primary: '#22d3ee', glow: '#06b6d4', light: '#a5f3fc' };
        case 'gold':
          return { primary: '#fbbf24', glow: '#f59e0b', light: '#fde68a' };
        case 'pink':
          return { primary: '#f472b6', glow: '#ec4899', light: '#fbcfe8' };
        case 'purple':
        default:
          return { primary: '#c084fc', glow: '#a855f7', light: '#f3e8ff' };
      }
    };

    const scheme = getColors();

    const generateParticles = () => {
      particles = [];
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Top-Left Brand Badge Skeleton
      const avatarCx = 66;
      const avatarCy = 90;
      for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 24;
        particles.push({
          x: avatarCx + Math.cos(angle) * r,
          y: avatarCy + Math.sin(angle) * r,
          baseX: avatarCx + Math.cos(angle) * r,
          baseY: avatarCy + Math.sin(angle) * r,
          centerX: avatarCx,
          centerY: avatarCy,
          size: Math.random() * 2 + 1.2,
          color: scheme.primary,
          glowColor: scheme.glow,
          alpha: Math.random() * 0.6 + 0.3,
          speed: Math.random() * 0.04 + 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0,
        });
      }

      // Center Slogan Box
      const heroCx = width / 2;
      const heroCy = height / 2 - 35;
      for (let i = 0; i < 220; i++) {
        const px = heroCx + (Math.random() - 0.5) * 540;
        const py = heroCy + (Math.random() - 0.5) * 36;
        particles.push({
          x: px,
          y: py,
          baseX: px,
          baseY: py,
          centerX: heroCx,
          centerY: heroCy,
          size: Math.random() * 2.4 + 1.2,
          color: scheme.light,
          glowColor: scheme.primary,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.05 + 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0,
        });
      }

      // Center Description Box
      const descCy = height / 2 + 35;
      for (let i = 0; i < 140; i++) {
        const px = heroCx + (Math.random() - 0.5) * 480;
        const py = descCy + (Math.random() - 0.5) * 28;
        particles.push({
          x: px,
          y: py,
          baseX: px,
          baseY: py,
          centerX: heroCx,
          centerY: descCy,
          size: Math.random() * 1.6 + 0.9,
          color: scheme.primary,
          glowColor: scheme.glow,
          alpha: Math.random() * 0.5 + 0.25,
          speed: Math.random() * 0.03 + 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0,
        });
      }

      // Buttons / Controls Pills
      const btnCy = descCy + 65;
      [-105, 105].forEach((btnOffsetX) => {
        const bCx = heroCx + btnOffsetX;
        for (let i = 0; i < 65; i++) {
          const px = bCx + (Math.random() - 0.5) * 170;
          const py = btnCy + (Math.random() - 0.5) * 42;
          particles.push({
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            centerX: bCx,
            centerY: btnCy,
            size: Math.random() * 2 + 1.2,
            color: scheme.glow,
            glowColor: scheme.primary,
            alpha: Math.random() * 0.6 + 0.3,
            speed: Math.random() * 0.04 + 0.02,
            phase: Math.random() * Math.PI * 2,
            vx: 0,
            vy: 0,
          });
        }
      });
    };

    generateParticles();

    let animationId = null;
    let explosionProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isExploding = isExplodingRef.current;

      if (isExploding) {
        explosionProgress += 0.026;
      }

      let activeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isExploding) {
          p.phase += p.speed;
          p.x = p.baseX + Math.sin(p.phase) * 3;
          p.y = p.baseY + Math.cos(p.phase * 0.8) * 3;
        } else {
          if (p.vx === 0 && p.vy === 0) {
            const dx = p.x - p.centerX;
            const dy = p.y - p.centerY;
            const dist = Math.hypot(dx, dy) || 1;
            const force = Math.random() * 9 + 4;
            p.vx = (dx / dist) * force + (Math.random() - 0.5) * 5;
            p.vy = (dy / dist) * force + (Math.random() - 0.5) * 5;
          }

          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 1.05;
          p.vy *= 1.05;
          p.alpha = Math.max(0, p.alpha - 0.035);
        }

        if (p.alpha > 0.01) {
          activeCount++;
          ctx.save();
          ctx.shadowBlur = isExploding ? 14 : 7;
          ctx.shadowColor = p.glowColor;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = isExploding ? '#ffffff' : p.color;

          ctx.beginPath();
          ctx.arc(p.x, p.y, isExploding ? p.size * 1.4 : p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (isExploding && (activeCount === 0 || explosionProgress >= 1)) {
        setDestroyed(true);
        onDispersed?.();
        return;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      generateParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [destroyed, onDispersed, colorScheme]);

  if (destroyed) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-20 pointer-events-none w-full h-full ${className}`}
      style={{ display: destroyed ? 'none' : 'block' }}
    />
  );
};

export default FluveaNebula;
