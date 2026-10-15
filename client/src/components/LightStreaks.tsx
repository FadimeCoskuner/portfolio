import type { CSSProperties } from 'react';

// Sayfa boyunca arka planda duran ince kılavuz çizgiler ve üzerlerinde kayan ışık kuyrukları.
// Ekrana sabittir (fixed); içerik bunun üstünden kayar. Ayarlar: konum, süre, gecikme, yön, renk.
const vertical = [
  { left: '0%', dur: 14, delay: 0, up: false, gold: false },
  { left: '33.333%', dur: 18, delay: -7, up: true, gold: true, wide: true },
  { left: '66.666%', dur: 16, delay: -3, up: false, gold: false, wide: true },
  { left: '100%', dur: 20, delay: -12, up: true, gold: true },
];

const horizontal = [
  { top: '28%', dur: 22, delay: -4, gold: false },
  { top: '72%', dur: 26, delay: -15, gold: true },
];

export default function LightStreaks() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dikey çizgiler sayfa içeriğinin kenarlarıyla hizalı */}
      <div className="relative mx-auto h-full max-w-7xl px-5 sm:px-10">
        <div className="relative h-full">
          {vertical.map((line, i) => (
            <div
              key={i}
              className={`guide-v absolute inset-y-0 ${line.wide ? 'hidden md:block' : ''}`}
              style={{ left: line.left }}
            >
              <span
                className={`comet-v ${line.gold ? 'comet-gold' : ''}`}
                style={
                  {
                    '--dur': `${line.dur}s`,
                    '--delay': `${line.delay}s`,
                    animationDirection: line.up ? 'reverse' : 'normal',
                  } as CSSProperties
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Yatay ışıklar: arada bir ekranı soldan sağa geçer */}
      {horizontal.map((line, i) => (
        <span
          key={i}
          className={`comet-h ${line.gold ? 'comet-gold' : ''}`}
          style={{ top: line.top, '--dur': `${line.dur}s`, '--delay': `${line.delay}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}
