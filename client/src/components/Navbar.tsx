import { useEffect, useState } from 'react';
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

  // Aşağı inilince menünün arka planı belirginleşsin
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

  const boxClass = 'flex h-11 items-center border border-neutral-700 transition hover:border-white';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-10">
          {/* Logo: çerçeveli monogram + isim */}
          <a href="#top" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-500 font-serif text-lg italic text-white">
              {meta.initials}
            </span>
            <span className="eyebrow truncate text-white">{meta.name}</span>
          </a>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Dil seçimi */}
            <div className={`${boxClass} eyebrow gap-1.5 px-3 sm:px-4`}>
              <Globe className="hidden h-3.5 w-3.5 text-neutral-400 sm:block" />
              {(['tr', 'en'] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-neutral-600">/</span>}
                  <button
                    onClick={() => onLangChange(l)}
                    className={`uppercase ${lang === l ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    aria-pressed={lang === l}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>

            {/* İletişim (masaüstü) */}
            <a href="#contact" className={`${boxClass} eyebrow hidden gap-3 px-5 text-white sm:flex`}>
              {nav.contact}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Menü butonu */}
            <button
              onClick={() => setOpen(!open)}
              className={`${boxClass} w-11 justify-center text-white`}
              aria-label={open ? nav.close : nav.menu}
              aria-expanded={open}
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Tam ekran menü */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-lg transition duration-500 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="grid-bg absolute inset-0" />
        <nav className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-10">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-6 border-b border-line py-3 sm:py-4"
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
            >
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(3, '0')}</span>
              <span className="display text-4xl text-neutral-400 transition group-hover:text-white sm:text-6xl">
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
