import { Link } from 'react-router-dom';
import logoWhite from '../assets/logo-white.png';
import { useLanguage } from '../context/LanguageContext.jsx';

const LINK_ROUTES = ['/', '/services', '/about', '/booking', '/contact'];
const LINK_KEYS = ['nav.home', 'nav.services', 'nav.about', 'nav.bookNow', 'nav.contact'];

const LEGAL_KEYS = [
  { key: 'footer.cr', value: '7002138936' },
  { key: 'footer.taxNumber', value: '300029859300003' },
];

const CONTACT_EMAIL = 'info@awalhelm.com';

const SOCIAL = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M14 4v10.2a3.3 3.3 0 1 1-2.4-3.18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M14 4c0 2.5 2 4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-950 pt-16 pb-8 dark:bg-night-950">
      <div className="container-px mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logoWhite} alt="مصنع أول حلم" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">{t('footer.quickLinks')}</h4>
            <ul className="mt-5 space-y-3">
              {LINK_ROUTES.map((href, i) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/60 transition-colors hover:text-brand-400">
                    {t(Reflect.get(LINK_KEYS, i))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">{t('footer.factoryInfo')}</h4>
            <ul className="mt-5 space-y-3">
              {LEGAL_KEYS.map((item) => (
                <li key={item.key} className="text-sm text-white/60">
                  {t(item.key)}: <span dir="ltr" className="text-white/80">{item.value}</span>
                </li>
              ))}
              <li className="text-sm text-white/60">
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-brand-400">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:ms-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">{t('footer.followUs')}</h4>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-500 hover:text-brand-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>{t('footer.copyright')(year)}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
