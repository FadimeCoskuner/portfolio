import type { Content } from '../types';
import { Section } from './ui';

export default function About({ content }: { content: Content }) {
  const { about, meta } = content;
  const { card } = about;

  return (
    <Section id="about" index="001" label={about.label} title={about.title}>
      <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <div className="reveal space-y-7 text-lg leading-relaxed text-neutral-400">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {/* Kod editörü görünümlü profil kartı */}
        <div className="reveal min-w-0 border border-neutral-800 bg-neutral-950 [transition-delay:150ms]">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span lang="en" className="eyebrow text-neutral-400">{card.fileName}</span>
            <span className="eyebrow text-neutral-600">TS</span>
          </div>

          <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7">
            <code>
              <Line n={1}>
                <span className="text-violet-400">const</span> <span className="text-sky-300">fadime</span>{' '}
                <span className="text-neutral-500">=</span> <span className="text-neutral-300">{'{'}</span>
              </Line>
              {card.fields.map((field, i) => (
                <Line key={field.key} n={i + 2}>
                  {'  '}
                  <span className="text-sky-300">{field.key}</span>
                  <span className="text-neutral-500">: </span>
                  <span className={field.value === 'true' ? 'text-gold' : 'text-emerald-300'}>{field.value}</span>
                  <span className="text-neutral-500">,</span>
                </Line>
              ))}
              <Line n={card.fields.length + 2}>
                <span className="text-neutral-300">{'}'}</span> <span className="italic text-neutral-600">{card.comment}</span>
              </Line>
            </code>
          </pre>

          <div className="eyebrow border-t border-neutral-800 px-4 py-3.5 text-neutral-500">
            {card.footer} · <span lang="en">{meta.email}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Satır numaralı kod satırı
function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="block">
      <span className="mr-5 inline-block w-5 select-none text-right text-neutral-700">{String(n).padStart(2, '0')}</span>
      {children}
    </span>
  );
}
