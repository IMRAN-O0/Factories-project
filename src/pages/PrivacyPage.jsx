import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const SECTION_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.14.63.63 1.13 1.55 1.35H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.65Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="9" cy="10" r="1.1" fill="currentColor" />
    <circle cx="14" cy="9" r="1.1" fill="currentColor" />
    <circle cx="15" cy="14" r="1.1" fill="currentColor" />
    <circle cx="10" cy="15" r="1.1" fill="currentColor" />
  </svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 11.5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="7" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="8" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const grid = { animate: { transition: { staggerChildren: 0.07 } } };
const cell = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function PrivacyPage() {
  const { t } = useLanguage();
  const p = t('pages.privacy');
  const privacy = t('privacy');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <section className="section-py bg-white dark:bg-night-900">
        <div className="container-px mx-auto max-w-4xl">
          <Reveal className="glass dark:glass-dark relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-30" />
            <p className="text-lg leading-loose text-ink-700 dark:text-night-100">{privacy.intro}</p>
            <p className="mt-6 text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-night-300">
              {privacy.updated}
            </p>
          </Reveal>

          <motion.div
            variants={grid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {privacy.sections.map((s, i) => (
              <motion.div
                key={s.title}
                variants={cell}
                className="rounded-2xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-lg dark:border-night-700 dark:bg-night-800"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                  {SECTION_ICONS[i]}
                </div>
                <h3 className="mt-4 font-bold text-ink-900 dark:text-night-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400 dark:text-night-200">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
