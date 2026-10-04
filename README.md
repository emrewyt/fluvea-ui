# @fluvea/ui — Fluvea Studio Luxury UI Component Library

Apple, Steam ve Xbox seviyesinde felsefi ve lüks bir kullanıcı deneyimi sunmak üzere tasarlanmış; **sıvı cam kırılmaları**, **WebGL kumaş simülasyonları**, **hat sanatı tipografisi** ve **parçacık fiziği** içeren modern React UI kütüphanesi.

---

## 📦 Kurulum

```bash
npm install @fluvea/ui
# veya
pnpm add @fluvea/ui
```

### Stilleri Dahil Etme
Projenizin ana giriş noktasına (`main.jsx`, `App.jsx` veya `layout.tsx`) kütüphane stillerini ekleyin:

```jsx
import '@fluvea/ui/dist/style.css';
```

---

## 🎨 Bileşenler & Kullanım Örnekleri

### 1. `FluveaGlass` (Sıvı Cam & Caustic Gleam Yüzeyleri)
Fizik tabanlı optik kırılma (displacement), iç haleler ve renkli parlama varyantları sunar:

```jsx
import { FluveaGlass } from '@fluvea/ui';

export function ActionButton() {
  return (
    <FluveaGlass
      width={220}
      height={52}
      borderRadius={26}
      glowVariant="purple" // 'purple' | 'green' | 'emerald' | 'cyan' | 'gold' | 'pink'
      onClick={() => console.log('Tıklandı!')}
    >
      <span className="text-sm font-bold uppercase tracking-wider text-white">
        Başlat
      </span>
    </FluveaGlass>
  );
}
```

### 2. `FluveaSilk` (WebGL Akışkan Kumaş / İpek Simülatörü)
Three.js shader motoruyla arka planda yaşayan ipeksi dalgalanma efekti:

```jsx
import { FluveaSilk } from '@fluvea/ui';

export function BackgroundHero() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <FluveaSilk
        color="#6b4987"
        speed={2.0}
        waveAmp={0.035}
        foldDepth={0.42}
      />
    </div>
  );
}
```

### 3. `FluveaCalligraphy` (Hat Sanatı Çizgisel Tipografi)
GSAP destekli, prestij başlıklar için çizilerek beliren kaligrafi animasyonu:

```jsx
import { FluveaCalligraphy } from '@fluvea/ui';

export function HeroTitle() {
  return (
    <FluveaCalligraphy
      text="FLUVEA STUDIO"
      strokeColor="#c084fc"
      fillColor="#ffffff"
      fontSize={64}
      drawDuration={1.8}
      trigger="mount"
    />
  );
}
```

### 4. `FluveaNebula` (Yıldız Tozu Partikül Yükleyicisi)
Geleneksel yükleme çubukları yerine dağılarak yok olan uzay tozu skeleton ekranı:

```jsx
import { FluveaNebula } from '@fluvea/ui';

export function LoadingScreen({ isLoading, onFinished }) {
  return (
    <FluveaNebula
      isReady={!isLoading}
      onDispersed={onFinished}
      colorScheme="purple"
    />
  );
}
```

### 5. `FluveaVortex` (Kozmik Partikül Girdap Geçişi)
Sayfa ve ekran geçişlerinde arayüzü partiküllere çevirip dönerek yok eden efekt:

```jsx
import { FluveaVortex } from '@fluvea/ui';

export function PageTransition({ onTransitionEnd }) {
  return (
    <FluveaVortex
      onComplete={onTransitionEnd}
      sourceColor="#c084fc"
      targetColor="#10b981"
    />
  );
}
```

### 6. `FluveaPixelCard` (Cyberpunk İnteraktif Kart)
Fare imlecine duyarlı, kıvılcım saçan interaktif piksel kart:

```jsx
import { FluveaPixelCard } from '@fluvea/ui';

export function FeatureCard() {
  return (
    <FluveaPixelCard variant="emerald" className="p-6 h-64">
      <h3 className="text-lg font-bold text-white">Güvenlik Motoru</h3>
      <p className="text-xs text-slate-300">Fluvea Studio koruma kalkanı devrede.</p>
    </FluveaPixelCard>
  );
}
```

### 7. `FluveaBannerModal` (Lüks Köşe Bildirim Paneli)
Ekran köşesinde lüks cam tasarımıyla yumuşakça beliren ve geri sayımlı kapanan bildirim:

```jsx
import { FluveaBannerModal } from '@fluvea/ui';

export function Notification() {
  return (
    <FluveaBannerModal
      open={true}
      title="Sistem Bildirimi"
      badge="GÜNCELLEME"
      message="Yeni sürüm özellikleri başarıyla yüklendi."
      variant="purple"
      duration={8000}
      onClose={() => {}}
    />
  );
}
```

### 8. `FluveaTitleBar` (Çerçevesiz Masaüstü Pencere Çubuğu)
Electron / Tauri gibi çerçevesiz pencereler için modern başlık ve kontrol çubuğu:

```jsx
import { FluveaTitleBar } from '@fluvea/ui';

export function AppHeader() {
  return (
    <FluveaTitleBar
      title="Fluvea Launcher"
      onMinimize={() => window.electronAPI.minimize()}
      onMaximize={() => window.electronAPI.maximize()}
      onClose={() => window.electronAPI.close()}
    />
  );
}
```

---

## 🛠️ Yerel Geliştirme ve Playground

Önizleme ve test sandbox ekranını başlatmak için:

```bash
cd "C:\Users\®®Emre®®\Desktop\WinProject\! Projeler\Fluvea\Fluvea-UI"
npm run dev
```

Paketi yeniden derlemek için:

```bash
npm run build
```

---

© 2026 **Fluvea Studio**
# Sevgilerle, ***[Wespcai.](https://instagram.com/wespcai)***
