import FileDropField from './FileDropField.jsx';

export default function DetailsStep({ form, onChange, logoFiles, onLogoChange, designFiles, onDesignChange }) {
  const handle = (e) => onChange({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">بياناتك ومرفقاتك</h2>
      <p className="mt-2 text-center text-ink-400">سنستخدمها للتواصل معك وتأكيد الموعد</p>

      <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">الاسم الثلاثي</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handle}
            required
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="مثال: عبدالله محمد العتيبي"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">رقم الجوال</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handle}
            required
            dir="ltr"
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="05XXXXXXXX"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">اسم العلامة التجارية (اختياري)</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handle}
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="اسم علامتك التجارية إن وُجد"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">البريد الإلكتروني (اختياري)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handle}
            dir="ltr"
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="example@email.com"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">ملاحظات (اختياري)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handle}
            rows={4}
            className="w-full resize-none rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="أخبرنا المزيد عن فكرتك أو منتجك..."
          />
        </div>

        <div className="sm:col-span-2">
          <FileDropField
            label="شعارك (اختياري)"
            hint="PNG, JPG أو PDF"
            accept="image/*,.pdf"
            files={logoFiles}
            onChange={onLogoChange}
          />
        </div>
        <div className="sm:col-span-2">
          <FileDropField
            label="تصاميم أو مرجع للعبوة (اختياري)"
            hint="يمكنك اختيار أكثر من ملف"
            accept="image/*,.pdf"
            files={designFiles}
            onChange={onDesignChange}
          />
        </div>

        <div className="sm:col-span-2 rounded-xl bg-ink-50 p-4 text-xs leading-relaxed text-ink-400">
          ملاحظة: هذا النموذج لا يرفع الملفات مباشرة إلى خوادمنا — سنعرض أسماءها فقط ضمن طلبك، ويرجى
          إرفاقها فعلياً عند الرد على رسالة التأكيد التي سنرسلها لك، أو عبر واتساب.
        </div>
      </div>
    </div>
  );
}
