import { useEffect, useState } from 'react';
import { useActiveSection, useScrollProgress } from '../hooks/useActiveSection';
import type { Content, Lang } from '../types';
import { ArrowUpRight, Close, Globe, Menu } from './Icons';

interface NavbarProps {
  content: Content;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Navbar({ content, lang, onLangChange }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { nav, meta } = content;

  // Aşağı inilince menü yüzen cam bir çubuğa dönüşsün
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobil menü açıkken arkadaki sayfa kaymasın
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Menü açıkken Esc ile kapansın
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: '#about', label: nav.about },
    { href: '#experience', label: nav.experience },
    { href: '#services', label: nav.services },
    { href: '#projects', label: nav.projects },
    { href: '#lab', label: nav.lab },
    { href: '#education', label: nav.education },
    { href: '#faq', label: nav.faq },
    { href: '#contact', label: nav.contact },
  ];

  // Geniş ekranda menüde doğrudan görünen bağlantılar
  const inlineLinks = links.filter((l) => ['#about', '#experience', '#services', '#projects'].includes(l.href));

  // 'top' da izlenir ki en üste dönünce hiçbir bağlantı aktif görünmesin
  const active = useActiveSection(['top', ...links.map((l) => l.href.slice(1))]);
  const progress = useScrollProgress();
  const floating = scrolled && !open;

  const boxClass = 'flex h-11 items-center border border-neutral-700 transition hover:border-white';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            floating
              ? 'mt-3 h-16 w-[calc(100%-1.5rem)] border-white/10 bg-ink/60 px-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:mt-4 sm:w-[calc(100%-3rem)] sm:px-6'
              : 'mt-0 h-20 w-full border-transparent px-5 sm:px-10'
          }`}
        >
          {/* Logo: çerçeveli monogram + isim */}
          <a href="#top" onClick={() => setOpen(false)} className="group flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-500 font-serif text-lg italic text-white transition duration-500 group-hover:rotate-[8deg] group-hover:border-gold group-hover:text-gold">
              {meta.initials}
            </span>
            <span className="eyebrow truncate text-white">{meta.name}</span>
          </a>

          {/* Geniş ekran bağlantıları: aktif bölüm altın noktayla işaretlenir */}
          <nav className="eyebrow hidden items-center gap-7 lg:flex">
            {inlineLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive}
                  className={`underline-grow relative pb-1 ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <span
                    className={`absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gold transition duration-500 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                  />
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Dil seçimi */}
            <div className={`${boxClass} eyebrow gap-1.5 px-3 sm:px-4`}>
              <Globe className="hidden h-3.5 w-3.5 text-neutral-400 sm:block" />
              {(['tr', 'en'] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-neutral-600">/</span>}
                  <button
                    onClick={() => onLangChange(l)}
                    className={`uppercase transition ${lang === l ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    aria-pressed={lang === l}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>

            {/* İletişim (masaüstü) */}
            <a
              href="#contact"
              className={`${boxClass} fill-hover eyebrow group hidden gap-3 px-5 text-white duration-500 hover:text-black sm:flex`}
            >
              {nav.contact}
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Menü butonu */}
            <button
              onClick={() => setOpen(!open)}
              className={`${boxClass} w-11 justify-center text-white`}
              aria-label={open ? nav.close : nav.menu}
              aria-expanded={open}
            >
              <span className={`transition duration-300 ${open ? 'rotate-90' : ''}`}>
                {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </span>
            </button>
          </div>

          {/* Kaydırma ilerleme çizgisi */}
          <span
            className={`absolute -bottom-px left-0 h-px origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-opacity duration-500 ${
              floating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: '100%', transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Tam ekran menü */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-lg transition duration-500 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="aurora -right-40 top-1/4 h-[420px] w-[420px] bg-[rgba(217,179,140,0.10)]" />
        <nav className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-10">
          {links.map((link, i) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline gap-6 border-b border-line py-3 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:py-4 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
              >
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(3, '0')}</span>
                <span
                  className={`display text-4xl transition duration-500 group-hover:translate-x-3 group-hover:text-white sm:text-6xl ${
                    isActive ? 'text-white' : 'text-neutral-500'
                  }`}
                >
                  {link.label}
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 self-center text-gold opacity-0 transition duration-500 group-hover:opacity-100" />
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
