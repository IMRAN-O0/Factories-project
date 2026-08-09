import logoGreen from '../assets/logo-green.png';

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-white pt-32 pb-24 md:pt-44 md:pb-32">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-100 blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-brand-50 blur-3xl" />
        <img
          src={logoGreen}
          alt=""
          aria-hidden="true"
          className="absolute -left-24 bottom-0 h-[26rem] w-auto opacity-[0.06] hidden md:block"
        />
      </div>

      <div className="container-px mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            من الفكرة إلى المنتج النهائي
          </span>

          <h1 className="mt-7 text-balance text-4xl font-extrabold leading-[1.2] text-ink-900 sm:text-5xl md:text-6xl">
            نحوّل حلمك إلى علامة تجارية
            <br />
            <span className="text-brand-600">لمستحضرات التجميل</span>
          </h1>

          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400 md:text-xl">
            مصنع أول حلم يرافقك في كل خطوة: تطوير التركيبات، التصنيع الخاص
            (Private Label)، الهوية والتغليف، وصولاً إلى إطلاق علامتك في
            السوق — بجودة تصنيعية موثوقة ومطابقة للمعايير.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-transform hover:-translate-y-0.5 hover:bg-brand-700"
            >
              احجز استشارة مجانية
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-ink-200 px-8 py-3.5 text-base font-semibold text-ink-800 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              تعرّف على خدماتنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
