import { useState } from 'react';
import Reveal from './Reveal.jsx';

const CONTACT_EMAIL = 'info@awalhelm.com';
const CONTACT_PHONE = '+966 5X XXX XXXX';
const WHATSAPP_LINK = 'https://wa.me/9665XXXXXXXX';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`طلب استشارة من ${form.name || 'زائر الموقع'}`);
    const body = encodeURIComponent(
      `الاسم: ${form.name}\nرقم الجوال: ${form.phone}\n\nالرسالة:\n${form.message}`
    );
    const link = document.createElement('a');
    link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    link.click();
  };

  return (
    <section className="section-py bg-ink-50/60">
      <div className="container-px mx-auto grid grid-cols-1 gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">تواصل معنا</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 md:text-4xl text-balance">
            جاهزون لتحويل فكرتك إلى منتج
          </h2>
          <p className="mt-5 leading-loose text-ink-400">
            راسلنا اليوم واحصل على استشارة مجانية حول تصنيع مستحضرات التجميل
            الخاصة بعلامتك. فريقنا جاهز للإجابة على كل استفساراتك.
          </p>

          <div className="mt-8 space-y-5">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-ink-700 group-hover:text-brand-700">{CONTACT_EMAIL}</span>
            </a>

            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 5a2 2 0 0 1 1-2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span dir="ltr" className="text-ink-700 group-hover:text-brand-700">
                {CONTACT_PHONE}
              </span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M20 12a8 8 0 1 1-3.6-6.66L20 4l-1.2 4.2A7.96 7.96 0 0 1 20 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-ink-700 group-hover:text-brand-700">راسلنا عبر واتساب</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-soft">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-sm font-medium text-ink-700">الاسم</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                dir="ltr"
                className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                placeholder="05XXXXXXXX"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-ink-700">رسالتك</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                placeholder="أخبرنا عن فكرتك أو منتجك..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-600 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.98]"
          >
            إرسال الطلب
          </button>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
