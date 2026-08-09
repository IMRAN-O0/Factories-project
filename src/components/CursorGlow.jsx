import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const GLOW_SIZE = 300;
const HALF = GLOW_SIZE / 2;

export default function CursorGlow() {
  const x = useMotionValue(-GLOW_SIZE);
  const y = useMotionValue(-GLOW_SIZE);
  const springX = useSpring(x, { damping: 28, stiffness: 150, mass: 0.6 });
  const springY = useSpring(y, { damping: 28, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const handleMove = (e) => {
      x.set(e.clientX - HALF);
      y.set(e.clientY - HALF);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] hidden lg:block"
      style={{ x: springX, y: springY, width: GLOW_SIZE, height: GLOW_SIZE }}
    />
  );
}
