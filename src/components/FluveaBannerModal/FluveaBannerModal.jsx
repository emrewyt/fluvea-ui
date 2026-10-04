import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Copy, Check, Info, Bell, AlertTriangle } from 'lucide-react';

/**
 * FluveaBannerModal - Floating Luxury Notification & Banner Glass Bar
 * (Formerly SocialModalBar)
 */
export const FluveaBannerModal = ({
  open = true,
  title = 'Fluvea Studio',
  badge = 'NOTIFY',
  message = '',
  icon: IconComponent = Bell,
  actionText = 'Aç',
  actionUrl = '',
  onAction,
  onClose,
  duration = 8000,
  variant = 'purple', // 'purple' | 'emerald' | 'cyan' | 'gold' | 'pink'
  className = '',
  draggable = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const timerRef = useRef(null);
  const remainingTimeRef = useRef(duration);

  const getVariantStyles = () => {
    switch (variant) {
      case 'emerald':
      case 'green':
        return {
          border: 'border-emerald-500/40',
          glow: 'shadow-[0_15px_45px_rgba(16,185,129,0.28)]',
          badge: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
          bar: 'from-emerald-400 to-teal-500',
          accent: 'text-emerald-400',
        };
      case 'cyan':
      case 'blue':
        return {
          border: 'border-cyan-400/40',
          glow: 'shadow-[0_15px_45px_rgba(6,182,212,0.28)]',
          badge: 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300',
          bar: 'from-cyan-400 to-blue-500',
          accent: 'text-cyan-400',
        };
      case 'gold':
      case 'amber':
        return {
          border: 'border-amber-400/50',
          glow: 'shadow-[0_15px_45px_rgba(245,158,11,0.28)]',
          badge: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
          bar: 'from-amber-400 to-yellow-500',
          accent: 'text-amber-400',
        };
      case 'pink':
        return {
          border: 'border-pink-500/40',
          glow: 'shadow-[0_15px_45px_rgba(236,72,153,0.28)]',
          badge: 'bg-pink-500/15 border-pink-400/40 text-pink-300',
          bar: 'from-pink-500 to-rose-400',
          accent: 'text-pink-400',
        };
      case 'purple':
      default:
        return {
          border: 'border-purple-500/40',
          glow: 'shadow-[0_15px_45px_rgba(168,85,247,0.28)]',
          badge: 'bg-purple-500/15 border-purple-400/40 text-purple-300',
          bar: 'from-purple-500 to-indigo-500',
          accent: 'text-purple-400',
        };
    }
  };

  const styleConfig = getVariantStyles();

  useEffect(() => {
    if (!open || duration <= 0) return;

    remainingTimeRef.current = duration;
    setProgress(100);

    const interval = 50;
    timerRef.current = setInterval(() => {
      if (isPaused) return;

      remainingTimeRef.current -= interval;
      const pct = Math.max(0, (remainingTimeRef.current / duration) * 100);
      setProgress(pct);

      if (remainingTimeRef.current <= 0) {
        clearInterval(timerRef.current);
        onClose?.();
      }
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [open, isPaused, duration, onClose]);

  if (!open) return null;

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionUrl) {
      if (typeof window !== 'undefined' && window.open) {
        window.open(actionUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleCopy = () => {
    if (actionUrl && typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(actionUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed top-12 left-6 z-50 w-full max-w-[440px] rounded-2xl bg-[#0c0c14]/90 backdrop-blur-2xl border ${styleConfig.border} ${styleConfig.glow} p-4 text-white shadow-2xl select-none transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div
        style={{ WebkitAppRegion: draggable ? 'drag' : 'no-drag' }}
        className="flex items-center justify-between pb-3 border-b border-white/10"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center p-1.5 shrink-0 shadow-inner">
            <IconComponent className={`w-4 h-4 ${styleConfig.accent}`} />
          </div>

          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-md border ${styleConfig.badge}`}>
            {badge}
          </span>

          <span className="text-xs font-semibold text-slate-300">{title}</span>
        </div>

        <button
          onClick={onClose}
          type="button"
          style={{ WebkitAppRegion: 'no-drag' }}
          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Body */}
      <div className="py-3 px-1">
        <p className="text-xs md:text-[12.5px] leading-relaxed text-slate-100 font-normal tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {message}
        </p>
      </div>

      {/* Actions */}
      <div
        style={{ WebkitAppRegion: 'no-drag' }}
        className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]"
      >
        {actionUrl ? (
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Bağlantıyı Kopyala</span>
              </>
            )}
          </button>
        ) : (
          <div />
        )}

        {(actionText || actionUrl) && (
          <button
            onClick={handleAction}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white font-medium transition-all cursor-pointer"
          >
            <span>{actionText}</span>
            <ExternalLink className="w-3 h-3 text-slate-300" />
          </button>
        )}
      </div>

      {/* Countdown Progress Bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${styleConfig.bar} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default FluveaBannerModal;
