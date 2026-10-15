// API'den (server/src/data/content.*.json) gelen içeriğin tipleri.
// JSON'a yeni bir alan eklersen buraya da eklemelisin.
// Başlıklarda *yıldız* arasına yazılan kısım italik vurgulu gösterilir.

export type Lang = 'tr' | 'en';

export type ProjectKind = 'panel' | 'web' | 'sheet';

export interface FeaturedProject {
  id: string;
  year: string;
  kind: ProjectKind;
  title: string;
  meta: string;
  description: string;
  highlights: string[];
  tags: string[];
  url?: string;
  image?: string; // ör. "/projects/ktp-admin.jpg" (yoksa çizilmiş arayüz gösterilir)
}

export interface OtherProject {
  title: string;
  meta: string;
  description: string;
  url?: string;
  badge?: string;
}

export interface LabItem {
  title: string;
  description: string;
  tags: string[];
  folder: string;
  status: 'dev' | 'done';
}

export type ContactCode = 'sent' | 'required' | 'invalidEmail' | 'tooLong' | 'error';

interface SectionBase {
  label: string;
  title: string;
}

export interface Content {
  meta: {
    name: string;
    firstName: string;
    lastName: string;
    initials: string;
    role: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
  };
  nav: Record<'about' | 'experience' | 'services' | 'projects' | 'lab' | 'education' | 'faq' | 'contact' | 'menu' | 'close', string>;
  hero: { greeting: string; role: string; intro: string; scroll: string };
  about: SectionBase & {
    paragraphs: string[];
    card: { fileName: string; fields: { key: string; value: string }[]; comment: string; footer: string };
  };
  experience: SectionBase & {
    items: { period: string; company: string; org: string; role: string; bullets: string[]; tags: string[] }[];
  };
  services: SectionBase & { items: { title: string; description: string }[]; tags: string[] };
  projects: SectionBase & {
    visit: string;
    teamNote: string;
    featured: FeaturedProject[];
    othersTitle: string;
    others: OtherProject[];
  };
  lab: SectionBase & { subtitle: string; repo: string; status: Record<'dev' | 'done', string>; items: LabItem[] };
  education: SectionBase & {
    items: { degree: string; level: string; school: string; period: string }[];
    coursesTitle: string;
    courses: { name: string; org: string; period: string }[];
  };
  faq: SectionBase & { items: { q: string; a: string }[] };
  contact: SectionBase & {
    subtitle: string;
    form: { name: string; email: string; message: string; send: string; sending: string };
    messages: Record<ContactCode, string>;
    copy: string;
    copied: string;
  };
  footer: { bigWord: string; lineStart: string; lineEmphasis: string; built: string; backToTop: string };
}
