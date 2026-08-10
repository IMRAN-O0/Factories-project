import { motion } from 'framer-motion';

const contentVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -16, filter: 'blur(4px)' },
};

const curtainVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0 },
  exit: { scaleY: 1 },
};

export default function PageTransition({ children }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'top' }}
        className="pointer-events-none fixed inset-0 z-40 bg-brand-600"
      />
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
