import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { PACKAGING_IMAGES } from './media.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.07 } } };
const cell = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function PackagingSolutions() {
  const { t } = useLanguage();
  const items = t('packagingSolutions.items');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('packagingSolutions.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('packagingSolutions.title')}</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 flex flex-wrap justify-center gap-5 lg:gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cell}
              className="glass dark:glass-dark group relative w-full overflow-hidden rounded-2xl p-2 transition-transform hover:-translate-y-1 sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="overflow-hidden rounded-xl bg-[#f6f1e4]">
                <img
                  src={Reflect.get(PACKAGING_IMAGES, item.id)}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-4 pb-5 pt-4">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700/70 dark:text-brand-300/70">
                  {item.tag}
                </p>
                <h3 className="mt-1.5 font-bold text-ink-900 dark:text-night-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400 dark:text-night-200">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
