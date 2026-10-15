import { useState } from 'react';
import type { Content } from '../types';
import { Plus } from './Icons';
import { Section } from './ui';

// Sık sorulan sorular: tıklanınca açılan / kapanan satırlar
export default function Faq({ content }: { content: Content }) {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // ilk soru açık başlar

  return (
    <Section id="faq" index="007" label={faq.label} title={faq.title}>
      <div className="border-t border-line">
        {faq.items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className="reveal border-b border-line">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="group flex w-full items-center gap-6 py-8 text-left sm:gap-10"
                aria-expanded={open}
              >
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(3, '0')}</span>
                <span className="display flex-1 text-2xl text-neutral-200 transition group-hover:text-white sm:text-3xl">{item.q}</span>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                    open ? 'rotate-45 border-white text-white' : 'border-neutral-700 text-neutral-400 group-hover:border-neutral-400'
                  }`}
                >
                  <Plus />
                </span>
              </button>

              {/* grid-rows hilesi: yüksekliği bilinmeyen içeriği yumuşakça açar */}
              <div className={`grid transition-[grid-template-rows] duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="max-w-3xl pb-10 pl-[calc(1.5rem+2ch)] leading-relaxed text-neutral-400 sm:pl-[calc(2.5rem+3ch)]">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
