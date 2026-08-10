import FileDropField from './FileDropField.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const inputClass =
  'w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-night-50';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink-700 dark:text-night-100';

export default function DetailsStep({ form, onChange, logoFiles, onLogoChange, designFiles, onDesignChange }) {
  const { t } = useLanguage();
  const d = t('booking.details');
  const handle = (e) => onChange({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900 dark:text-night-50">{d.heading}</h2>
      <p className="mt-2 text-center text-ink-400 dark:text-night-200">{d.subheading}</p>

      <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={labelClass}>{d.name}</label>
          <input type="text" name="name" value={form.name} onChange={handle} required className={inputClass} placeholder={d.namePlaceholder} />
        </div>
        <div className="sm:col-span-1">
          <label className={labelClass}>{d.phone}</label>
          <input type="tel" name="phone" value={form.phone} onChange={handle} required dir="ltr" className={inputClass} placeholder={d.phonePlaceholder} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{d.brand}</label>
          <input type="text" name="brand" value={form.brand} onChange={handle} className={inputClass} placeholder={d.brandPlaceholder} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{d.email}</label>
          <input type="email" name="email" value={form.email} onChange={handle} dir="ltr" className={inputClass} placeholder={d.emailPlaceholder} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{d.notes}</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handle}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder={d.notesPlaceholder}
          />
        </div>

        <div className="sm:col-span-2">
          <FileDropField label={d.logoLabel} hint={d.logoHint} accept="image/*,.pdf" files={logoFiles} onChange={onLogoChange} />
        </div>
        <div className="sm:col-span-2">
          <FileDropField label={d.designLabel} hint={d.designHint} accept="image/*,.pdf" files={designFiles} onChange={onDesignChange} />
        </div>

        <div className="sm:col-span-2 rounded-xl bg-ink-50 p-4 text-xs leading-relaxed text-ink-400 dark:bg-night-800 dark:text-night-200">
          {d.disclaimer}
        </div>
      </div>
    </div>
  );
}
