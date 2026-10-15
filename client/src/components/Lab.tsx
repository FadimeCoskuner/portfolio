import type { Content } from '../types';
import { ArrowUpRight } from './Icons';
import { Section, TagLine } from './ui';

// TNC Group eğitimindeki projelerin GitHub reposu.
// Yeni bir proje eklemek için content.*.json içindeki "lab.items" listesine eklemen yeterli.
const REPO_URL = 'https://github.com/FadimeCoskuner/tnc-group/tree/main';

export default function Lab({ content }: { content: Content }) {
  const { lab } = content;

  return (
    <Section id="lab" index="005" label={lab.label} title={lab.title}>
      <p className="reveal -mt-6 mb-14 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:-mt-12">{lab.subtitle}</p>

      <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {lab.items.map((item, i) => (
          <a
            key={item.folder}
            href={`${REPO_URL}/${item.folder}`}
            target="_blank"
            rel="noreferrer"
            className="reveal group flex flex-col border-b border-r border-line p-7 transition hover:bg-white/[0.02] sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-600">{String(i + 1).padStart(2, '0')}</span>
              <span className={`eyebrow flex items-center gap-2 ${item.status === 'done' ? 'text-emerald-400' : 'text-gold'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'done' ? 'bg-emerald-400' : 'animate-twinkle bg-gold'}`} />
                {lab.status[item.status]}
              </span>
            </div>

            <h3 className="display mt-10 text-3xl text-white">{item.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>

            <div className="mt-8 flex items-end justify-between gap-4">
              <TagLine tags={item.tags} />
              <span className="eyebrow flex shrink-0 items-center gap-2 text-neutral-500 transition group-hover:text-white">
                {lab.repo}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
