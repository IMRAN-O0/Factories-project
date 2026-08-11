import { getSupabaseAdmin } from './_lib/supabaseAdmin.js';
import { sendNotification, escapeHtml, escapeHtmlMultiline } from './_lib/email.js';
import {
  isNonEmptyString,
  isOptionalString,
  isValidText,
  sanitizeFileRefs,
  sanitizeHeaderValue,
} from './_lib/validate.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { isSameOrigin } from './_lib/csrf.js';

const BUCKET = 'booking-uploads';
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: 'طلب غير مسموح' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'محاولات كثيرة جداً، يرجى المحاولة لاحقاً' });
  }

  const {
    service,
    packaging,
    date,
    time,
    name,
    brand,
    phone,
    email,
    notes,
    logoFiles,
    designFiles,
  } = req.body || {};

  if (
    !isNonEmptyString(service) ||
    !isNonEmptyString(packaging) ||
    !isNonEmptyString(date, 20) ||
    !DATE_ONLY.test(date) ||
    !isNonEmptyString(time, 50) ||
    !isNonEmptyString(name) ||
    !isNonEmptyString(phone)
  ) {
    return res.status(400).json({ error: 'الرجاء تعبئة جميع الحقول المطلوبة' });
  }
  if (!isOptionalString(brand) || !isOptionalString(email) || !isValidText(notes)) {
    return res.status(400).json({ error: 'بيانات غير صالحة' });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return res.status(500).json({ error: 'الخدمة غير مهيأة بعد، يرجى التواصل عبر الواتساب أو البريد مباشرة' });
  }

  const safeLogoFiles = sanitizeFileRefs(logoFiles);
  const safeDesignFiles = sanitizeFileRefs(designFiles);

  const { data, error } = await supabase
    .from('booking_submissions')
    .insert({
      service,
      packaging,
      preferred_date: date,
      preferred_time: time,
      name,
      brand: brand || null,
      phone,
      email: email || null,
      notes: notes || null,
      logo_files: safeLogoFiles,
      design_files: safeDesignFiles,
    })
    .select('id')
    .single();

  if (error) {
    return res.status(500).json({ error: 'تعذر حفظ طلبك، حاول مرة أخرى' });
  }

  const allFiles = [...safeLogoFiles, ...safeDesignFiles];
  const links = await Promise.all(
    allFiles.map(async (f) => {
      const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(f.path, SIGNED_URL_TTL_SECONDS);
      return signed
        ? `<li><a href="${escapeHtml(signed.signedUrl)}">${escapeHtml(f.name)}</a></li>`
        : `<li>${escapeHtml(f.name)}</li>`;
    })
  );

  await sendNotification({
    subject: `طلب حجز جديد من ${sanitizeHeaderValue(name)}`,
    html: `
      <h2>طلب حجز موعد جديد</h2>
      <p><strong>الخدمة:</strong> ${escapeHtml(service)}</p>
      <p><strong>نوع العبوة:</strong> ${escapeHtml(packaging)}</p>
      <p><strong>التاريخ:</strong> ${escapeHtml(date)} — <strong>الوقت:</strong> ${escapeHtml(time)}</p>
      <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p><strong>العلامة التجارية:</strong> ${escapeHtml(brand || '—')}</p>
      <p><strong>رقم الجوال:</strong> ${escapeHtml(phone)}</p>
      <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email || '—')}</p>
      <p><strong>ملاحظات:</strong><br/>${escapeHtmlMultiline(notes || '—')}</p>
      ${allFiles.length ? `<p><strong>المرفقات:</strong></p><ul>${links.join('')}</ul>` : ''}
    `,
  });

  return res.status(200).json({ id: data.id });
}
