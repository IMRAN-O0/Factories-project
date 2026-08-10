import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <rect x="3" y="7" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="4" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="7" y="16" width="10" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h6M9 8h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
];

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyUs() {
  const { t } = useLanguage();
  const items = t('whyUs.items');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('whyUs.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl">{t('whyUs.title')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((f, i) => (
            <motion.div key={f.title} variants={cell} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                {ICONS[i]}
              </div>
              <div>
                <h3 className="font-bold text-ink-900 dark:text-night-50">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400 dark:text-night-200">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
