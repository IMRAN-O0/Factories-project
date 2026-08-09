import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-6 pt-20 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-7xl font-extrabold text-brand-100">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink-900">الصفحة غير موجودة</h1>
        <p className="mt-2 text-ink-400">يبدو أن الرابط الذي تبحث عنه غير متوفر.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700"
        >
          العودة للرئيسية
        </Link>
      </motion.div>
    </section>
  );
}
