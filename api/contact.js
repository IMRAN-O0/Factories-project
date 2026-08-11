import { getSupabaseAdmin } from './_lib/supabaseAdmin.js';
import { sendNotification, escapeHtml, escapeHtmlMultiline } from './_lib/email.js';
import { isNonEmptyString, isOptionalString, isValidText, sanitizeHeaderValue } from './_lib/validate.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { isSameOrigin } from './_lib/csrf.js';

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

  const { name, brand, phone, message } = req.body || {};

  if (!isNonEmptyString(name) || !isNonEmptyString(phone) || !isValidText(message) || !message?.trim()) {
    return res.status(400).json({ error: 'الاسم ورقم الجوال والرسالة مطلوبة' });
  }
  if (!isOptionalString(brand)) {
    return res.status(400).json({ error: 'بيانات غير صالحة' });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return res.status(500).json({ error: 'الخدمة غير مهيأة بعد، يرجى التواصل عبر الواتساب أو البريد مباشرة' });
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({ name, brand: brand || null, phone, message })
    .select('id')
    .single();

  if (error) {
    return res.status(500).json({ error: 'تعذر حفظ طلبك، حاول مرة أخرى' });
  }

  await sendNotification({
    subject: `طلب استشارة جديد من ${sanitizeHeaderValue(name)}`,
    html: `
      <h2>طلب استشارة جديد</h2>
      <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p><strong>العلامة التجارية:</strong> ${escapeHtml(brand || '—')}</p>
      <p><strong>رقم الجوال:</strong> ${escapeHtml(phone)}</p>
      <p><strong>الرسالة:</strong><br/>${escapeHtmlMultiline(message)}</p>
    `,
  });

  return res.status(200).json({ id: data.id });
}
