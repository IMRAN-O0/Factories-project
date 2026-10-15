import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { smoothScrollTo } from './layout/SmoothScroll.jsx';
import Services from './Services.jsx';
import JourneyIcon from './JourneyIcon.jsx';
import { JOURNEY_IMAGES } from './media.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const EASE = [0.22, 1, 0.36, 1];

function StepText({ index, item }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="glass relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-brand-600 dark:text-brand-400">
          <JourneyIcon index={index} />
        </div>
        <span className="font-display text-5xl font-bold text-brand-600/25 dark:text-brand-400/25">
          {String(index + 1).padStart(2, '0')}
        </span>
        {item.tag && (
          <span dir="ltr" className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-700/70 dark:text-brand-300/70">
            {item.tag}
          </span>
        )}
      </div>
      <h3 className="mt-6 text-3xl font-bold text-ink-900 dark:text-night-50 xl:text-4xl">{item.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-loose text-ink-400 dark:text-night-200">{item.desc}</p>
    </>
  );
}

function PinnedScrolly({ items }) {
  const COUNT = items.length;
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    smoothScrollTo(top + ((i + 0.5) / COUNT) * distance);
  };

  return (
    <section ref={sectionRef} className="relative hidden motion-safe:lg:block" style={{ height: `${COUNT * 60}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden pt-20">
        <div className="container-px mx-auto flex h-full flex-col justify-center gap-8 py-6">
          <div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {items.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active === i
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-ink-600 hover:bg-white/60 hover:text-ink-900 dark:text-night-200 dark:hover:bg-white/10 dark:hover:text-night-50'
                  }`}
                >
                  <span className="tabular-nums opacity-70">{String(i + 1).padStart(2, '0')}</span> {item.title}
                </button>
              ))}
            </div>
            <div className="mx-auto mt-4 h-px max-w-xl bg-ink-100 dark:bg-night-700">
              <motion.div className="h-full origin-left bg-brand-500 rtl:origin-right" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-16">
            <div className="relative grid">
              {items.map((item, i) => (
                <div key={item.title} aria-hidden="true" className="invisible col-start-1 row-start-1">
                  <StepText index={i} item={item} />
                </div>
              ))}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <StepText index={active} item={Reflect.get(items, active)} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="glass relative mx-auto aspect-[4/3] w-full rounded-3xl p-2"
              style={{ maxWidth: 'calc((100vh - 17rem) * 4 / 3)' }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active}
                    src={Reflect.get(JOURNEY_IMAGES, active)}
                    alt={Reflect.get(items, active).title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
              </div>
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
          <h2 className="mt-3 text-3xl font-bold text-ink-900 dark:text-night-50 md:text-4xl">{t('services.title')}</h2>
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
