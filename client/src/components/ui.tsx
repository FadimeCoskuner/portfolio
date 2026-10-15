import type { ReactNode } from 'react';
import { ArrowUpRight } from './Icons';

// Metindeki *yıldız* arasındaki kısımları <em> yapar: "Merhaba *dünya*" -> Merhaba <em>dünya</em>
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
    </>
  );
}

// "001 —— HAKKIMDA" etiketi
export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="eyebrow flex items-center gap-5 text-neutral-400">
      <span className="text-white">{index}</span>
      <span className="h-px w-10 bg-neutral-600" />
      <span>{label}</span>
    </p>
  );
}

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}

// Tüm bölümlerin ortak iskeleti: etiket + dev başlık + içerik, üstte ince çizgi
export function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
        <div className="reveal">
          <Eyebrow index={index} label={label} />
          <h2 className="display mt-10 max-w-5xl text-[2.6rem] text-neutral-400 sm:text-6xl lg:text-7xl">
            <Emphasis text={title} />
          </h2>
        </div>
        <div className="mt-16 sm:mt-24">{children}</div>
      </div>
    </section>
  );
}

// Köşeli, ince çerçeveli buton/bağlantı (hover'da soldan beyazla dolar)
export function OutlineLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="fill-hover eyebrow group inline-flex items-center gap-3 border border-neutral-700 px-6 py-4 text-white transition-colors duration-500 hover:border-white hover:text-black"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

// Teknoloji listesi: "REACT · TYPESCRIPT · TAILWIND CSS"
export function TagLine({ tags }: { tags: string[] }) {
  // lang="en": büyük harfe çevrilirken İngilizce kelimelerde "İ" oluşmasın (TAİLWİND yerine TAILWIND)
  return (
    <p lang="en" className="eyebrow leading-6 text-neutral-500">
      {tags.join(" · ")}
    </p>
  );
}
