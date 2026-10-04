import React from 'react';

export interface FluveaGlassProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: string;
  yChannel?: string;
  mixBlendMode?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  glowVariant?: 'purple' | 'green' | 'emerald' | 'cyan' | 'gold' | 'pink';
}
export const FluveaGlass: React.FC<FluveaGlassProps>;

export interface FluveaSilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  waveAmp?: number;
  foldDepth?: number;
  waveTurbulence?: number;
  rotation?: number;
  lightMode?: boolean;
  className?: string;
}
export const FluveaSilk: React.FC<FluveaSilkProps>;

export interface FluveaCalligraphyProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'scroll' | 'hover' | 'loop';
  fillMode?: 'wipe' | 'fade' | 'none';
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onComplete?: () => void;
}
export const FluveaCalligraphy: React.FC<FluveaCalligraphyProps>;

export interface FluveaNebulaProps {
  isReady?: boolean;
  onDispersed?: () => void;
  colorScheme?: 'purple' | 'emerald' | 'cyan' | 'gold' | 'pink';
  className?: string;
}
export const FluveaNebula: React.FC<FluveaNebulaProps>;

export interface FluveaVortexProps {
  onComplete?: () => void;
  sourceColor?: string;
  targetColor?: string;
  particleDensity?: number;
  className?: string;
}
export const FluveaVortex: React.FC<FluveaVortexProps>;

export interface FluveaPixelCardProps {
  variant?: 'default' | 'purple' | 'blue' | 'emerald' | 'gold' | 'pink';
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
}
export const FluveaPixelCard: React.FC<FluveaPixelCardProps>;

export interface FluveaBannerModalProps {
  open?: boolean;
  title?: string;
  badge?: string;
  message?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  actionUrl?: string;
  onAction?: () => void;
  onClose?: () => void;
  duration?: number;
  variant?: 'purple' | 'emerald' | 'cyan' | 'gold' | 'pink';
  className?: string;
  draggable?: boolean;
}
export const FluveaBannerModal: React.FC<FluveaBannerModalProps>;

export interface FluveaTitleBarProps {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  logoSrc?: string | null;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  children?: React.ReactNode;
  className?: string;
}
export const FluveaTitleBar: React.FC<FluveaTitleBarProps>;
