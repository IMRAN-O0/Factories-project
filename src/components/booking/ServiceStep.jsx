import { motion } from 'framer-motion';

export const SERVICE_OPTIONS = [
  {
    id: 'skincare',
    title: 'عناية بالبشرة',
    desc: 'كريمات، سيروم، مرطبات، وأقنعة',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'haircare',
    title: 'عناية بالشعر',
    desc: 'شامبو، بلسم، وزيوت علاجية',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M6 3c3 3 3 6 0 9M12 3c3 3 3 6 0 9M18 3c3 3 3 6 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 21c1-4 3-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'makeup',
    title: 'المكياج',
    desc: 'منتجات تجميل وألوان متنوعة',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'full',
    title: 'تصنيع خاص كامل',
    desc: 'استشارة عامة لعلامتك التجارية',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServiceStep({ value, onChange }) {
  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">ما الخدمة التي تحتاجها؟</h2>
      <p className="mt-2 text-center text-ink-400">اختر التصنيف الأقرب لفكرتك، يمكنك توضيح التفاصيل لاحقاً</p>

      <motion.div variants={grid} initial="initial" animate="animate" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICE_OPTIONS.map((opt) => {
          const active = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              variants={cell}
              onClick={() => onChange(opt.id)}
              className={`flex items-start gap-4 rounded-2xl border-2 p-6 text-right transition-all ${
                active ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-ink-100 bg-white hover:border-brand-200'
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  active ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
                }`}
              >
                {opt.icon}
              </span>
              <span>
                <span className="block font-bold text-ink-900">{opt.title}</span>
                <span className="mt-1 block text-sm text-ink-400">{opt.desc}</span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
