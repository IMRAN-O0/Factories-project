import { DayPicker } from 'react-day-picker';
import { arSA, enUS } from 'react-day-picker/locale';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function DateTimeStep({ date, onDateChange, time, onTimeChange }) {
  const { t, isRTL } = useLanguage();
  const dt = t('booking.dateTime');

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900 dark:text-night-50">{dt.heading}</h2>
      <p className="mt-2 text-center text-ink-400 dark:text-night-200">{dt.subheading}</p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="glass relative flex justify-center rounded-2xl p-4">
          <DayPicker
            mode="single"
            dir={isRTL ? 'rtl' : 'ltr'}
            locale={isRTL ? arSA : enUS}
            selected={date}
            onSelect={onDateChange}
            disabled={[{ before: today }, { dayOfWeek: [5, 6] }]}
            className="!m-0"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink-700 dark:text-night-100">{dt.timeLabel}</p>
          {!date ? (
            <p className="rounded-xl bg-ink-50 p-6 text-center text-sm text-ink-400 dark:bg-night-800 dark:text-night-200">
              {dt.emptyState}
            </p>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {dt.timeSlots.map((slot) => {
                const active = time === slot;
                return (
                  <motion.button
                    key={slot}
                    type="button"
                    variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
                    onClick={() => onTimeChange(slot)}
                    dir="ltr"
                    className={`rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-ink-100 bg-white text-ink-700 hover:border-brand-300 dark:border-night-600 dark:bg-night-800 dark:text-night-100 dark:hover:border-brand-700'
                    }`}
                  >
                    {slot}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
