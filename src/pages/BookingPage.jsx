import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader.jsx';
import Stepper from '../components/booking/Stepper.jsx';
import ServiceStep, { SERVICE_OPTIONS } from '../components/booking/ServiceStep.jsx';
import DateTimeStep from '../components/booking/DateTimeStep.jsx';
import DetailsStep from '../components/booking/DetailsStep.jsx';
import ReviewStep from '../components/booking/ReviewStep.jsx';
import SuccessScreen from '../components/booking/SuccessScreen.jsx';

const CONTACT_EMAIL = 'info@awalhelm.com';
const TOTAL_STEPS = 4;

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

function formatDate(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('ar-SA-u-nu-latn', {
    calendar: 'gregory',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const canProceed =
    (step === 1 && !!service) ||
    (step === 2 && !!date && !!time) ||
    (step === 3 && !!form.name && !!form.phone) ||
    step === 4;

  const goNext = () => {
    if (!canProceed) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    const serviceLabel = SERVICE_OPTIONS.find((s) => s.id === service)?.title ?? service;
    const subject = encodeURIComponent(`طلب حجز موعد من ${form.name}`);
    const body = encodeURIComponent(
      `الخدمة: ${serviceLabel}\nالتاريخ: ${formatDate(date)}\nالوقت: ${time}\n\nالاسم: ${form.name}\nرقم الجوال: ${form.phone}\nالبريد الإلكتروني: ${form.email || '—'}\n\nملاحظات:\n${form.notes || '—'}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="حجز موعد"
        title="احجز استشارتك المجانية"
        description="خطوات بسيطة لتحديد موعدك مع فريق مصنع أول حلم لمناقشة فكرة منتجك."
      />

      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-4xl">
          {!submitted && (
            <div className="mb-14">
              <Stepper current={step} />
            </div>
          )}

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SuccessScreen />
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 1 && <ServiceStep value={service} onChange={setService} />}
                  {step === 2 && (
                    <DateTimeStep date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />
                  )}
                  {step === 3 && <DetailsStep form={form} onChange={setForm} />}
                  {step === 4 && <ReviewStep service={service} date={date} time={time} form={form} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!submitted && (
            <div className="mx-auto mt-12 flex max-w-xl items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink-600 transition-opacity disabled:opacity-0"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M4 12h16M10 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                رجوع
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  التالي
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rotate-180">
                    <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700"
                >
                  إرسال طلب الحجز
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
