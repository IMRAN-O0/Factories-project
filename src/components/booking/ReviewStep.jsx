import { useLanguage } from '../../context/LanguageContext.jsx';

function formatDate(date, isRTL) {
  if (!date) return '—';
  return new Intl.DateTimeFormat(isRTL ? 'ar-SA-u-nu-latn' : 'en-US', {
    calendar: 'gregory',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function ReviewStep({ service, packaging, date, time, form, logoFiles, designFiles }) {
  const { t, isRTL } = useLanguage();
  const r = t('booking.review');
  const serviceLabel = t('booking.service.options').find((s) => s.id === service)?.title ?? r.empty;
  const packagingLabel = t('booking.packaging.options').find((p) => p.id === packaging)?.title ?? r.empty;

  const rows = [
    { label: r.service, value: serviceLabel },
    { label: r.packaging, value: packagingLabel },
    { label: r.date, value: formatDate(date, isRTL) },
    { label: r.time, value: time || r.empty },
    { label: r.name, value: form.name },
    { label: r.brand, value: form.brand || r.empty },
    { label: r.phone, value: form.phone, dir: 'ltr' },
  ];

  const attachments = [...logoFiles, ...designFiles];

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900 dark:text-night-50">{r.title}</h2>
      <p className="mt-2 text-center text-ink-400 dark:text-night-200">{r.subtitle}</p>

      <div className="glass relative mx-auto mt-10 max-w-xl divide-y divide-white/40 dark:divide-white/10 overflow-hidden rounded-2xl">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-ink-400 dark:text-night-200">{row.label}</span>
            <span dir={row.dir} className="font-semibold text-ink-900 dark:text-night-50">
              {row.value}
            </span>
          </div>
        ))}
        {form.notes && (
          <div className="px-6 py-4">
            <span className="block text-sm text-ink-400 dark:text-night-200">{r.notes}</span>
            <span className="mt-1 block text-ink-700 dark:text-night-100">{form.notes}</span>
          </div>
        )}
        {attachments.length > 0 && (
          <div className="px-6 py-4">
            <span className="block text-sm text-ink-400 dark:text-night-200">{r.attachments}</span>
            <ul className="mt-1.5 space-y-1">
              {attachments.map((f, i) => (
                <li key={`${f.name}-${i}`} className="text-sm text-ink-700 dark:text-night-100">
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink-400 dark:text-night-200">
        {r.disclaimer}
        {attachments.length > 0 && r.disclaimerAttachments}.
      </p>
    </div>
  );
}
