import { useState } from 'react';
import type { Content, FeaturedProject } from '../types';
import { ArrowUpRight } from './Icons';
import Mockup from './Mockup';
import { OutlineLink, Section, TagLine } from './ui';

export default function Projects({ content }: { content: Content }) {
  const { projects } = content;

  return (
    <Section id="projects" index="004" label={projects.label} title={projects.title}>
      <div className="border-t border-line">
        {projects.featured.map((project, i) => (
          <FeaturedRow key={project.id} project={project} index={i} visitLabel={projects.visit} teamNote={projects.teamNote} />
        ))}
      </div>

      {/* Diğer çalışmalar */}
      <div className="mt-24">
        <p className="reveal eyebrow mb-8 text-neutral-500">{projects.othersTitle}</p>
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {projects.others.map((project) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display text-2xl text-white">{project.title}</h3>
                  {project.url && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  )}
                </div>
                <p lang="en" className="eyebrow mt-3 text-neutral-500">{project.meta}</p>
                <p className="mt-5 text-sm leading-relaxed text-neutral-400">{project.description}</p>
                {project.badge && (
                  <span className="eyebrow mt-6 inline-block border border-gold/40 px-3 py-1.5 text-gold">★ {project.badge}</span>
                )}
              </>
            );
            const className = 'reveal group block border-b border-r border-line p-7 transition hover:bg-white/[0.02] sm:p-8';

            return project.url ? (
              <a key={project.title} href={project.url} target="_blank" rel="noreferrer" className={className}>
                {inner}
              </a>
            ) : (
              <div key={project.title} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

interface FeaturedRowProps {
  project: FeaturedProject;
  index: number;
  visitLabel: string;
  teamNote: string;
}

// Öne çıkan proje: solda bilgiler, sağda görsel (görsel yoksa çizilmiş arayüz)
function FeaturedRow({ project, index, visitLabel, teamNote }: FeaturedRowProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const host = project.url ? new URL(project.url).host : project.meta.split('·')[0].trim();

  return (
    <article className="grid gap-12 border-b border-line py-16 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:py-24">
      <div className="reveal flex flex-col">
        <p className="eyebrow text-neutral-500">
          {String(index + 1).padStart(2, '0')} · {project.year}
        </p>
        <h3 className="display mt-6 text-4xl text-white sm:text-5xl">{project.title}</h3>
        <p className="eyebrow mt-5 leading-6 text-neutral-500">
          {project.meta} <span className="text-neutral-700">/</span> {teamNote}
        </p>
        <p className="mt-7 leading-relaxed text-neutral-400">{project.description}</p>

        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-400">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-4">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-gold/60" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-8">
          {project.url && (
            <OutlineLink href={project.url} external>
              {visitLabel}
            </OutlineLink>
          )}
          <TagLine tags={project.tags} />
        </div>
      </div>

      {/* Tarayıcı çerçevesi */}
      <div className="reveal min-w-0 self-start border border-neutral-800 bg-neutral-950 [transition-delay:150ms]">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <span className="flex items-center gap-3">
            <span className="flex gap-1">
              <span className="h-1.5 w-2.5 bg-neutral-600" />
              <span className="h-1.5 w-2.5 bg-neutral-700" />
              <span className="h-1.5 w-2.5 bg-neutral-800" />
            </span>
            <span lang="en" className="eyebrow truncate text-neutral-400">{host}</span>
          </span>
          <span className="eyebrow text-neutral-600">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="aspect-[16/10] overflow-hidden">
          {project.image && !imageFailed ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Mockup kind={project.kind} />
          )}
        </div>
      </div>
    </article>
  );
}
