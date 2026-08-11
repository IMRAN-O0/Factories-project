import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SIZE = 36;
const HALF = SIZE / 2;

const SCALE_BY_VARIANT = { default: 1, link: 1.7, image: 2.4 };

export default function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 420, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 420, mass: 0.4 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { damping: 22, stiffness: 300 });
  const dotOpacity = useMotionValue(1);
  const springDotOpacity = useSpring(dotOpacity, { damping: 26, stiffness: 300 });

  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    document.documentElement.classList.add('cursor-none-active');

    const handleMove = (e) => {
      x.set(e.clientX - HALF);
      y.set(e.clientY - HALF);
    };
    const handleOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label');
      const media = !interactive && e.target.closest('img, picture, video');
      const next = interactive ? 'link' : media ? 'image' : 'default';
      setVariant(next);
      scale.set(Reflect.get(SCALE_BY_VARIANT, next));
      dotOpacity.set(next === 'default' ? 1 : 0);
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);

    return () => {
      document.documentElement.classList.remove('cursor-none-active');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
    };
  }, [x, y, scale, dotOpacity]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        data-variant={variant}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
        style={{ x: springX, y: springY, scale: springScale, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
        style={{
          x: springX,
          y: springY,
          opacity: visible ? springDotOpacity : 0,
        }}
      />
    </>
  );
}
