import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const SERVICE_ICONS = {
  skincare: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  haircare: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M6 3c3 3 3 6 0 9M12 3c3 3 3 6 0 9M18 3c3 3 3 6 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 21c1-4 3-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  makeup: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  full: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServiceStep({ value, onChange }) {
  const { t } = useLanguage();
  const options = t('booking.service.options');

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900 dark:text-night-50">{t('booking.service.heading')}</h2>
      <p className="mt-2 text-center text-ink-400 dark:text-night-200">{t('booking.service.subheading')}</p>

      <motion.div variants={grid} initial="initial" animate="animate" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              variants={cell}
              onClick={() => onChange(opt.id)}
              className={`flex items-start gap-4 rounded-2xl border-2 p-6 text-start transition-all ${
                active
                  ? 'border-brand-600 bg-brand-50 shadow-md dark:bg-brand-950/40'
                  : 'border-ink-100 bg-white hover:border-brand-200 dark:border-night-600 dark:bg-night-800 dark:hover:border-brand-700'
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  active ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400'
                }`}
              >
                {SERVICE_ICONS[opt.id]}
              </span>
              <span>
                <span className="block font-bold text-ink-900 dark:text-night-50">{opt.title}</span>
                <span className="mt-1 block text-sm text-ink-400 dark:text-night-200">{opt.desc}</span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
