import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { isBackendConfigured } from '../lib/supabaseClient.js';

const CONTACT_EMAIL = 'info@awalhelm.com';
const CONTACT_PHONE = '+966 57 731 5331';
const WHATSAPP_LINK = 'https://wa.me/966577315331';

function submitViaMailto(form, e2) {
  const subject = encodeURIComponent(`${e2.subjectPrefix} ${form.name || e2.subjectFallback}`);
  const body = encodeURIComponent(
    `${e2.name}: ${form.name}\n${e2.brand}: ${form.brand || '—'}\n${e2.phone}: ${form.phone}\n\n${e2.message}:\n${form.message}`
  );
  const link = document.createElement('a');
  link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  link.click();
}

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', brand: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = t('contact.email');

    if (!isBackendConfigured) {
      submitViaMailto(form, e2);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setForm({ name: '', brand: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const f = t('contact.form');

  return (
    <section className="mesh-bg section-py dark:bg-night-900">
      <div className="container-px mx-auto grid grid-cols-1 gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('contact.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl text-balance">
            {t('contact.title')}
          </h2>
          <p className="mt-5 leading-loose text-ink-400 dark:text-night-200">{t('contact.desc')}</p>

          <div className="mt-8 space-y-5">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/50 dark:text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-ink-700 dark:text-night-100 group-hover:text-brand-700 dark:group-hover:text-brand-400">
                {CONTACT_EMAIL}
              </span>
            </a>

            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/50 dark:text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 5a2 2 0 0 1 1-2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span dir="ltr" className="text-ink-700 dark:text-night-100 group-hover:text-brand-700 dark:group-hover:text-brand-400">
                {CONTACT_PHONE}
              </span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/50 dark:text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M20 12a8 8 0 1 1-3.6-6.66L20 4l-1.2 4.2A7.96 7.96 0 0 1 20 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-ink-700 dark:text-night-100 group-hover:text-brand-700 dark:group-hover:text-brand-400">
                {t('contact.whatsappLabel')}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-night-100">{f.name}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-night-50"
                  placeholder={f.namePlaceholder}
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-night-100">{f.phone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  dir="ltr"
                  className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-night-50"
                  placeholder={f.phonePlaceholder}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-night-100">{f.brand}</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-night-50"
                  placeholder={f.brandPlaceholder}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-night-100">{f.message}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-night-50"
                  placeholder={f.messagePlaceholder}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 w-full rounded-full bg-brand-600 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? f.submitting : f.submit}
            </button>

            {status === 'success' && (
              <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700 dark:bg-brand-950/40 dark:text-brand-400">
                {f.success}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {f.error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
