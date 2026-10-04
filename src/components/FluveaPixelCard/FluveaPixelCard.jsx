import React, { useEffect, useRef } from 'react';

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const VARIANTS = {
  default: {
    activeColor: '#a855f7',
    gap: 5,
    speed: 35,
    colors: '#c084fc,#a855f7,#e9d5ff',
    noFocus: false,
  },
  purple: {
    activeColor: '#a855f7',
    gap: 5,
    speed: 35,
    colors: '#c084fc,#a855f7,#e9d5ff',
    noFocus: false,
  },
  blue: {
    activeColor: '#38bdf8',
    gap: 6,
    speed: 30,
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',
    noFocus: false,
  },
  emerald: {
    activeColor: '#10b981',
    gap: 5,
    speed: 35,
    colors: '#34d399,#10b981,#a7f3d0',
    noFocus: false,
  },
  gold: {
    activeColor: '#f59e0b',
    gap: 5,
    speed: 35,
    colors: '#fbbf24,#f59e0b,#fef3c7',
    noFocus: false,
  },
  pink: {
    activeColor: '#ec4899',
    gap: 5,
    speed: 40,
    colors: '#f472b6,#ec4899,#fbcfe8',
    noFocus: false,
  },
};

/**
 * FluveaPixelCard - Interactive Cyberpunk Pixel Dust Surface
 * (Formerly PixelCard)
 */
export const FluveaPixelCard = ({
  variant = 'default',
  gap,
  speed,
  colors,
  noFocus,
  className = '',
  style = {},
  onClick,
  children,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;
  const activeColor = variantCfg.activeColor || '#8b5cf6';

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    if (width === 0 || height === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(',');
    const pxs = [];
    for (let x = 0; x < width; x += parseInt(finalGap, 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap, 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = (fnName) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      pixel[fnName]();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleAnimation = (name) => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  };

  const onMouseEnter = () => handleAnimation('appear');
  const onMouseLeave = () => handleAnimation('disappear');
  const onFocus = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('appear');
  };
  const onBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('disappear');
  };

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      style={{
        '--pixel-card-active-color': activeColor,
        ...style,
      }}
      className={`group relative overflow-hidden grid place-items-center border border-white/10 bg-[#0f0f16]/70 backdrop-blur-xl rounded-[24px] isolate transition-all duration-300 ease-[cubic-bezier(0.5,1,0.89,1)] select-none cursor-pointer hover:border-white/30 hover:shadow-2xl active:scale-[0.98] ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <div className="absolute inset-0 m-auto aspect-square bg-[radial-gradient(circle,var(--pixel-card-active-color,#09090b),transparent_80%)] opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.5,1,0.89,1)] group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none" />
      <canvas className="w-full h-full block absolute inset-0 pointer-events-none" ref={canvasRef} />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default FluveaPixelCard;
