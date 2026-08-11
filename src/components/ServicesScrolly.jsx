import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Services from './Services.jsx';
import formulationImg from '../assets/stock/formulation.jpg';
import packagingImg from '../assets/stock/packaging.jpg';
import manufacturingImg from '../assets/stock/manufacturing.jpg';
import launchImg from '../assets/stock/launch.jpg';
import { useLanguage } from '../context/LanguageContext.jsx';

const IMAGES = [formulationImg, packagingImg, manufacturingImg, launchImg];
const COUNT = 4;

const ICONS = [
  <svg key="1" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
    <path d="M20 6h8v8l6 12v10a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V26l6-12V6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M16 32h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>,
  <svg key="2" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
    <rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.2" />
    <path d="M8 22h32" stroke="currentColor" strokeWidth="2.2" />
    <path d="M18 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" stroke="currentColor" strokeWidth="2.2" />
  </svg>,
  <svg key="3" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" />
    <path d="M24 16v8l6 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="4" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
    <path d="M24 6c6 6 9 13 9 20a9 9 0 1 1-18 0c0-7 3-14 9-20Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M24 30v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>,
];

// Builds a symmetric crossfade range for panel `index`: the fade-in window of
// panel N exactly matches the fade-out window of panel N-1, so only two
// panels are ever transitioning at once (never three), with a fully-settled
// plateau in between. `lowValue` is the value used while inactive.
function buildRange(index, lowValue) {
  const segment = 1 / COUNT;
  const margin = segment * 0.25;
  const start = index * segment;
  const end = (index + 1) * segment;
  const isFirst = index === 0;
  const isLast = index === COUNT - 1;

  const input = [];
  const output = [];

  if (isFirst) {
    input.push(0);
    output.push(1);
  } else {
    input.push(start - margin, start + margin);
    output.push(lowValue, 1);
  }

  if (isLast) {
    input.push(1);
    output.push(1);
  } else {
    input.push(end - margin, end + margin);
    output.push(1, lowValue);
  }

  return { input, output };
}

function ImagePanel({ index, scrollYProgress, src, alt }) {
  const opacityRange = buildRange(index, 0);
  const scaleRange = buildRange(index, 0.94);
  const opacity = useTransform(scrollYProgress, opacityRange.input, opacityRange.output);
  const scale = useTransform(scrollYProgress, scaleRange.input, scaleRange.output);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <img src={src} alt={alt} className="h-full w-full rounded-2xl object-cover" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
    </motion.div>
  );
}

function TextPanel({ index, scrollYProgress, item }) {
  const opacityRange = buildRange(index, 0.3);
  const opacity = useTransform(scrollYProgress, opacityRange.input, opacityRange.output);
  const x = useTransform(opacity, [0.3, 1], [12, 0]);

  return (
    <motion.div style={{ opacity, x }} className="flex gap-5">
      <div className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-brand-600 dark:text-brand-400">
        {ICONS[index]}
      </div>
      <div>
        <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-1 text-xl font-bold text-ink-900 dark:text-night-50 md:text-2xl">{item.title}</h3>
        <p className="mt-2 max-w-md leading-relaxed text-ink-400 dark:text-night-200">{item.desc}</p>
      </div>
    </motion.div>
  );
}

function PinnedScrolly({ items }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative hidden motion-safe:lg:block" style={{ height: `${COUNT * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-px mx-auto grid w-full grid-cols-2 items-center gap-16">
          <div className="relative">
            <div className="absolute -start-6 top-0 h-full w-px bg-ink-100 dark:bg-night-700">
              <motion.div className="w-full origin-top bg-brand-500" style={{ scaleY: railScale, height: '100%' }} />
            </div>
            <div className="flex flex-col gap-16">
              {items.map((item, i) => (
                <TextPanel key={item.title} index={i} scrollYProgress={scrollYProgress} item={item} />
              ))}
            </div>
          </div>

          <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl p-2">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              {items.map((item, i) => (
                <ImagePanel key={item.title} index={i} scrollYProgress={scrollYProgress} src={IMAGES[i]} alt={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesScrolly() {
  const { t } = useLanguage();
  const items = t('services.items');

  return (
    <section className="mesh-bg dark:bg-night-900">
      <div className="container-px section-py mx-auto motion-safe:lg:pb-0">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('services.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl">{t('services.title')}</h2>
          <p className="mt-4 text-ink-400 dark:text-night-200">{t('services.desc')}</p>
        </div>
      </div>

      <PinnedScrolly items={items} />

      <div className="container-px mx-auto pb-20 motion-safe:lg:hidden">
        <Services withHeading={false} />
      </div>
    </section>
  );
}
