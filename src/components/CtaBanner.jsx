import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CtaBanner() {
  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-600 to-brand-700 px-8 py-14 text-center shadow-lg md:px-16 md:py-20">
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative text-balance text-2xl font-extrabold text-white md:text-4xl">
              جاهز تحوّل فكرتك إلى منتج حقيقي؟
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              احجز موعدك الآن مع فريقنا واحصل على استشارة مجانية حول تصنيع مستحضرات التجميل الخاصة بعلامتك.
            </p>
            <Link
              to="/booking"
              className="relative mt-8 inline-flex items-center justify-center rounded-full bg-white px-9 py-3.5 text-base font-semibold text-brand-700 transition-transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              احجز موعدك الآن
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
