import { motion } from 'framer-motion';
import SplitHeading from './SplitHeading.jsx';

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="mesh-bg relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-px relative mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400"
        >
          {eyebrow}
        </motion.span>
        <h1 className="mt-3 text-balance text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-5xl">
          <SplitHeading text={title} delay={0.05} />
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-balance mx-auto mt-4 max-w-2xl text-ink-400 dark:text-night-200"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
