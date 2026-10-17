import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const SERVICE_ICONS = {
  // Skincare — cream jar
  skin: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect x="5" y="5" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 9h13l-.8 9.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5.5 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  // Body care — oil drop
  body: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M12 3c3.5 4 5.5 7.3 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.3 8.5 7 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  // Relaxation & bath — leaf
  relax: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19c3-4 6-7 10-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  // Shower & fragrance — spray bottle
  shower: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect x="7" y="10" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 10V7h4v3M13.5 7H17l1.5-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 8.5h.01M21 6h.01M20 3.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  // Hair care — strands
  hair: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M6 3c3 3 3 6 0 9M12 3c3 3 3 6 0 9M18 3c3 3 3 6 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 21c1-4 3-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Tan, beauty & makeup — sun
  tan: (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
      <h2 className="text-center text-2xl font-bold text-ink-900 dark:text-night-50">{t('booking.service.heading')}</h2>
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
                {Reflect.get(SERVICE_ICONS, opt.id)}
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
