import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader.jsx';
import Stepper from '../components/booking/Stepper.jsx';
import ServiceStep from '../components/booking/ServiceStep.jsx';
import PackagingStep from '../components/booking/PackagingStep.jsx';
import DateTimeStep from '../components/booking/DateTimeStep.jsx';
import DetailsStep from '../components/booking/DetailsStep.jsx';
import ReviewStep from '../components/booking/ReviewStep.jsx';
import SuccessScreen from '../components/booking/SuccessScreen.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { isBackendConfigured } from '../lib/supabaseClient.js';
import { uploadBookingFiles } from '../lib/uploadBookingFiles.js';

const CONTACT_EMAIL = 'info@awalhelm.com';
const TOTAL_STEPS = 5;

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

function formatDate(date, isRTL) {
  if (!date) return '';
  return new Intl.DateTimeFormat(isRTL ? 'ar-SA-u-nu-latn' : 'en-US', {
    calendar: 'gregory',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function BookingPage() {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState('');
  const [packaging, setPackaging] = useState('');
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', brand: '', phone: '', email: '', notes: '' });
  const [logoFiles, setLogoFiles] = useState([]);
  const [designFiles, setDesignFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const stepTopRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepTopRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [step, submitted]);

  const canProceed =
    (step === 1 && !!service) ||
    (step === 2 && !!packaging) ||
    (step === 3 && !!date && !!time) ||
    (step === 4 && !!form.name && !!form.phone) ||
    step === 5;

  const goNext = () => {
    if (!canProceed) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const submitViaMailto = (serviceLabel, packagingLabel) => {
    const attachments = [...logoFiles, ...designFiles].map((f) => f.name);
    const e = t('booking.email');
    const subject = encodeURIComponent(`${e.subjectPrefix} ${form.name}`);
    const body = encodeURIComponent(
      `${e.service}: ${serviceLabel}\n${e.packaging}: ${packagingLabel}\n${e.date}: ${formatDate(date, isRTL)}\n${e.time}: ${time}\n\n${e.name}: ${form.name}\n${e.brand}: ${form.brand || '—'}\n${e.phone}: ${form.phone}\n${e.email}: ${form.email || '—'}\n\n${e.notes}:\n${form.notes || '—'}${
        attachments.length ? `\n\n${e.attachments}:\n${attachments.join('\n')}` : ''
      }`
    );
    const link = document.createElement('a');
    link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    link.click();
    setSubmitted(true);
  };

  const handleSubmit = async () => {
    const serviceLabel = t('booking.service.options').find((s) => s.id === service)?.title ?? service;
    const packagingLabel = t('booking.packaging.options').find((p) => p.id === packaging)?.title ?? packaging;

    if (!isBackendConfigured) {
      submitViaMailto(serviceLabel, packagingLabel);
      return;
    }

    setSubmitting(true);
    setSubmitError(false);
    try {
      const [uploadedLogos, uploadedDesigns] = await Promise.all([
        uploadBookingFiles(logoFiles),
        uploadBookingFiles(designFiles),
      ]);

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: serviceLabel,
          packaging: packagingLabel,
          date: date ? date.toISOString().slice(0, 10) : '',
          time,
          name: form.name,
          brand: form.brand,
          phone: form.phone,
          email: form.email,
          notes: form.notes,
          logoFiles: uploadedLogos,
          designFiles: uploadedDesigns,
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const p = t('pages.booking');
  const nav = t('booking.nav');

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <section className="mesh-bg section-py dark:bg-night-900">
        <div className="container-px mx-auto max-w-4xl">
          <div ref={stepTopRef} className="scroll-mt-28" />
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
                  {step === 2 && <PackagingStep value={packaging} onChange={setPackaging} />}
                  {step === 3 && (
                    <DateTimeStep date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />
                  )}
                  {step === 4 && (
                    <DetailsStep
                      form={form}
                      onChange={setForm}
                      logoFiles={logoFiles}
                      onLogoChange={setLogoFiles}
                      designFiles={designFiles}
                      onDesignChange={setDesignFiles}
                    />
                  )}
                  {step === 5 && (
                    <ReviewStep
                      service={service}
                      packaging={packaging}
                      date={date}
                      time={time}
                      form={form}
                      logoFiles={logoFiles}
                      designFiles={designFiles}
                    />
                  )}
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
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink-600 transition-opacity disabled:opacity-0 dark:text-night-100"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M4 12h16M10 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {nav.back}
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
                >
                  {nav.next}
                  <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`}>
                    <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? nav.submitting : nav.submit}
                </button>
              )}
            </div>
          )}

          {submitError && (
            <p className="mx-auto mt-6 max-w-xl rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {t('booking.submitError')}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
