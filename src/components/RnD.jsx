import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import rndImage from '../assets/profile/rnd-dropper.jpg';
import { useLanguage } from '../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function RnD() {
  const { t } = useLanguage();
  const items = t('rnd.items');

  return (
    <section className="mesh-bg section-py dark:bg-night-900">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal y={30} className="mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
          <div className="glass relative overflow-hidden rounded-3xl p-2">
            <img src={rndImage} alt={t('rnd.imageAlt')} loading="lazy" className="aspect-[2/3] w-full rounded-2xl object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t('rnd.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('rnd.title')}</h2>
            <p className="mt-5 text-lg leading-loose text-ink-600 dark:text-night-100">{t('rnd.intro')}</p>
          </Reveal>

          <motion.div
            variants={grid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {items.map((item, i) => (
              <motion.div key={item.title} variants={cell} className="glass dark:glass-dark relative rounded-2xl p-6">
                <span className="font-display text-sm font-semibold tracking-wider text-brand-600 dark:text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-bold text-ink-900 dark:text-night-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400 dark:text-night-200">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
