import { motion } from 'framer-motion';
import logoWhite from '../assets/logo-white.png';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function About() {
  const { t } = useLanguage();
  const points = t('about.points');

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0" y={30}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-14 md:px-10 md:py-16 flex flex-col items-center gap-8 text-center">
            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <img src={logoWhite} alt="مصنع أول حلم" className="relative h-20 w-auto md:h-24" />
            <div className="relative">
              <p className="text-xl font-bold leading-relaxed text-white md:text-2xl">{t('about.quote')}</p>
              <p className="mt-3 text-sm text-white/75">{t('about.quoteAuthor')}</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {t('about.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl text-balance">
              {t('about.title')}
            </h2>
            <p className="mt-5 leading-loose text-ink-400 dark:text-night-200">{t('about.paragraph')}</p>
          </Reveal>

          <motion.ul
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="mt-8 space-y-4"
          >
            {points.map((point) => (
              <motion.li
                key={point}
                variants={{
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-400">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-ink-700 dark:text-night-100">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
