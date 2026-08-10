import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Stepper({ current }) {
  const { t } = useLanguage();
  const steps = t('booking.steps');

  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${
                  isDone || isActive
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-ink-200 bg-white text-ink-400 dark:border-night-600 dark:bg-night-800 dark:text-night-200'
                }`}
              >
                {isDone ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'text-brand-700 dark:text-brand-400' : 'text-ink-400 dark:text-night-200'}`}>
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div className="mx-2 h-0.5 flex-1 bg-ink-100 dark:bg-night-700 md:mx-3">
                <motion.div
                  initial={false}
                  animate={{ width: isDone ? '100%' : '0%' }}
                  transition={{ duration: 0.35 }}
                  className="h-0.5 bg-brand-600"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
