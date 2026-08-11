import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoGreen from '../assets/logo-green.png';
import heroImage from '../assets/stock/hero-lab.jpg';
import SplitHeading from './SplitHeading.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const container = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 pb-24 dark:bg-night-900 md:pt-44 md:pb-32">
      {/* decorative background */}
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 dark:opacity-40" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={logoGreen}
          alt=""
          aria-hidden="true"
          className="absolute -left-24 bottom-0 h-[26rem] w-auto opacity-[0.06] hidden md:block dark:opacity-[0.08]"
        />
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="glass pointer-events-none absolute right-4 top-20 hidden w-48 rounded-2xl p-4 md:block lg:top-28 lg:right-6 lg:w-56"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-ink-900 dark:text-night-50">{t('hero.floatingTitle')}</p>
            <p className="text-xs text-ink-400 dark:text-night-200">{t('hero.floatingDesc')}</p>
          </div>
        </div>
      </motion.div>

      <div className="container-px mx-auto">
        <motion.div variants={container} initial="initial" animate="animate" className="mx-auto max-w-4xl text-center">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-400"
          >
            {t('hero.badge')}
          </motion.span>

          <h1 className="mt-7 text-balance text-4xl font-extrabold leading-[1.2] text-ink-900 dark:text-night-50 sm:text-5xl md:text-6xl">
            <SplitHeading text={t('hero.titleLine1')} delay={0.15} />
            <br />
            <SplitHeading text={t('hero.titleLine2')} className="text-brand-600 dark:text-brand-400" delay={0.4} />
          </h1>

          <motion.p
            variants={item}
            className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400 dark:text-night-200 md:text-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:scale-95"
            >
              {t('hero.ctaBook')}
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-ink-200 px-8 py-3.5 text-base font-semibold text-ink-800 transition-all hover:border-brand-600 hover:text-brand-600 dark:border-night-400 dark:text-night-100 dark:hover:border-brand-400 dark:hover:text-brand-400 active:scale-95"
            >
              {t('hero.ctaServices')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl p-2"
        >
          <img src={heroImage} alt={t('hero.imageAlt')} className="aspect-[16/7] w-full rounded-2xl object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
