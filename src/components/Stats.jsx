import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';

const CAPABILITIES = [
  { label: 'عناية بالبشرة', desc: 'كريمات، سيروم، مرطبات، وأقنعة' },
  { label: 'عناية بالشعر', desc: 'شامبو، بلسم، وزيوت علاجية' },
  { label: 'العناية اليومية', desc: 'مستحضرات استحمام وعناية عامة' },
  { label: 'المكياج', desc: 'منتجات تجميل وألوان متنوعة' },
];

const grid = { animate: { transition: { staggerChildren: 0.08 } } };
const cell = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Stats() {
  return (
    <section className="mesh-bg py-16 md:py-20">
      <div className="container-px mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">قدراتنا التصنيعية</span>
          <h2 className="mt-3 text-2xl font-extrabold text-ink-900 md:text-3xl">نصنع من أجل كل فئات مستحضرات التجميل</h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {CAPABILITIES.map((c) => (
            <motion.div
              key={c.label}
              variants={cell}
              className="glass rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-lg font-bold text-brand-700">{c.label}</p>
              <p className="mt-2 text-sm text-ink-400">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
