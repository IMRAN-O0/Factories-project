import { motion } from 'framer-motion';

export const PACKAGING_OPTIONS = [
  {
    id: 'jar',
    title: 'برطمان',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <rect x="7" y="3" width="10" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="6" y="8" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 11h12" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'bottle',
    title: 'قنينة عادية',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <path d="M10 2h4v3.5l2 3V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.5l2-3V2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'tube',
    title: 'تيوب',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <rect x="10.5" y="2" width="3" height="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4.5h6l1.2 4.5v10a2 2 0 0 1-2 2h-4.4a2 2 0 0 1-2-2V9L9 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7.5 21l9-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pump',
    title: 'مضخة',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <rect x="8" y="9" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 9V6h4v3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 6V4h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 4V2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'spray',
    title: 'بخاخ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <rect x="7" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 10V7h4v3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13 7h4l2 -2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15 5.5V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'other',
    title: 'أخرى',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
        <path d="M3 8l9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 8v8l9 5 9-5V8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 13v8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const grid = { animate: { transition: { staggerChildren: 0.06 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PackagingStep({ value, onChange }) {
  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">ما نوع العبوة المفضّل؟</h2>
      <p className="mt-2 text-center text-ink-400">اختر الشكل الأقرب لتصورك، يمكن تعديله لاحقاً مع فريقنا</p>

      <motion.div
        variants={grid}
        initial="initial"
        animate="animate"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {PACKAGING_OPTIONS.map((opt) => {
          const active = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              variants={cell}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(opt.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all ${
                active ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-ink-100 bg-white hover:border-brand-200'
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                  active ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
                }`}
              >
                {opt.icon}
              </span>
              <span className="font-bold text-ink-900">{opt.title}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
