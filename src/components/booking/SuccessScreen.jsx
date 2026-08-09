import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SuccessScreen() {
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
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-600"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
          <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <h2 className="mt-6 text-2xl font-extrabold text-ink-900">تم إرسال طلبك بنجاح</h2>
      <p className="mt-3 leading-relaxed text-ink-400">
        شكراً لتواصلك مع مصنع أول حلم. سيقوم فريقنا بمراجعة طلبك والتواصل معك
        خلال 24 ساعة لتأكيد موعدك النهائي.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700"
      >
        العودة للرئيسية
      </Link>
    </motion.div>
  );
}
