import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Stats() {
  const { t } = useLanguage();
  const items = t('stats.items');

  return (
    <section className="mesh-bg py-16 dark:bg-night-900 md:py-20">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('stats.eyebrow')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-ink-900 dark:text-night-50 md:text-3xl">{t('stats.title')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {items.map((c) => (
            <motion.div
              key={c.label}
              variants={cell}
              className="glass relative rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-lg font-bold text-brand-700 dark:text-brand-400">{c.label}</p>
              <p className="mt-2 text-sm text-ink-400 dark:text-night-200">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
