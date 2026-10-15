import type { Content } from '../types';
import { OutlineLink, Section } from './ui';

// Ne yapıyorum: numaralı satırlar (numara | başlık | açıklama)
export default function Services({ content }: { content: Content }) {
  const { services, nav } = content;

  return (
    <Section id="services" index="003" label={services.label} title={services.title}>
      <div className="border-t border-line">
        {services.items.map((item, i) => (
          <div
            key={item.title}
            className="reveal group grid gap-4 border-b border-line py-10 sm:grid-cols-[80px_1fr] lg:grid-cols-[160px_1fr_1.4fr] lg:gap-10 lg:py-14"
          >
            <span className="eyebrow pt-2 text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display text-3xl text-white transition group-hover:translate-x-2 sm:text-4xl">{item.title}</h3>
            <p className="leading-relaxed text-neutral-400 sm:col-start-2 lg:col-start-auto">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Teknoloji kutucukları + iletişim */}
      <div className="reveal mt-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {services.tags.map((tag) => (
            <span key={tag} lang="en" className="eyebrow border border-neutral-800 px-3 py-2 text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
        <OutlineLink href="#contact">{nav.contact}</OutlineLink>
      </div>
    </Section>
  );
}
