import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { CATALOG_COVERS } from './media.js';
import { groupRange } from './catalogRange.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.07 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function CatalogTeaser() {
  const { t, isRTL } = useLanguage();
  const groups = t('catalog.groups');
  const itemsLabel = t('catalog.itemsLabel');

  return (
    <section className="mesh-bg section-py dark:bg-night-900">
      <div className="container-px mx-auto">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-start">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t('catalog.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('catalog.title')}</h2>
            <p className="mt-4 text-ink-400 dark:text-night-200">{t('catalog.desc')}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex shrink-0 items-baseline gap-3">
            <span className="font-display text-6xl font-bold text-brand-600 dark:text-brand-400 md:text-7xl">
              {t('catalog.count')}
            </span>
            <span className="text-lg font-semibold text-ink-700 dark:text-night-100">{t('catalog.countLabel')}</span>
          </Reveal>
        </div>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
        >
          {groups.map((g) => (
            <motion.div key={g.id} variants={cell}>
              <Link
                to="/products"
                state={{ group: g.id }}
                className="glass dark:glass-dark group relative block h-full overflow-hidden rounded-2xl p-2 transition-transform hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-xl bg-[#f6f1e4]">
                  <img
                    src={Reflect.get(CATALOG_COVERS, g.id)}
                    alt={g.title}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pb-3 pt-4">
                  <h3 className="font-bold leading-snug text-ink-900 dark:text-night-50">{g.title}</h3>
                  <p className="mt-1 text-xs text-ink-400 dark:text-night-200">{itemsLabel(groupRange(g.items).count)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:scale-95"
          >
            {t('catalog.cta')}
            <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`}>
              <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
