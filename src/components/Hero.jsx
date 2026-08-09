import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoGreen from '../assets/logo-green.png';
import ImagePlaceholder from './ImagePlaceholder.jsx';

const container = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 pb-24 md:pt-44 md:pb-32">
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
        <motion.div variants={container} initial="initial" animate="animate" className="mx-auto max-w-4xl text-center">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700"
          >
            من الفكرة إلى المنتج النهائي
          </motion.span>

          <motion.h1 variants={item} className="mt-7 text-balance text-4xl font-extrabold leading-[1.2] text-ink-900 sm:text-5xl md:text-6xl">
            نحوّل حلمك إلى علامة تجارية
            <br />
            <span className="text-brand-600">لمستحضرات التجميل</span>
          </motion.h1>

          <motion.p variants={item} className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400 md:text-xl">
            مصنع أول حلم يرافقك في كل خطوة: تطوير التركيبات، التصنيع الخاص
            (Private Label)، الهوية والتغليف، وصولاً إلى إطلاق علامتك في
            السوق — بجودة تصنيعية موثوقة ومطابقة للمعايير.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-transform hover:-translate-y-0.5 hover:bg-brand-700"
            >
              احجز موعد مجاناً
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-ink-200 px-8 py-3.5 text-base font-semibold text-ink-800 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              تعرّف على خدماتنا
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <ImagePlaceholder aspect="aspect-[16/7]" label="صورة رئيسية للمصنع أو المنتجات" />
        </motion.div>
      </div>
    </section>
  );
}
