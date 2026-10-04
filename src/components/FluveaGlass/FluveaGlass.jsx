/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useId } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

/**
 * FluveaGlass - Liquid Glass Surface with Optical Refraction & Caustic Gleam
 * (Formerly GlassSurface)
 */
export const FluveaGlass = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
  onClick,
  glowVariant = 'purple', // 'purple' | 'green' | 'emerald' | 'cyan' | 'gold' | 'pink'
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `fluvea-glass-filter-${uniqueId}`;
  const redGradId = `fluvea-red-grad-${uniqueId}`;
  const blueGradId = `fluvea-blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const isDarkMode = useDarkMode();

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    if (isWebkit || isFirefox) return false;

    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== '';
  };

  const supportsBackdropFilter = () => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('backdrop-filter', 'blur(10px)');
  };

  const getContainerStyles = () => {
    const baseStyles = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      '--glass-frost': backgroundOpacity,
      '--glass-saturation': saturation,
    };

    const backdropFilterSupported = supportsBackdropFilter();

    if (svgSupported) {
      return {
        ...baseStyles,
        background: isDarkMode ? `hsl(0 0% 0% / ${backgroundOpacity})` : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
          : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px) saturate(1.8) brightness(1.2)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.8) brightness(1.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
                        0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
          };
        }
      } else {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
          };
        }
      }
    }
  };

  const getGlowStyles = () => {
    switch (glowVariant) {
      case 'green':
      case 'emerald':
        return {
          bg: 'radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.32) 0%, rgba(5, 150, 105, 0.16) 50%, transparent 80%)',
          inner: 'inset 0 0 18px rgba(16, 185, 129, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)',
          outer: '0 0 28px -2px rgba(16, 185, 129, 0.45)',
        };
      case 'cyan':
        return {
          bg: 'radial-gradient(ellipse at 50% 100%, rgba(6, 182, 212, 0.32) 0%, rgba(14, 116, 144, 0.16) 50%, transparent 80%)',
          inner: 'inset 0 0 18px rgba(6, 182, 212, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)',
          outer: '0 0 28px -2px rgba(6, 182, 212, 0.45)',
        };
      case 'gold':
        return {
          bg: 'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.32) 0%, rgba(180, 83, 9, 0.16) 50%, transparent 80%)',
          inner: 'inset 0 0 18px rgba(245, 158, 11, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)',
          outer: '0 0 28px -2px rgba(245, 158, 11, 0.45)',
        };
      case 'pink':
        return {
          bg: 'radial-gradient(ellipse at 50% 100%, rgba(236, 72, 153, 0.32) 0%, rgba(190, 24, 93, 0.16) 50%, transparent 80%)',
          inner: 'inset 0 0 18px rgba(236, 72, 153, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)',
          outer: '0 0 28px -2px rgba(236, 72, 153, 0.45)',
        };
      case 'purple':
      default:
        return {
          bg: 'radial-gradient(ellipse at 50% 100%, rgba(168, 85, 247, 0.28) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 80%)',
          inner: 'inset 0 0 18px rgba(168, 85, 247, 0.28), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)',
          outer: '0 0 26px -2px rgba(168, 85, 247, 0.38)',
        };
    }
  };

  const glow = getGlowStyles();

  return (
    <div
      ref={containerRef}
      className={`fluvea-glass relative flex items-center justify-center overflow-hidden cursor-pointer active:scale-[0.97] transition-all duration-300 ease-out group select-none ${className}`}
      style={getContainerStyles()}
      onClick={onClick}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" id="greenchannel" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      {/* Optical Caustic Gleam & Inner Halo */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: glow.bg,
          boxShadow: glow.inner,
        }}
      />
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: glow.outer,
        }}
      />

      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10 select-none">
        {children}
      </div>
    </div>
  );
};

export default FluveaGlass;
