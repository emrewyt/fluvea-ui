import React, { useState, useEffect } from 'react';
import {
  FluveaGlass,
  FluveaSilk,
  FluveaCalligraphy,
  FluveaNebula,
  FluveaVortex,
  FluveaPixelCard,
  FluveaBannerModal,
  FluveaTitleBar,
} from '../index';
import {
  Sparkles,
  Globe,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
  Flame,
  ShieldCheck,
  Bell,
  RefreshCw,
  Orbit,
  ArrowRight,
  Maximize2,
  SlidersHorizontal,
  Instagram,
  Github,
  Compass,
  Check,
  Eye,
  Activity,
  Play
} from 'lucide-react';

export default function App() {
  // ── 1. AÇILIŞ AKIŞI DURUMLARI ──
  // Adım 1: Silk 5 saniyede fade-in ile gelir.
  // Adım 2: Ortada el yazısı animasyonu "hello, welcome to @fluvea/ui" belirir.
  // Adım 3: 3 saniye sonra el yazısı blurring fade-out ile kaybolur.
  // Adım 4: Wobble Physics Bounce ile ana arayüz sırayla gelir.
  const [silkLoaded, setSilkLoaded] = useState(false);
  const [showHandwriting, setShowHandwriting] = useState(true);
  const [blurringOutHandwriting, setBlurringOutHandwriting] = useState(false);
  const [showMainUI, setShowMainUI] = useState(false);

  useEffect(() => {
    // Silk hemen mount olur, CSS geçişiyle tam 5 saniyede pürüzsüzce parlar
    const silkTimer = setTimeout(() => {
      setSilkLoaded(true);
    }, 50);

    // 3.0 saniye sonra el yazısı blurring fade-out ile kaybolmaya başlar
    const blurTimer = setTimeout(() => {
      setBlurringOutHandwriting(true);
    }, 3000);

    // 4.0 saniyede el yazısı tamamen kalkar ve Wobble Bounce ana UI sırayla doğar
    const mainUiTimer = setTimeout(() => {
      setShowHandwriting(false);
      setShowMainUI(true);
    }, 4000);

    return () => {
      clearTimeout(silkTimer);
      clearTimeout(blurTimer);
      clearTimeout(mainUiTimer);
    };
  }, []);

  // ── 2. DİL (Language) DURUMU ──
  const [lang, setLang] = useState('tr'); // 'tr' | 'en'

  // ── 3. AKTİF SAYFA SEÇİMİ (Tab Navigation) ──
  // 'home' | 'glass' | 'transitions' | 'pixelcard'
  const [activeTab, setActiveTab] = useState('home');

  // ── 4. ARKA PLAN SILK & RGB KONTROLÜ ──
  const [activeColorSlot, setActiveColorSlot] = useState(1);
  const [rgb1, setRgb1] = useState({ r: 90, g: 35, b: 140 }); // Derin Kozmik Mor
  const [rgb2, setRgb2] = useState({ r: 16, g: 110, b: 85 }); // Zümrüt Neon Yeşil
  const [silkSpeed, setSilkSpeed] = useState(1.8);
  const [silkTurbulence, setSilkTurbulence] = useState(1.1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentSilkColor =
    activeColorSlot === 1
      ? `rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b})`
      : `rgb(${rgb2.r}, ${rgb2.g}, ${rgb2.b})`;

  const handleRgbChange = (channel, value) => {
    const val = parseInt(value, 10);
    if (activeColorSlot === 1) {
      setRgb1((prev) => ({ ...prev, [channel]: val }));
    } else {
      setRgb2((prev) => ({ ...prev, [channel]: val }));
    }
  };

  const currentRgb = activeColorSlot === 1 ? rgb1 : rgb2;

  // ── 5. OYNANABİLİR (INTERACTIVE SANDBOX) COMPONENT STATE'LERİ ──

  // Akışkan Cam (FluveaGlass) Ayarları
  const [glassWidth, setGlassWidth] = useState(240);
  const [glassHeight, setGlassHeight] = useState(60);
  const [glassRadius, setGlassRadius] = useState(30);
  const [glassGlow, setGlassGlow] = useState('purple');
  const [glassBrightness, setGlassBrightness] = useState(50);
  const [glassDistortion, setGlassDistortion] = useState(-180);
  const [glassBlur, setGlassBlur] = useState(11);

  // Bekleme ve Geçiş Animasyonları Ayarları
  const [vortexActive, setVortexActive] = useState(false);
  const [vortexSource, setVortexSource] = useState('#c084fc');
  const [vortexTarget, setVortexTarget] = useState('#34d399');
  const [vortexDensity, setVortexDensity] = useState(400);

  const [nebulaActive, setNebulaActive] = useState(false);
  const [nebulaReady, setNebulaReady] = useState(false);
  const [nebulaScheme, setNebulaScheme] = useState('purple');

  const [bannerActive, setBannerActive] = useState(false);
  const [bannerVariant, setBannerVariant] = useState('purple');
  const [bannerTitle, setBannerTitle] = useState('Fluvea Bildirim');
  const [bannerMessage, setBannerMessage] = useState('Sıvı cam optiği ve geri sayımlı lüks bildirim devrede.');

  // Pixel Card Ayarları
  const [pixelVariant, setPixelVariant] = useState('purple');
  const [pixelGap, setPixelGap] = useState(5);
  const [pixelSpeed, setPixelSpeed] = useState(35);
  const [pixelCardTitle, setPixelCardTitle] = useState('Cyberpunk Quantum Core');
  const [pixelCardDesc, setPixelCardDesc] = useState('Dinamik parçacık saçılımı ile çalışan modern arayüz kartı.');

  return (
    <div className="relative min-h-screen w-full bg-[#06060a] text-white overflow-x-hidden font-sans select-none flex flex-col justify-between">
      {/* ── 1. TITLEBAR (@Fluvea/ui Başlıklı, Sağ Kontrollü) ── */}
      <FluveaTitleBar
        title="@Fluvea/ui"
        icon={Sparkles}
      />

      {/* ── 2. ARKA PLAN SILK (Fade-in ile tam 5 saniyede Doğan Canlı WebGL) ── */}
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity ease-in-out"
        style={{
          opacity: silkLoaded ? 1 : 0,
          transitionDuration: '5000ms',
        }}
      >
        <FluveaSilk
          color={currentSilkColor}
          speed={silkSpeed}
          scale={1}
          waveAmp={0.035}
          foldDepth={0.44}
          waveTurbulence={silkTurbulence}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,10,0.65)_100%)] pointer-events-none" />
      </div>

      {/* ── 3. EL YAZISI AÇILIŞ ANİMASYONU ("hello, welcome to @fluvea/ui") ── */}
      {showHandwriting && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-out ${
            blurringOutHandwriting ? 'opacity-0 filter blur-2xl scale-110' : 'opacity-100 filter blur-0 scale-100'
          }`}
        >
          <div className="relative px-8 py-6 rounded-3xl bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-2xl">
            <h1 className="font-handwriting text-3xl md:text-5xl lg:text-6xl text-purple-200 tracking-wide handwriting-writing drop-shadow-[0_4px_24px_rgba(192,132,252,0.6)]">
              hello, welcome to @fluvea/ui
            </h1>
          </div>
        </div>
      )}

      {/* ── 4. SOL ÜST LANGUAGE BUTONU (Wobble Bounce ile gelir) ── */}
      {showMainUI && (
        <div className="fixed top-14 left-6 z-30 animate-wobble-bounce-1">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121e]/80 hover:bg-[#1c1c2e] border border-white/15 hover:border-purple-400/50 shadow-lg backdrop-blur-xl transition-all cursor-pointer"
            title="Dili Değiştir"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-45 transition-transform" />
            <span className="font-mono text-xs font-bold uppercase text-slate-200 tracking-wider">
              {lang === 'tr' ? 'TR • Türkçe' : 'EN • English'}
            </span>
          </button>
        </div>
      )}

      {/* ── 5. SOL SİLK RGB AYAR KULAKÇIĞI VE ÇEKMECESİ (Wobble Bounce ile gelir) ── */}
      {showMainUI && (
        <>
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="fixed top-28 left-0 z-30 bg-[#12121e]/90 hover:bg-[#1a1a2e] text-slate-200 border border-white/15 border-l-0 py-2.5 px-2.5 rounded-r-xl shadow-xl transition-all hover:pl-3.5 cursor-pointer flex items-center gap-1.5 font-mono text-xs animate-wobble-bounce-2"
            style={{ left: isDrawerOpen ? '320px' : '0px' }}
            title="Silk RGB Ayarları"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            {isDrawerOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          <aside
            className={`fixed top-11 bottom-0 left-0 z-30 w-80 bg-[#0b0b14]/90 backdrop-blur-2xl border-r border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-4 h-4 text-purple-300" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">Silk Renk Paleti</h2>
              </div>
            </div>

            <div className="p-5 space-y-6 flex-1 overflow-y-auto">
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-3">
                  Renk Seçimi (#1 ve #2)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveColorSlot(1)}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      activeColorSlot === 1
                        ? 'bg-purple-600/30 border-purple-400 shadow-lg text-white'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: `rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b})` }}
                      />
                      <span className="text-xs font-bold font-mono">Renk #1</span>
                    </div>
                    {activeColorSlot === 1 && <Check className="w-3.5 h-3.5 text-purple-300" />}
                  </button>

                  <button
                    onClick={() => setActiveColorSlot(2)}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      activeColorSlot === 2
                        ? 'bg-emerald-600/30 border-emerald-400 shadow-lg text-white'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: `rgb(${rgb2.r}, ${rgb2.g}, ${rgb2.b})` }}
                      />
                      <span className="text-xs font-bold font-mono">Renk #2</span>
                    </div>
                    {activeColorSlot === 2 && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                  </button>
                </div>
              </div>

              {/* RGB Sliderları */}
              <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Aktif RGB</span>
                  <span className="text-purple-300">rgb({currentRgb.r}, {currentRgb.g}, {currentRgb.b})</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-rose-400">
                    <span>R (Kırmızı)</span>
                    <span>{currentRgb.r}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentRgb.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-emerald-400">
                    <span>G (Yeşil)</span>
                    <span>{currentRgb.g}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentRgb.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-sky-400">
                    <span>B (Mavi)</span>
                    <span>{currentRgb.b}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentRgb.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    className="w-full accent-sky-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Hız ve Dalga */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07]">
                <div className="flex justify-between text-[11px] font-mono text-slate-300">
                  <span>Hız</span>
                  <span>{silkSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={silkSpeed}
                  onChange={(e) => setSilkSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ── 6. GEÇİŞ OVERLAYLERİ (Tetiklendiğinde) ── */}
      {vortexActive && (
        <FluveaVortex
          onComplete={() => setVortexActive(false)}
          sourceColor={vortexSource}
          targetColor={vortexTarget}
          particleDensity={vortexDensity}
        />
      )}

      {nebulaActive && (
        <FluveaNebula
          isReady={nebulaReady}
          onDispersed={() => setNebulaActive(false)}
          colorScheme={nebulaScheme}
        />
      )}

      <FluveaBannerModal
        open={bannerActive}
        title={bannerTitle}
        badge="CANLI"
        message={bannerMessage}
        actionText="İncele"
        actionUrl="https://github.com/emrewyt"
        variant={bannerVariant}
        duration={8000}
        onClose={() => setBannerActive(false)}
      />

      {/* ── 7. ANA GÖVDE VE SAYFALAR (Wobble Bounce ile Sırayla Gelen Arayüz) ── */}
      {showMainUI && (
        <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          {/* ORTA ÜSTTE: STROKETEXT'Lİ "Fluvea Laboratory" VE AÇIKLAMA */}
          <div className="mb-10 w-full flex flex-col items-center animate-wobble-bounce-3">
            <div className="w-full max-w-2xl mx-auto mb-2">
              <FluveaCalligraphy
                text="Fluvea Laboratory"
                strokeColor="#c084fc"
                fillColor="#ffffff"
                fontSize={56}
                drawDuration={1.8}
              />
            </div>
            <p className="text-sm md:text-base font-light text-slate-300/90 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-wobble-bounce-4">
              {lang === 'tr'
                ? 'Şeffaflığın mimarisi, en güzel görsel şöleni'
                : 'The architecture of transparency, the finest visual feast'}
            </p>
          </div>

          {/* ── SAYFA / COMPONENT SEÇİM BUTONLARI (Alt alta sıralı) ── */}
          {activeTab === 'home' && (
            <div className="w-full max-w-md flex flex-col gap-4 mb-8">
              {/* Buton 1: Akışkan Cam'ı önizle */}
              <div className="animate-wobble-bounce-4">
                <FluveaGlass
                  width="100%"
                  height={58}
                  borderRadius={29}
                  glowVariant="purple"
                  className="border border-purple-400/40 w-full shadow-xl shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                  onClick={() => setActiveTab('glass')}
                >
                  <div className="flex items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-purple-300" />
                      <span className="text-sm font-bold tracking-wide uppercase text-white">
                        {lang === 'tr' ? "Akışkan Cam'ı önizle" : 'Preview Fluid Glass'}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-300" />
                  </div>
                </FluveaGlass>
              </div>

              {/* Buton 2: Bekleme ve Geçiş animasyonlar */}
              <div className="animate-wobble-bounce-5">
                <FluveaGlass
                  width="100%"
                  height={58}
                  borderRadius={29}
                  glowVariant="emerald"
                  className="border border-emerald-400/40 w-full shadow-xl shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                  onClick={() => setActiveTab('transitions')}
                >
                  <div className="flex items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                      <Orbit className="w-5 h-5 text-emerald-300" />
                      <span className="text-sm font-bold tracking-wide uppercase text-white">
                        {lang === 'tr' ? 'Bekleme ve Geçiş animasyonlar' : 'Waiting & Transition animations'}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-300" />
                  </div>
                </FluveaGlass>
              </div>

              {/* Buton 3: Pixel Card */}
              <div className="animate-wobble-bounce-6">
                <FluveaGlass
                  width="100%"
                  height={58}
                  borderRadius={29}
                  glowVariant="cyan"
                  className="border border-cyan-400/40 w-full shadow-xl shadow-cyan-950/40 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                  onClick={() => setActiveTab('pixelcard')}
                >
                  <div className="flex items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-cyan-300" />
                      <span className="text-sm font-bold tracking-wide uppercase text-white">
                        Pixel Card
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-300" />
                  </div>
                </FluveaGlass>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── SAYFA 1: AKIŞKAN CAM (FluveaGlass) CANLI OYNAMA ALANI ── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'glass' && (
            <div className="w-full max-w-4xl space-y-8 animate-wobble-bounce">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ana Ekrana Dön</span>
                </button>
                <h2 className="text-sm font-mono uppercase font-bold text-purple-300 tracking-wider">
                  FluveaGlass Canlı Özellik Laboratuvarı
                </h2>
              </div>

              {/* Canlı Bileşen Önizleme Alanı */}
              <div className="h-64 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl flex items-center justify-center p-8 relative overflow-hidden">
                <FluveaGlass
                  width={glassWidth}
                  height={glassHeight}
                  borderRadius={glassRadius}
                  glowVariant={glassGlow}
                  brightness={glassBrightness}
                  distortionScale={glassDistortion}
                  blur={glassBlur}
                  className="border border-white/30"
                >
                  <span className="text-sm md:text-base font-bold tracking-wider uppercase text-white drop-shadow">
                    Fluvea Glass
                  </span>
                </FluveaGlass>
              </div>

              {/* Canlı Oynanabilir Ayar Kontrolleri */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-[#0f0f1c]/80 border border-white/10 text-left">
                {/* Glow Variant Seçimi */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Parlama Varyantı (Glow)</span>
                  <div className="flex flex-wrap gap-2">
                    {['purple', 'emerald', 'cyan', 'gold', 'pink'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGlassGlow(g)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono uppercase border cursor-pointer ${
                          glassGlow === g ? 'bg-white/20 border-white text-white' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genişlik & Yükseklik */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Genişlik: {glassWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="140"
                      max="400"
                      value={glassWidth}
                      onChange={(e) => setGlassWidth(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Yükseklik: {glassHeight}px</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="120"
                      value={glassHeight}
                      onChange={(e) => setGlassHeight(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Kırılma (Distortion) & Yuvarlaklık */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Kırılma (Distortion): {glassDistortion}</span>
                    </div>
                    <input
                      type="range"
                      min="-300"
                      max="50"
                      value={glassDistortion}
                      onChange={(e) => setGlassDistortion(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Border Radius: {glassRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={glassRadius}
                      onChange={(e) => setGlassRadius(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── SAYFA 2: BEKLEME VE GEÇİŞ ANİMASYONLARI (Vortex, Nebula, Banner) ── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'transitions' && (
            <div className="w-full max-w-4xl space-y-8 animate-wobble-bounce">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ana Ekrana Dön</span>
                </button>
                <h2 className="text-sm font-mono uppercase font-bold text-emerald-300 tracking-wider">
                  Geçiş & Bekleme Efektleri Laboratuvarı
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* 1. FluveaVortex Kontrolü */}
                <div className="p-6 rounded-3xl bg-[#0f0f1c]/80 border border-purple-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Orbit className="w-4 h-4 text-purple-400" />
                      <span>FluveaVortex</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Parçacık girdabı ile sayfa geçiş efekti.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Yoğunluk: {vortexDensity}</span>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="700"
                      value={vortexDensity}
                      onChange={(e) => setVortexDensity(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>

                  <button
                    onClick={() => setVortexActive(true)}
                    className="w-full py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Vortex Başlat
                  </button>
                </div>

                {/* 2. FluveaNebula Kontrolü */}
                <div className="p-6 rounded-3xl bg-[#0f0f1c]/80 border border-emerald-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>FluveaNebula</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Yıldız tozu dağılan skeleton yükleyici.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 block">Renk Şeması:</span>
                    <div className="flex gap-2">
                      {['purple', 'emerald', 'cyan'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setNebulaScheme(s)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase border cursor-pointer ${
                            nebulaScheme === s ? 'bg-emerald-500/30 border-emerald-400 text-white' : 'border-white/10 text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setNebulaActive(true);
                      setNebulaReady(false);
                      setTimeout(() => setNebulaReady(true), 2000);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/50 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Nebula Başlat
                  </button>
                </div>

                {/* 3. FluveaBannerModal Kontrolü */}
                <div className="p-6 rounded-3xl bg-[#0f0f1c]/80 border border-cyan-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <span>FluveaBannerModal</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Geri sayımlı lüks bildirim cam paneli.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 block">Varyant:</span>
                    <div className="flex gap-2">
                      {['purple', 'emerald', 'cyan', 'gold'].map((b) => (
                        <button
                          key={b}
                          onClick={() => setBannerVariant(b)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase border cursor-pointer ${
                            bannerVariant === b ? 'bg-cyan-500/30 border-cyan-400 text-white' : 'border-white/10 text-slate-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setBannerActive(true)}
                    className="w-full py-2.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/50 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Bildirim Göster
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── SAYFA 3: PIXEL CARD (FluveaPixelCard) CANLI OYNAMA ALANI ── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'pixelcard' && (
            <div className="w-full max-w-4xl space-y-8 animate-wobble-bounce">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ana Ekrana Dön</span>
                </button>
                <h2 className="text-sm font-mono uppercase font-bold text-cyan-300 tracking-wider">
                  FluveaPixelCard Canlı Piksel Laboratuvarı
                </h2>
              </div>

              {/* Canlı Önizleme Kartı */}
              <div className="flex justify-center">
                <FluveaPixelCard
                  variant={pixelVariant}
                  gap={pixelGap}
                  speed={pixelSpeed}
                  className="w-full max-w-md h-72 p-8 flex flex-col justify-between text-left"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white uppercase">
                      {pixelVariant}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{pixelCardTitle}</h3>
                    <p className="text-xs text-slate-300/80 leading-relaxed">{pixelCardDesc}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Piksel Boşluğu: {pixelGap}px</span>
                    <span className="text-emerald-400 font-bold">CANLI CANVAS</span>
                  </div>
                </FluveaPixelCard>
              </div>

              {/* Kart Ayar Kaydırıcıları */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-[#0f0f1c]/80 border border-white/10 text-left">
                {/* Varyant */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Varyant Seçimi</span>
                  <div className="flex flex-wrap gap-2">
                    {['purple', 'blue', 'emerald', 'gold', 'pink'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setPixelVariant(v)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono uppercase border cursor-pointer ${
                          pixelVariant === v ? 'bg-white/20 border-white text-white' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Piksel Aralığı (Gap) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Piksel Aralığı (Gap): {pixelGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={pixelGap}
                    onChange={(e) => setPixelGap(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Parçacık Hızı */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Parçacık Hızı: {pixelSpeed}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={pixelSpeed}
                    onChange={(e) => setPixelSpeed(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ── 8. FOOTER (Instagram & GitHub Butonları) ── */}
      {showMainUI && (
        <footer className="py-6 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-20 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full animate-wobble-bounce-6">
          <span className="text-xs text-slate-400 font-mono">
            © 2026 Fluvea Studio • Developed by Emre (Wespcai)
          </span>

          <div className="flex items-center gap-4">
            {/* Instagram Butonu */}
            <a
              href="https://instagram.com/wespcai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:text-white transition-all text-xs font-mono shadow-sm group"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>@wespcai</span>
            </a>

            {/* GitHub Butonu */}
            <a
              href="https://github.com/emrewyt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-300 hover:text-white transition-all text-xs font-mono shadow-sm group"
            >
              <Github className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span>emrewyt</span>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}
