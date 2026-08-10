import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  const { isRTL } = useLanguage();

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-[60] h-0.5 bg-brand-500 ${isRTL ? 'origin-right' : 'origin-left'}`}
    />
  );
}
