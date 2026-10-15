import { useState, type FormEvent } from 'react';
import type { ContactCode, Content } from '../types';
import { ArrowUpRight, Check, Copy, GitHub, LinkedIn } from './Icons';
import { Section } from './ui';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact({ content }: { content: Content }) {
  const { contact, meta } = content;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const [code, setCode] = useState<ContactCode | null>(null);
  const [copied, setCopied] = useState(false);

  // Formu Node.js API'sine gönder: POST /api/contact
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { code: ContactCode };

      setCode(data.code);
      if (res.ok) {
        setState('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setState('error');
      }
    } catch {
      setCode('error');
      setState('error');
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(meta.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* kopyalanamazsa bir şey yapma */
    }
  }

  // Alt çizgili, sade form alanı
  const fieldClass =
    'w-full border-b border-neutral-700 bg-transparent py-4 text-lg font-light text-white placeholder:text-neutral-600 transition focus:border-white focus:outline-none';

  return (
    <Section id="contact" index="008" label={contact.label} title={contact.title}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        {/* Sol: iletişim bilgileri */}
        <div className="reveal min-w-0">
          <p className="text-lg leading-relaxed text-neutral-400">{contact.subtitle}</p>

          <div className="mt-12 border-t border-line">
            <div className="flex items-center justify-between gap-4 border-b border-line py-6">
              <a href={`mailto:${meta.email}`} className="min-w-0 truncate text-xl text-white hover:underline sm:text-2xl">
                {meta.email}
              </a>
              <button onClick={copyEmail} className="eyebrow flex shrink-0 items-center gap-2 text-neutral-500 transition hover:text-white">
                {copied ? <Check /> : <Copy />}
                {copied ? contact.copied : contact.copy}
              </button>
            </div>
            {[
              { href: meta.linkedin, label: 'LinkedIn', icon: <LinkedIn className="h-4 w-4" /> },
              { href: meta.github, label: 'GitHub', icon: <GitHub className="h-4 w-4" /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-line py-6 text-neutral-400 transition hover:text-white"
              >
                <span className="eyebrow flex items-center gap-3">
                  {link.icon}
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Sağ: form */}
        <form onSubmit={handleSubmit} noValidate className="reveal min-w-0 space-y-4 [transition-delay:150ms]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
            <input
              className={fieldClass}
              placeholder={contact.form.name}
              aria-label={contact.form.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={fieldClass}
              type="email"
              placeholder={contact.form.email}
              aria-label={contact.form.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <textarea
            className={`${fieldClass} min-h-[180px] resize-y`}
            placeholder={contact.form.message}
            aria-label={contact.form.message}
            maxLength={2000}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
            <p role="status" className={`text-sm ${state === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {(state === 'success' || state === 'error') && code ? contact.messages[code] : ''}
            </p>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="eyebrow group ml-auto inline-flex items-center gap-3 border border-white bg-white px-8 py-4 text-black transition hover:bg-transparent hover:text-white disabled:opacity-50"
            >
              {state === 'sending' ? contact.form.sending : contact.form.send}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
