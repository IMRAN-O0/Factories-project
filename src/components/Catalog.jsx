import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { smoothScrollTo } from './layout/SmoothScroll.jsx';
import { CATALOG_IMAGES } from './media.js';
import { groupRange } from './catalogRange.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const list = { animate: { transition: { staggerChildren: 0.05 } } };
const row = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function scrollToGroup(id) {
  const el = document.getElementById(`group-${id}`);
  if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 110);
}

function CatalogGroup({ group, index, itemsLabel }) {
  const images = Reflect.get(CATALOG_IMAGES, group.id);
  const range = groupRange(group.items);
  const flip = index % 2 === 1;

  return (
    <article id={`group-${group.id}`} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-14">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-ink-100 pb-6 dark:border-night-700 lg:col-span-12">
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-bold text-brand-600/25 dark:text-brand-400/25">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-night-50 md:text-3xl">{group.title}</h2>
        </div>
        <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
          <span dir="ltr">{range.label}</span> · {itemsLabel(range.count)}
        </span>
      </Reveal>

      <Reveal y={30} className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
        <div className={`grid grid-cols-2 gap-3 ${images.length >= 4 ? 'sm:grid-cols-4 lg:grid-cols-2' : ''}`}>
          {images.map((src, i) => (
            <div key={src} className="aspect-square overflow-hidden rounded-2xl bg-[#f6f1e4]">
              <img src={src} alt={`${group.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Reveal>

      <motion.ol
        variants={list}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}
      >
        {group.items.map((item) => (
          <motion.li
            key={item.n}
            variants={row}
            className="flex items-start gap-5 border-b border-ink-100/80 py-5 first:pt-0 last:border-none dark:border-night-700/70"
          >
            <span dir="ltr" className="w-14 shrink-0 font-display text-sm font-semibold tracking-wider text-brand-600 dark:text-brand-400">
              {item.n}
            </span>
            <span>
              <span className="block font-bold text-ink-900 dark:text-night-50">{item.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-400 dark:text-night-200">{item.desc}</span>
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </article>
  );
}

export default function Catalog() {
  const { t } = useLanguage();
  const groups = t('catalog.groups');
  const itemsLabel = t('catalog.itemsLabel');
  const location = useLocation();
  const target = location.state?.group;

  // Arriving from a home-page group card: wait for the page transition, then glide to that group.
  useEffect(() => {
    if (!target) return undefined;
    const timer = setTimeout(() => scrollToGroup(target), 500);
    return () => clearTimeout(timer);
  }, [target]);

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto">
        <nav className="flex flex-wrap justify-center gap-2">
          {groups.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => scrollToGroup(g.id)}
              className="glass-pill relative rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700 dark:text-night-100 dark:hover:text-brand-300"
            >
              <span className="tabular-nums text-brand-600 dark:text-brand-400">{String(i + 1).padStart(2, '0')}</span> {g.title}
            </button>
          ))}
        </nav>

        <div className="mt-16 space-y-24">
          {groups.map((g, i) => (
            <CatalogGroup key={g.id} group={g} index={i} itemsLabel={itemsLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
