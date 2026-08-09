import { motion } from 'framer-motion';
import logoWhite from '../assets/logo-white.png';
import Reveal from './Reveal.jsx';

const POINTS = [
  'التزام كامل بمعايير الجودة والسلامة في كل مراحل التصنيع',
  'دعم مباشر لرؤية 2030 وتوطين صناعة مستحضرات التجميل محلياً',
  'مرونة في أحجام الإنتاج تناسب العلامات الناشئة والكبيرة',
  'فريق متخصص يرافقك من الفكرة الأولى وحتى المنتج النهائي',
];

export default function About() {
  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0" y={30}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-10 md:p-12 aspect-[4/5] flex flex-col justify-between">
            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <img src={logoWhite} alt="" aria-hidden="true" className="h-14 w-auto opacity-90" />
            <div className="relative">
              <p className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
                "نصنع الثقة قبل أن نصنع المنتج"
              </p>
              <p className="mt-4 text-sm text-white/75">فلسفتنا في مصنع أول حلم لصناعة مستحضرات التجميل</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">من نحن</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-900 md:text-4xl text-balance">
              شريكك الصناعي في عالم مستحضرات التجميل
            </h2>
            <p className="mt-5 leading-loose text-ink-400">
              مصنع أول حلم متخصص في تصنيع مستحضرات التجميل بجميع أنواعها؛
              العناية بالبشرة، العناية بالشعر، منتجات العناية اليومية والمكياج،
              وذلك تحت علامتك التجارية الخاصة. نؤمن بأن كل فكرة تستحق أن تتحول
              إلى منتج حقيقي بجودة تنافس الأسواق العالمية، وبانسجام تام مع
              توجهات رؤية المملكة 2030 في دعم الصناعة الوطنية وتنويع الاقتصاد.
            </p>
          </Reveal>

          <motion.ul
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="mt-8 space-y-4"
          >
            {POINTS.map((point) => (
              <motion.li
                key={point}
                variants={{
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-ink-700">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
