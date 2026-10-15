import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { MANUFACTURING_IMAGE } from './media.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.1 } } };
const cell = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ManufacturingServices() {
  const { t } = useLanguage();
  const models = t('manufacturing.models');
  const lines = t('manufacturing.lines');
  const exportDocs = t('manufacturing.export');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('manufacturing.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('manufacturing.title')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {models.map((m) => (
            <motion.div
              key={m.code}
              variants={cell}
              className="glass dark:glass-dark group relative overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-3xl font-bold tracking-wide text-brand-600 dark:text-brand-400">
                {m.code}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-600 dark:text-night-100">{m.name}</p>
              <div className="my-5 h-px bg-ink-100 dark:bg-night-700" />
              <p className="leading-relaxed text-ink-400 dark:text-night-200">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="glass dark:glass-dark relative flex h-full flex-col overflow-hidden rounded-3xl p-2">
            <img
              src={MANUFACTURING_IMAGE}
              alt={lines.title}
              loading="lazy"
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-ink-900 dark:text-night-50">{lines.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-400 dark:text-night-200">{lines.desc}</p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white md:p-10"
          >
            <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="relative mt-6 text-2xl font-bold">{exportDocs.title}</h3>
            <ul className="relative mt-6 space-y-4">
              {exportDocs.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="leading-relaxed text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
