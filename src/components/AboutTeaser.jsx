import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import aboutImg from '../assets/stock/about.jpg';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AboutTeaser() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-py bg-white dark:bg-night-900">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal y={30}>
          <div className="glass overflow-hidden rounded-3xl p-2">
            <img
              src={aboutImg}
              alt={t('aboutTeaser.imageAlt')}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t('aboutTeaser.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 dark:text-night-50 md:text-4xl text-balance">
            {t('aboutTeaser.title')}
          </h2>
          <p className="mt-5 leading-loose text-ink-400 dark:text-night-200">{t('aboutTeaser.paragraph')}</p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-600 dark:text-brand-400 transition-colors hover:text-brand-700 dark:hover:text-brand-300"
          >
            {t('aboutTeaser.cta')}
            <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`}>
              <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
