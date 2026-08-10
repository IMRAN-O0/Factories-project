import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoBlack from '../assets/logo-black.png';
import logoGreen from '../assets/logo-green-full.png';

const NAV_LINKS = [
  { to: '/', label: 'الصفحة الرئيسية' },
  { to: '/services', label: 'خدماتنا' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
        scrolled ? 'glass-strong shadow-soft' : 'glass border-transparent shadow-none'
      }`}
    >
      <div className="container-px mx-auto flex h-20 items-center justify-between">
        <Link to="/" className="group relative flex h-11 shrink-0 items-center md:h-12">
          <img
            src={logoGreen}
            alt="مصنع أول حلم"
            className="h-11 w-auto transition-opacity duration-200 md:h-12 group-hover:opacity-0"
          />
          <img
            src={logoBlack}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 h-11 w-auto opacity-0 transition-opacity duration-200 md:h-12 group-hover:opacity-100"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-600' : 'text-ink-600 hover:text-brand-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 right-0 left-0 h-0.5 rounded-full bg-brand-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="inline-flex items-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:-translate-y-0.5 active:scale-95"
          >
            احجز موعد
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="فتح القائمة"
        >
          <span className={`h-0.5 w-6 bg-ink-800 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink-800 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink-800 transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-ink-100 shadow-soft overflow-hidden"
        >
          <nav className="container-px mx-auto flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `py-3 text-base font-medium border-b border-ink-50 last:border-none ${
                    isActive ? 'text-brand-600' : 'text-ink-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
            >
              احجز موعد
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
