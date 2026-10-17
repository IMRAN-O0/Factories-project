import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const BADGE_ICONS = [
  // SFDA licence
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Industrial licence
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M5 21V4a1 1 0 0 1 1-1h9l4 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // ISO 9001 — quality
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 14.5 7 21l5-2.5 5 2.5-1.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>,
  // ISO 14001 — environment
  <svg key="4" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19c3-4 6-7 10-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // ISO 45001 — health & safety
  <svg key="5" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 8.5v6M9 11.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // Saudi Made
  <svg key="6" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M5 21V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 4h12l-2.5 4L17 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
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
  const qc = t('certifications.qc');
  const stats = t('certifications.stats');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('certifications.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">
            {t('certifications.title')}
          </h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              variants={cell}
              className="glass dark:glass-dark relative flex items-start gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                {Reflect.get(BADGE_ICONS, i)}
              </span>
              <span>
                <span className="block font-bold text-ink-900 dark:text-night-50">{b.title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-400 dark:text-night-200">{b.desc}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal
          delay={0.1}
          className="relative mt-6 flex flex-col gap-5 overflow-hidden rounded-2xl bg-gradient-to-l from-brand-600 to-brand-700 p-7 text-white sm:flex-row sm:items-center md:p-8"
        >
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path d="M9 3h6M10 3v6.5L5 18a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <div className="relative">
            <h3 className="text-lg font-bold">{qc.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85 md:text-base">{qc.desc}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mesh-bg mt-16 grid grid-cols-1 gap-8 rounded-3xl px-6 py-10 sm:grid-cols-3 md:px-12">
          {stats.map((s) => (
            <StatCounter key={s.label} target={s.target} label={s.label} isRTL={isRTL} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
