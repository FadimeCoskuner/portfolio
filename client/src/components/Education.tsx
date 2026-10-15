import type { Content } from '../types';
import { Section } from './ui';

export default function Education({ content }: { content: Content }) {
  const { education } = content;

  return (
    <Section id="education" index="006" label={education.label} title={education.title}>
      {/* Dereceler */}
      <div className="border-t border-line">
        {education.items.map((item) => (
          <div key={item.level} className="reveal grid gap-4 border-b border-line py-10 lg:grid-cols-[220px_1fr_auto] lg:items-baseline lg:gap-12">
            <p className="eyebrow text-neutral-500">{item.period}</p>
            <div>
              <h3 className="display text-3xl text-white sm:text-5xl">
                {item.degree} <em className="font-serif text-gold">{item.level}</em>
              </h3>
              <p className="mt-3 text-neutral-400">{item.school}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Kurslar */}
      <div className="mt-24">
        <p className="reveal eyebrow mb-8 text-neutral-500">{education.coursesTitle}</p>
        <div className="grid gap-x-16 border-t border-line sm:grid-cols-2">
          {education.courses.map((course) => (
            <div key={course.name} className="reveal flex items-baseline justify-between gap-6 border-b border-line py-5">
              <span>
                <span className="text-lg text-white">{course.name}</span>
                <span className="eyebrow ml-4 text-neutral-500">{course.org}</span>
              </span>
              <span className="font-mono text-xs text-neutral-500">{course.period}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
