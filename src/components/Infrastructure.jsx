import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { MANUFACTURING_IMAGE } from './media.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const ICONS = [
  // Production hall
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M3 21V11l5 3v-3l5 3v-3l5 3V4h3v17H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 17.5h2M12 17.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // Laboratory
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M9 3h6M10 3v6.5L5 18a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>,
  // Warehouse
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M3 21V8.5L12 4l9 4.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 21v-8h10v8M7 16.5h10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>,
];

const grid = { animate: { transition: { staggerChildren: 0.1 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Infrastructure() {
  const { t } = useLanguage();
  const items = t('infrastructure.items');

  return (
    <section className="mesh-bg section-py dark:bg-night-900">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t('infrastructure.eyebrow')}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">
              {t('infrastructure.title')}
            </h2>
            <p className="mt-5 leading-loose text-ink-400 dark:text-night-200">{t('infrastructure.intro')}</p>
          </Reveal>

          <motion.ul
            variants={grid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-8 space-y-4"
          >
            {items.map((item, i) => (
              <motion.li key={item.title} variants={cell} className="glass dark:glass-dark relative flex items-start gap-4 rounded-2xl p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                  {Reflect.get(ICONS, i)}
                </span>
                <span>
                  <span className="block font-bold text-ink-900 dark:text-night-50">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-400 dark:text-night-200">{item.desc}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal delay={0.1} y={30}>
          <div className="glass relative overflow-hidden rounded-3xl p-2">
            <img
              src={MANUFACTURING_IMAGE}
              alt={Reflect.get(items, 0).title}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
