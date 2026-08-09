export default function DetailsStep({ form, onChange }) {
  const handle = (e) => onChange({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">بياناتك</h2>
      <p className="mt-2 text-center text-ink-400">سنستخدمها للتواصل معك وتأكيد الموعد</p>

      <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-700">الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handle}
            required
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
            placeholder="اسمك الكامل"
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
      </div>
    </div>
  );
}
