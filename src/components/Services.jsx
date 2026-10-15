import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import JourneyIcon from './JourneyIcon.jsx';
import { JOURNEY_IMAGES } from './media.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const card = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services({ withHeading = true }) {
  const { t } = useLanguage();
  const items = t('services.items');

  return (
    <section className="mesh-bg section-py relative dark:bg-night-900">
      <div className="container-px relative mx-auto">
        {withHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t('services.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('services.title')}</h2>
            <p className="mt-4 text-ink-400 dark:text-night-200">{t('services.desc')}</p>
          </Reveal>
        )}

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 flex flex-wrap justify-center gap-8 lg:gap-10"
        >
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              variants={card}
              className="glass group relative w-full overflow-hidden rounded-2xl transition-all hover:-translate-y-1.5 hover:shadow-lg sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.875rem)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={Reflect.get(JOURNEY_IMAGES, i)}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
              </div>
              <div className="relative p-7">
                <span className="absolute end-7 top-7 font-display text-sm font-semibold tracking-wider text-brand-600/70 transition-colors group-hover:text-brand-600 dark:text-brand-400/70 dark:group-hover:text-brand-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="glass relative -mt-14 flex h-16 w-16 items-center justify-center rounded-xl text-brand-600 shadow-soft dark:text-brand-400">
                  <JourneyIcon index={i} className="h-9 w-9" />
                </div>
                {s.tag && (
                  <p className="mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700/70 dark:text-brand-300/70">
                    {s.tag}
                  </p>
                )}
                <h3 className={`${s.tag ? 'mt-1.5' : 'mt-6'} text-lg font-bold text-ink-900 dark:text-night-50`}>{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400 dark:text-night-200">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
