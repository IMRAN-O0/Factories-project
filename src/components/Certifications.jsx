import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const BADGE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 8v5M12 15.5v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 8c-2 1.5-2 3 0 4.5s2 3 0 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 14.5 7 21l5-2.5 5 2.5-1.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M5 21V4a1 1 0 0 1 1-1h9l4 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

function StatCounter({ target, label, isRTL }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  const formatted = display.toLocaleString(isRTL ? 'ar-SA-u-nu-latn' : 'en-US');

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-extrabold text-brand-600 dark:text-brand-400 md:text-5xl" dir="ltr">
        {isRTL ? '+' : ''}
        {formatted}
        {!isRTL ? '+' : ''}
      </p>
      <p className="mt-2 text-sm text-ink-400 dark:text-night-200">{label}</p>
    </div>
  );
}

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Certifications() {
  const { t, isRTL } = useLanguage();
  const badges = t('certifications.badges');
  const stats = t('certifications.stats');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('certifications.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl">
            {t('certifications.title')}
          </h2>
          <p className="mt-4 text-ink-400 dark:text-night-200">{t('certifications.subtitle')}</p>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              variants={cell}
              className="glass dark:glass-dark relative flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                {Reflect.get(BADGE_ICONS, i)}
              </span>
              <span className="font-bold text-ink-900 dark:text-night-50">{b.title}</span>
              <span className="text-xs leading-relaxed text-ink-400 dark:text-night-200">{b.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.15} className="mesh-bg mt-16 grid grid-cols-1 gap-8 rounded-3xl px-6 py-10 sm:grid-cols-3 md:px-12">
          {stats.map((s) => (
            <StatCounter key={s.label} target={s.target} label={s.label} isRTL={isRTL} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
