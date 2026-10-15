import type { ProjectKind } from '../types';

// Proje görseli yoksa, projenin türüne göre kodla çizilmiş sade bir arayüz önizlemesi.
// panel: yönetim paneli · web: web sitesi · sheet: tablo tabanlı otomasyon portalı

const bar = 'rounded-sm bg-neutral-800';

export default function Mockup({ kind }: { kind: ProjectKind }) {
  if (kind === 'web') return <WebMockup />;
  if (kind === 'sheet') return <SheetMockup />;
  return <PanelMockup />;
}

function PanelMockup() {
  return (
    <div className="flex h-full">
      {/* Kenar menü */}
      <div className="hidden w-[18%] flex-col gap-3 border-r border-neutral-800 p-4 sm:flex">
        <div className="mb-3 h-5 w-5 rounded-full border border-gold/60" />
        {[70, 55, 80, 60, 45, 65].map((w, i) => (
          <div key={i} className={`h-2 ${bar} ${i === 1 ? '!bg-gold/50' : ''}`} style={{ width: `${w}%` }} />
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* İstatistik kartları */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {['128', '42', '1.2K', '96%'].map((value, i) => (
            <div key={value} className="border border-neutral-800 p-2 sm:p-3">
              <div className={`mb-2 h-1.5 w-1/2 ${bar}`} />
              <p className={`font-mono text-[10px] sm:text-sm ${i === 0 ? 'text-gold' : 'text-neutral-300'}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className="relative flex-1 border border-neutral-800">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9b38c" stopOpacity="0.25" />
                <stop offset="1" stopColor="#d9b38c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80 L30 70 L60 74 L90 52 L120 58 L150 38 L180 44 L210 26 L240 32 L270 18 L300 22 L300 100 L0 100 Z" fill="url(#area)" />
            <path d="M0 80 L30 70 L60 74 L90 52 L120 58 L150 38 L180 44 L210 26 L240 32 L270 18 L300 22" fill="none" stroke="#d9b38c" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Tablo satırları */}
        <div className="space-y-2">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-3 border-b border-neutral-800/70 pb-2">
              <div className="h-3 w-3 rounded-full bg-neutral-800" />
              <div className={`h-1.5 w-1/3 ${bar}`} />
              <div className={`h-1.5 w-1/5 ${bar}`} />
              <div className="ml-auto h-3 w-10 rounded-full border border-emerald-500/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebMockup() {
  return (
    <div className="flex h-full flex-col">
      {/* Üst menü */}
      <div className="flex items-center gap-4 border-b border-neutral-800 px-5 py-3">
        <div className="h-3 w-14 rounded-sm bg-neutral-600" />
        <div className="ml-auto hidden gap-3 sm:flex">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 w-10 ${bar}`} />
          ))}
        </div>
        <div className="font-mono text-[9px] text-neutral-500">TR · EN</div>
      </div>

      {/* Hero alanı */}
      <div className="relative flex flex-1 items-center overflow-hidden px-6 sm:px-8">
        <div className="absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,179,140,0.22),transparent)]" />
        <div className="absolute right-[12%] top-1/2 hidden h-28 w-28 -translate-y-1/2 rotate-45 border border-gold/40 sm:block" />
        <div className="relative w-3/5 space-y-3">
          <div className="h-3 w-4/5 rounded-sm bg-neutral-300" />
          <div className="h-3 w-3/5 rounded-sm bg-neutral-300" />
          <div className={`mt-4 h-1.5 w-full ${bar}`} />
          <div className={`h-1.5 w-4/5 ${bar}`} />
          <div className="mt-5 inline-block border border-gold/60 px-4 py-1.5 font-mono text-[9px] text-gold">KEŞFET →</div>
        </div>
      </div>

      {/* Kartlar */}
      <div className="hidden grid-cols-3 gap-2 border-t border-neutral-800 p-4 sm:grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 border border-neutral-800 p-3">
            <div className="h-6 bg-neutral-900" />
            <div className={`h-1.5 w-3/4 ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SheetMockup() {
  const cols = ['A', 'B', 'C', 'D', 'E'];
  return (
    <div className="flex h-full flex-col">
      {/* Araç çubuğu */}
      <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3">
        <div className="h-3 w-3 rounded-sm bg-emerald-500/70" />
        <div className={`h-1.5 w-24 ${bar}`} />
        <div className="ml-auto flex gap-2 font-mono text-[9px]">
          <span className="border border-neutral-700 px-2 py-0.5 text-neutral-400">PDF</span>
          <span className="border border-gold/50 px-2 py-0.5 text-gold">DRIVE</span>
        </div>
      </div>

      {/* Tablo */}
      <div className="flex-1 overflow-hidden font-mono text-[9px] text-neutral-500">
        <div className="grid grid-cols-[28px_repeat(5,1fr)] border-b border-neutral-800 bg-neutral-900/60">
          <span />
          {cols.map((c) => (
            <span key={c} className="border-l border-neutral-800 px-2 py-1.5">{c}</span>
          ))}
        </div>
        {Array.from({ length: 9 }).map((_, row) => (
          <div key={row} className="grid grid-cols-[28px_repeat(5,1fr)] border-b border-neutral-800/70">
            <span className="px-2 py-2 text-neutral-600">{row + 1}</span>
            {cols.map((c, ci) => (
              <span key={c} className="flex items-center border-l border-neutral-800/70 px-2 py-2">
                {ci === 4 ? (
                  <span className={`h-2 w-8 rounded-full ${row % 3 === 0 ? 'bg-gold/50' : row % 3 === 1 ? 'bg-emerald-500/40' : 'bg-neutral-700'}`} />
                ) : (
                  <span className="h-1.5 rounded-sm bg-neutral-800" style={{ width: `${40 + ((row * 7 + ci * 13) % 50)}%` }} />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
