import type { Content } from '../types';
import { Section, TagLine } from './ui';

export default function Experience({ content }: { content: Content }) {
  const { experience } = content;

  return (
    <Section id="experience" index="002" label={experience.label} title={experience.title}>
      <div className="border-t border-line">
        {experience.items.map((item) => (
          <article
            key={item.company}
            className="reveal grid gap-6 border-b border-line py-12 lg:grid-cols-[220px_1fr_1.3fr] lg:gap-12 lg:py-16"
          >
            <p className="eyebrow pt-2 text-neutral-500">{item.period}</p>

            <div>
              <h3 className="display text-3xl text-white sm:text-4xl">{item.company}</h3>
              <p className="eyebrow mt-4 text-neutral-500">{item.org}</p>
              <p className="mt-3 font-serif text-2xl italic text-gold">{item.role}</p>
            </div>

            <div>
              <ul className="space-y-4 leading-relaxed text-neutral-400">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4">
                    <span className="mt-3 h-px w-4 shrink-0 bg-neutral-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <TagLine tags={item.tags} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
