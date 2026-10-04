import React, { useState } from 'react';
import { Minus, Square, Copy, X, Sparkles } from 'lucide-react';

/**
 * FluveaTitleBar - Frameless Desktop Window Title & Control Bar
 * (Formerly TitleBar)
 */
export const FluveaTitleBar = ({
  title = 'Fluvea App',
  icon: IconComponent = Sparkles,
  logoSrc = null,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  children,
  className = '',
}) => {
  const [internalMax, setInternalMax] = useState(isMaximized);

  const handleMin = () => {
    if (onMinimize) {
      onMinimize();
    } else if (typeof window !== 'undefined' && window.electronAPI?.minimize) {
      window.electronAPI.minimize();
    }
  };

  const handleMax = () => {
    if (onMaximize) {
      onMaximize();
    } else if (typeof window !== 'undefined' && window.electronAPI?.maximize) {
      window.electronAPI.maximize();
    }
    setInternalMax(!internalMax);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (typeof window !== 'undefined' && window.electronAPI?.close) {
      window.electronAPI.close();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-11 z-50 flex items-center justify-between px-3 bg-black/45 backdrop-blur-xl border-b border-white/10 select-none ${className}`}
      style={{ WebkitAppRegion: 'drag' }}
    >
      {/* Brand & Title */}
      <div className="flex items-center space-x-3">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={title}
            className="w-6 h-6 object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          />
        ) : (
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/30 border border-white/20">
            <IconComponent className="w-3.5 h-3.5 text-white" />
          </div>
        )}
        <span className="text-xs font-semibold tracking-wide text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {title}
        </span>
      </div>

      {/* Middle Custom Content / Controls */}
      <div style={{ WebkitAppRegion: 'no-drag' }} className="flex items-center">
        {children}
      </div>

      {/* Window Controls */}
      <div className="flex items-center space-x-1 -mr-1" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          onClick={handleMin}
          className="w-10 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          title="Simge Durumuna Küçült"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleMax}
          className="w-10 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          title={internalMax ? 'Geri Yükle' : 'Büyüt'}
        >
          {internalMax ? <Copy className="w-3 h-3 rotate-180" /> : <Square className="w-3 h-3" />}
        </button>

        <button
          onClick={handleClose}
          className="w-10 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600/80 rounded-md transition-colors cursor-pointer"
          title="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default FluveaTitleBar;
