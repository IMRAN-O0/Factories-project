import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoBlack from '../assets/logo-black.png';
import logoGreen from '../assets/logo-green-full.png';
import logoWhite from '../assets/logo-white.png';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const NAV_LINKS = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const hoverLogo = theme === 'dark' ? logoWhite : logoBlack;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav-scrolled' : 'glass-nav'
      }`}
    >
      <div className="container-px mx-auto flex h-20 items-center justify-between gap-4">
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-ink-200/70 px-3.5 py-2 text-xs font-semibold text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-night-400/60 dark:text-night-100 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            {t('lang.switchTo')}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-night-400/60 dark:text-night-100 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
                <path
                  d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <Link
            to="/booking"
            className="inline-flex items-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:-translate-y-0.5 active:scale-95"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

        <nav className="glass-pill absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-ink-900 dark:text-night-50'
                    : 'text-ink-600 hover:text-ink-900 dark:text-night-200 dark:hover:text-night-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="group relative flex h-11 shrink-0 items-center md:h-12">
          <img
            src={logoGreen}
            alt="مصنع أول حلم"
            className="h-11 w-auto transition-opacity duration-200 md:h-12 group-hover:opacity-0"
          />
          <img
            src={hoverLogo}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 h-11 w-auto opacity-0 transition-opacity duration-200 md:h-12 group-hover:opacity-100"
          />
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-ink-200/70 px-3 py-1.5 text-xs font-semibold text-ink-600 dark:border-night-400/60 dark:text-night-100"
          >
            {t('lang.switchTo')}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 text-ink-600 dark:border-night-400/60 dark:text-night-100"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-2"
            aria-label={t('nav.openMenu')}
          >
            <span className={`h-0.5 w-6 bg-ink-800 transition-transform dark:bg-night-50 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink-800 transition-opacity dark:bg-night-50 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink-800 transition-transform dark:bg-night-50 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          key={lang}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-pill relative mx-4 mt-1 overflow-hidden rounded-2xl lg:hidden"
        >
          <nav className="container-px mx-auto flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `py-3 text-base font-medium border-b border-ink-100/60 last:border-none dark:border-night-700/60 ${
                    isActive ? 'text-brand-600' : 'text-ink-700 dark:text-night-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              className="my-3 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
            >
              {t('nav.bookNow')}
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
