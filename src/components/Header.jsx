import { useEffect, useState } from 'react';
import logoBlack from '../assets/logo-black.png';

const NAV_LINKS = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#about', label: 'من نحن' },
  { href: '#why-us', label: 'لماذا نحن' },
  { href: '#contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-px mx-auto flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img src={logoBlack} alt="مصنع أول حلم" className="h-11 w-auto md:h-12" />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-ink-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            احجز استشارة
          </a>
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
        <div className="lg:hidden bg-white border-t border-ink-100 shadow-soft">
          <nav className="container-px mx-auto flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink-700 border-b border-ink-50 last:border-none"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-ink-800 px-6 py-3 text-sm font-semibold text-white"
            >
              احجز استشارة
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
