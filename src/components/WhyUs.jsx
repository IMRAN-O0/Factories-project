import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import logoWhite from '../assets/logo-white.png';
import { useLanguage } from '../context/LanguageContext.jsx';

// Ordered like the profile list: local manufacturing, production flexibility, 45 categories,
// idea-to-shelf support, regulatory compliance, export, pricing.
const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <rect x="3" y="7" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="4" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="7" y="16" width="10" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>,
  <svg key="7" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M3 12.6V4a1 1 0 0 1 1-1h8.6a1 1 0 0 1 .7.3l7.4 7.4a1 1 0 0 1 0 1.4l-8.6 8.6a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1-.3-.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.6" />
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
          <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('whyUs.title')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              variants={cell}
              className="glass dark:glass-dark relative rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                {Reflect.get(ICONS, i)}
              </div>
              <h3 className="mt-5 font-bold text-ink-900 dark:text-night-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400 dark:text-night-200">{f.desc}</p>
            </motion.div>
          ))}
          <motion.div
            variants={cell}
            className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white"
          >
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <img src={logoWhite} alt="" aria-hidden="true" className="relative h-10 w-auto self-start" />
            <p className="relative text-xl font-bold leading-relaxed">{t('whyUs.banner')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
