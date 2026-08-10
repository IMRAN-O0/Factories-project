import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-6 pt-20 text-center dark:bg-night-900">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-7xl font-extrabold text-brand-100 dark:text-night-700">{t('pages.notFound.code')}</p>
        <h1 className="mt-4 text-2xl font-bold text-ink-900 dark:text-night-50">{t('pages.notFound.title')}</h1>
        <p className="mt-2 text-ink-400 dark:text-night-200">{t('pages.notFound.description')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {t('pages.notFound.cta')}
        </Link>
      </motion.div>
    </section>
  );
}
