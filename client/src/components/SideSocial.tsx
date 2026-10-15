import type { Content } from '../types';
import { GitHub, LinkedIn, Mail } from './Icons';

// Sol altta sabit duran sosyal bağlantılar (sadece geniş ekranda)
export default function SideSocial({ content }: { content: Content }) {
  const { meta } = content;
  const links = [
    { href: meta.github, label: 'GitHub', icon: <GitHub className="h-4 w-4" />, external: true },
    { href: meta.linkedin, label: 'LinkedIn', icon: <LinkedIn className="h-4 w-4" />, external: true },
    { href: `mailto:${meta.email}`, label: 'E-posta', icon: <Mail className="h-4 w-4" />, external: false },
  ];

  return (
    <div className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-3 xl:flex">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
          aria-label={link.label}
          className="flex h-10 w-10 items-center justify-center border border-neutral-800 bg-ink text-neutral-400 transition hover:border-white hover:text-white"
        >
          {link.icon}
        </a>
      ))}
      <span className="mt-1 h-24 w-px bg-gradient-to-b from-neutral-600 to-transparent" />
    </div>
  );
}
