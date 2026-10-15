import type { Content } from '../types';
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons';

export default function Footer({ content }: { content: Content }) {
  const { meta, footer, nav } = content;

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 sm:px-10">
        {/* Dev isim */}
        <p className="select-none text-center font-extralight leading-[0.8] tracking-[-0.06em] text-white text-[clamp(5rem,22vw,20rem)]">
          {footer.bigWord}
        </p>

        <div className="mt-16 grid items-end gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_auto]">
          <p className="display text-4xl text-neutral-400 sm:text-6xl">
            {footer.lineStart} <em className="font-serif text-white">{footer.lineEmphasis}</em>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="eyebrow inline-flex items-center gap-3 border border-white bg-white px-6 py-4 text-black transition hover:bg-transparent hover:text-white"
            >
              {nav.contact} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="#top" className="eyebrow inline-flex items-center border border-neutral-700 px-6 py-4 text-white transition hover:border-white">
              {footer.backToTop} ↑
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line py-8 sm:flex-row">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-neutral-600 font-serif text-sm italic text-white">
              {meta.initials}
            </span>
            <span className="eyebrow text-neutral-500">© {new Date().getFullYear()} {meta.name}</span>
          </span>
          <span lang="en" className="eyebrow text-center text-neutral-600">{footer.built}</span>
          <span className="flex gap-2">
            {[
              { href: meta.github, label: 'GitHub', icon: <GitHub className="h-4 w-4" /> },
              { href: meta.linkedin, label: 'LinkedIn', icon: <LinkedIn className="h-4 w-4" /> },
              { href: `mailto:${meta.email}`, label: 'E-posta', icon: <Mail className="h-4 w-4" /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={link.label}
                className="flex h-9 w-9 items-center justify-center border border-neutral-800 text-neutral-400 transition hover:border-white hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
