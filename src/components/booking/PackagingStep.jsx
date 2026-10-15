import { motion } from 'framer-motion';
import { PACKAGING_IMAGES } from '../media.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

const grid = { animate: { transition: { staggerChildren: 0.06 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PackagingStep({ value, onChange }) {
  const { t } = useLanguage();
  const options = t('booking.packaging.options');

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-ink-900 dark:text-night-50">{t('booking.packaging.heading')}</h2>
      <p className="mt-2 text-center text-ink-400 dark:text-night-200">{t('booking.packaging.subheading')}</p>

      <motion.div
        variants={grid}
        initial="initial"
        animate="animate"
        className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              variants={cell}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt.id)}
              aria-pressed={active}
              className={`relative flex flex-col overflow-hidden rounded-2xl border-2 p-2 text-start transition-all ${
                active
                  ? 'border-brand-600 bg-brand-50 shadow-md dark:bg-brand-950/40'
                  : 'border-ink-100 bg-white hover:border-brand-200 dark:border-night-600 dark:bg-night-800 dark:hover:border-brand-700'
              }`}
            >
              <span className="block overflow-hidden rounded-xl bg-[#f6f1e4]">
                <img
                  src={Reflect.get(PACKAGING_IMAGES, opt.id)}
                  alt=""
                  aria-hidden="true"
                  className={`aspect-square w-full object-cover transition-transform duration-500 ${active ? 'scale-105' : ''}`}
                />
              </span>
              {active && (
                <span className="absolute end-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white shadow">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              <span className="px-2 pb-2 pt-3">
                <span className="block font-bold text-ink-900 dark:text-night-50">{opt.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-400 dark:text-night-200">{opt.desc}</span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
