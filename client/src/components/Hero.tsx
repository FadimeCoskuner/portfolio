import type { Content } from '../types';
import { Emphasis } from './ui';

export default function Hero({ content }: { content: Content }) {
  const { meta, hero, nav } = content;

  const links = [
    { href: '#about', label: nav.about },
    { href: '#experience', label: nav.experience },
    { href: '#services', label: nav.services },
    { href: '#projects', label: nav.projects },
    { href: '#education', label: nav.education },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Arka plan: ızgara, üstten hafif ışık, parlayan çizgiler */}
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,179,140,0.10),transparent)]" />
      <span className="streak-h animate-drift-x pointer-events-none absolute left-[10%] top-[22%] w-40" />
      <span className="streak-v animate-drift-y pointer-events-none absolute right-[18%] top-[28%] h-32" />
      <span className="streak-v animate-drift-y pointer-events-none absolute bottom-[8%] left-[22%] h-24 [animation-delay:3s]" />
      <span className="animate-twinkle pointer-events-none absolute right-[17%] top-[64%] h-1.5 w-1.5 rounded-full bg-white" />
      <span className="animate-twinkle pointer-events-none absolute left-[23%] top-[21%] h-1 w-1 rounded-full bg-neutral-400 [animation-delay:2s]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-10">
        <p className="reveal display text-3xl text-neutral-400 sm:text-5xl">{hero.greeting}</p>

        <h1 className="reveal display mt-2 text-[clamp(3.5rem,13vw,10.5rem)] font-extralight leading-[0.95] text-white [transition-delay:100ms]">
          {meta.firstName} <em className="font-serif font-normal italic tracking-tight">{meta.lastName}</em>
        </h1>

        <div className="reveal relative mt-4 [transition-delay:200ms]">
          <p className="display text-3xl text-neutral-400 sm:text-5xl">{hero.role}</p>
          <span className="streak-h absolute -bottom-3 left-1/2 w-2/3 -translate-x-1/2 opacity-80" />
        </div>

        {/* Bölüm bağlantıları */}
        <nav className="reveal eyebrow mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-neutral-300 [transition-delay:300ms]">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              {i > 0 && <span className="text-neutral-700">/</span>}
              <a href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        {/* Kısa tanıtım: *isim* italik ve beyaz */}
        <p className="reveal mt-20 max-w-3xl text-lg leading-relaxed text-neutral-400 sm:text-2xl [&_em]:font-serif [&_em]:text-white [transition-delay:400ms]">
          <Emphasis text={hero.intro} />
        </p>

        <a href="#about" className="eyebrow mt-16 flex flex-col items-center gap-3 text-neutral-500 transition hover:text-white">
          {hero.scroll}
          <span className="h-12 w-px bg-gradient-to-b from-neutral-500 to-transparent" />
        </a>
      </div>
    </section>
  );
}
