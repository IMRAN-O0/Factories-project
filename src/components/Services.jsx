import ImagePlaceholder from './ImagePlaceholder.jsx';

const SERVICES = [
  {
    number: '01',
    title: 'تطوير التركيبات',
    desc: 'نبتكر تركيبات كريمات، سيروم، لوشن، ومنتجات عناية بالبشرة والشعر مصمّمة خصيصاً لهوية علامتك ورغبات عملائك.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <path d="M20 6h8v8l6 12v10a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V26l6-12V6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M16 32h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'الهوية والتغليف',
    desc: 'نصمم هوية بصرية وتغليفاً فاخراً يعكس شخصية علامتك التجارية ويميزها على الرفوف وفي أذهان العملاء.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8 22h32" stroke="currentColor" strokeWidth="2.2" />
        <path d="M18 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'التصنيع الخاص',
    desc: 'تصنيع Private Label بكميات مرنة تناسب أعمالك، مع رقابة جودة صارمة ومطابقة للاشتراطات التنظيمية.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" />
        <path d="M24 16v8l6 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'إطلاق العلامة التجارية',
    desc: 'نرافقك في خطوات الإطلاق، من التوثيق والتراخيص إلى الدعم التسويقي، حتى وصول منتجك إلى السوق بثقة.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <path d="M24 6c6 6 9 13 9 20a9 9 0 1 1-18 0c0-7 3-14 9-20Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M24 30v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="section-py bg-ink-50/60">
      <div className="container-px mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">خدماتنا</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 md:text-4xl">رحلتك معنا في أربع خطوات</h2>
          <p className="mt-4 text-ink-400">
            من أول فكرة حتى منتج جاهز على الرف، نوفر لك تصنيعاً متكاملاً لمستحضرات التجميل تحت علامتك الخاصة.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.number}
              className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <ImagePlaceholder aspect="aspect-[4/3]" label={`صورة ${s.title}`} className="rounded-none border-0 border-b-2 border-dashed border-brand-200" />
              <div className="relative p-7">
                <span className="absolute left-6 top-6 text-xs font-bold text-ink-100 transition-colors group-hover:text-brand-100">
                  {s.number}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  {s.icon}
                </div>
                <h3 className="mt-6 text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
