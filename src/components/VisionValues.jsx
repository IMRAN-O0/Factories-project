import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const VALUE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9.5 19h5M10.5 21.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19c3-4 6-7 10-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
];

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Statement({ title, desc, icon, delay }) {
  return (
    <Reveal delay={delay} className="glass dark:glass-dark relative h-full rounded-3xl p-8 md:p-10">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">{icon}</span>
      <h2 className="mt-6 text-2xl font-bold text-ink-900 dark:text-night-50 md:text-3xl">{title}</h2>
      <p className="mt-4 text-lg leading-loose text-ink-600 dark:text-night-100">{desc}</p>
    </Reveal>
  );
}

export default function VisionValues() {
  const { t } = useLanguage();
  const vision = t('vision.vision');
  const mission = t('vision.mission');
  const values = t('vision.values');

  return (
    <section className="mesh-bg section-py dark:bg-night-900">
      <div className="container-px mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Statement
            title={vision.title}
            desc={vision.desc}
            delay={0}
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            }
          />
          <Statement
            title={mission.title}
            desc={mission.desc}
            delay={0.1}
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="1.2" fill="currentColor" />
              </svg>
            }
          />
        </div>

        <Reveal className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-night-50 md:text-3xl">{t('vision.valuesTitle')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {values.map((v, i) => (
            <motion.div key={v.title} variants={cell} className="glass dark:glass-dark relative rounded-2xl p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                {Reflect.get(VALUE_ICONS, i)}
              </span>
              <h3 className="mt-4 font-bold text-ink-900 dark:text-night-50">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400 dark:text-night-200">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
