import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logoBlack from '../../assets/logo-black.png';
import logoGreenFull from '../../assets/logo-green-full.png';

const DURATION = 750;

export default function RouteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), DURATION);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-white/60 backdrop-blur-2xl dark:bg-night-900/65"
        >
          <motion.div
            className="cursor-glow absolute"
            style={{ width: 340, height: 340 }}
            animate={{ x: [0, 60, -50, 0], y: [0, -50, 40, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative h-14 w-36 md:h-16 md:w-44">
            <img src={logoBlack} alt="" className="absolute inset-0 h-full w-full object-contain" />
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
            >
              <img src={logoGreenFull} alt="مصنع أول حلم" className="absolute inset-0 h-full w-full object-contain" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
