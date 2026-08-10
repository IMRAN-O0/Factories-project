import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function SuccessScreen() {
  const { t } = useLanguage();
  const s = t('booking.success');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-md text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
          <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <h2 className="mt-6 text-2xl font-extrabold text-ink-900 dark:text-night-50">{s.title}</h2>
      <p className="mt-3 leading-relaxed text-ink-400 dark:text-night-200">{s.desc}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700"
      >
        {s.cta}
      </Link>
    </motion.div>
  );
}
