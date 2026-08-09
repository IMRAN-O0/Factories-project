import { SERVICE_OPTIONS } from './ServiceStep.jsx';
import { PACKAGING_OPTIONS } from './PackagingStep.jsx';

function formatDate(date) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('ar-SA-u-nu-latn', {
    calendar: 'gregory',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function ReviewStep({ service, packaging, date, time, form, logoFiles, designFiles }) {
  const serviceLabel = SERVICE_OPTIONS.find((s) => s.id === service)?.title ?? '—';
  const packagingLabel = PACKAGING_OPTIONS.find((p) => p.id === packaging)?.title ?? '—';

  const rows = [
    { label: 'الخدمة', value: serviceLabel },
    { label: 'نوع العبوة', value: packagingLabel },
    { label: 'التاريخ', value: formatDate(date) },
    { label: 'الوقت', value: time || '—' },
    { label: 'الاسم', value: form.name },
    { label: 'رقم الجوال', value: form.phone, dir: 'ltr' },
  ];

  const attachments = [...logoFiles, ...designFiles];

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">مراجعة الطلب</h2>
      <p className="mt-2 text-center text-ink-400">تأكد من بياناتك قبل الإرسال، سنتواصل معك لتأكيد الموعد نهائياً</p>

      <div className="mx-auto mt-10 max-w-xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-ink-400">{r.label}</span>
            <span dir={r.dir} className="font-semibold text-ink-900">
              {r.value}
            </span>
          </div>
        ))}
        {form.notes && (
          <div className="px-6 py-4">
            <span className="block text-sm text-ink-400">ملاحظات</span>
            <span className="mt-1 block text-ink-700">{form.notes}</span>
          </div>
        )}
        {attachments.length > 0 && (
          <div className="px-6 py-4">
            <span className="block text-sm text-ink-400">المرفقات المختارة</span>
            <ul className="mt-1.5 space-y-1">
              {attachments.map((f, i) => (
                <li key={`${f.name}-${i}`} className="text-sm text-ink-700">
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink-400">
        هذا طلب حجز موعد استشارة، وليس تأكيداً نهائياً — سيتواصل معك فريقنا لتثبيت الموعد
        {attachments.length > 0 && '، ولا تنسَ إرفاق ملفاتك عند الرد على رسالتنا أو عبر واتساب'}.
      </p>
    </div>
  );
}
