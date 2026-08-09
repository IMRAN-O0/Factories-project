import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import ImagePlaceholder from './ImagePlaceholder.jsx';

export default function AboutTeaser() {
  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal y={30}>
          <ImagePlaceholder aspect="aspect-[4/5]" label="صورة المصنع أو الفريق" />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">من نحن</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-900 md:text-4xl text-balance">
            شريكك الصناعي في عالم مستحضرات التجميل
          </h2>
          <p className="mt-5 leading-loose text-ink-400">
            مصنع أول حلم متخصص في تصنيع مستحضرات التجميل بجميع أنواعها تحت
            علامتك التجارية الخاصة، بجودة تصنيعية موثوقة وانسجام تام مع
            توجهات رؤية المملكة 2030 في دعم الصناعة الوطنية.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            تعرّف علينا أكثر
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rotate-180">
              <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
