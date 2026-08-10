import { DayPicker } from 'react-day-picker';
import { arSA } from 'react-day-picker/locale';
import { motion } from 'framer-motion';

const TIME_SLOTS = ['10:00 ص', '11:00 ص', '12:00 م', '01:00 م', '02:00 م', '04:00 م', '05:00 م'];

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function DateTimeStep({ date, onDateChange, time, onTimeChange }) {
  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">اختر الموعد المناسب</h2>
      <p className="mt-2 text-center text-ink-400">نعمل من السبت إلى الخميس، وسنؤكد الموعد معك خلال 24 ساعة</p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="glass flex justify-center rounded-2xl p-4">
          <DayPicker
            mode="single"
            dir="rtl"
            locale={arSA}
            selected={date}
            onSelect={onDateChange}
            disabled={[{ before: today }, { dayOfWeek: [5, 6] }]}
            className="!m-0"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink-700">الوقت المناسب</p>
          {!date ? (
            <p className="rounded-xl bg-ink-50 p-6 text-center text-sm text-ink-400">اختر تاريخاً أولاً لعرض الأوقات المتاحة</p>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {TIME_SLOTS.map((slot) => {
                const active = time === slot;
                return (
                  <motion.button
                    key={slot}
                    type="button"
                    variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
                    onClick={() => onTimeChange(slot)}
                    className={`rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-ink-100 bg-white text-ink-700 hover:border-brand-300'
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
