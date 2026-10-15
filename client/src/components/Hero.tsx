import type { CSSProperties } from 'react';
import type { Content } from '../types';
import { ArrowUpRight } from './Icons';
import { Emphasis } from './ui';

// Kelimeyi harflere böler; her harf CSS'teki .char animasyonuyla sırayla belirir
function SplitChars({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span aria-hidden>
      {Array.from(text).map((char, i) => (
        <span key={i} className="char" style={{ '--i': i + offset } as CSSProperties}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ content }: { content: Content }) {
  const { meta, hero, nav } = content;

  const links = [
    { href: '#about', label: nav.about },
    { href: '#experience', label: nav.experience },
    { href: '#services', label: nav.services },
    { href: '#projects', label: nav.projects },
    { href: '#education', label: nav.education },
  ];

  // Fareyle hafifçe kayan katmanlar (--px / --py usePointer hook'undan gelir)
  const parallax = (depth: number): CSSProperties => ({
    translate: `calc(var(--px, 0) * ${depth}px) calc(var(--py, 0) * ${depth}px)`,
    transition: 'translate 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Arka plan: aurora ışıkları, ızgara, parlayan çizgiler */}
      <div className="pointer-events-none absolute inset-0" style={parallax(-30)}>
        <div className="aurora animate-aurora-a -top-40 left-[8%] h-[520px] w-[520px] bg-[rgba(217,179,140,0.16)]" />
        <div className="aurora animate-aurora-b right-[4%] top-[18%] h-[460px] w-[460px] bg-[rgba(140,170,230,0.10)]" />
        <div className="aurora animate-aurora-a bottom-[-10%] left-[38%] h-[380px] w-[600px] bg-[rgba(217,179,140,0.08)] [animation-delay:-9s]" />
      </div>
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0" style={parallax(18)}>
        <span className="streak-h animate-drift-x absolute left-[10%] top-[22%] w-40" />
        <span className="streak-v animate-drift-y absolute right-[18%] top-[28%] h-32" />
        <span className="streak-v animate-drift-y absolute bottom-[8%] left-[22%] h-24 [animation-delay:3s]" />
        <span className="animate-twinkle absolute right-[17%] top-[64%] h-1.5 w-1.5 rounded-full bg-white" />
        <span className="animate-twinkle absolute left-[23%] top-[21%] h-1 w-1 rounded-full bg-neutral-400 [animation-delay:2s]" />
      </div>
      {/* Alttan zemine yumuşak geçiş */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-10">
        {/* Konum rozeti */}
        <p className="reveal eyebrow mb-10 inline-flex items-center gap-3 border border-neutral-800 bg-white/[0.02] px-4 py-2 text-neutral-400 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          {meta.location}
        </p>

        <p className="reveal display text-3xl text-neutral-400 sm:text-5xl">{hero.greeting}</p>

        <h1
          aria-label={`${meta.firstName} ${meta.lastName}`}
          className="display mt-2 text-[clamp(3.5rem,13vw,10.5rem)] font-extralight leading-[0.95] text-white"
        >
          <SplitChars text={meta.firstName} />{' '}
          {/* Soyadı tek parça belirir; içindeki parıltı harflere bölünürse bazı tarayıcılarda kaybolur */}
          <span aria-hidden className="char" style={{ '--i': meta.firstName.length + 1 } as CSSProperties}>
            <em className="shimmer font-serif font-normal italic tracking-tight">{meta.lastName}</em>
          </span>
        </h1>

        <div className="reveal relative mt-4 [transition-delay:500ms]">
          <p className="display text-3xl text-neutral-400 sm:text-5xl">{hero.role}</p>
          <span className="streak-h absolute -bottom-3 left-1/2 w-2/3 -translate-x-1/2 opacity-80" />
        </div>

        {/* Kısa tanıtım: *isim* italik ve beyaz */}
        <p className="reveal mt-14 max-w-3xl text-lg leading-relaxed text-neutral-400 sm:text-2xl [&_em]:font-serif [&_em]:text-white [transition-delay:600ms]">
          <Emphasis text={hero.intro} />
        </p>

        {/* Ana butonlar */}
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-3 [transition-delay:700ms]">
          <a
            href="#projects"
            className="eyebrow group inline-flex items-center gap-3 bg-white px-7 py-4 text-black shadow-[0_0_40px_-8px_rgba(217,179,140,0.55)] transition hover:bg-gold"
          >
            {nav.projects}
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="fill-hover eyebrow group inline-flex items-center gap-3 border border-neutral-700 bg-white/[0.02] px-7 py-4 text-white backdrop-blur-sm transition-colors duration-500 hover:border-white hover:text-black"
          >
            {nav.contact}
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Bölüm bağlantıları */}
        <nav className="reveal eyebrow mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-neutral-500 [transition-delay:800ms]">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              {i > 0 && <span className="text-neutral-800">/</span>}
              <a href={link.href} className="underline-grow pb-1 hover:text-white">
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        {/* Kaydırma göstergesi */}
        <a href="#about" className="eyebrow mt-16 flex flex-col items-center gap-4 text-neutral-500 transition hover:text-white">
          {hero.scroll}
          <span className="relative flex h-12 w-px justify-center overflow-hidden bg-neutral-800">
            <span className="animate-scroll-dot absolute top-0 h-2 w-px bg-gold" />
          </span>
        </a>
      </div>
    </section>
  );
}
