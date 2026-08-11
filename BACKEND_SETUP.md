# تفعيل الباك-إند الحقيقي (حفظ الطلبات + رفع الملفات + إشعار بريد فوري)

الكود جاهز وموجود في المستودع (`/api`)، لكنه يحتاج منك خطوتين بسيطتين لتفعيله فعلياً:
إنشاء حسابين مجانيين، ولصق بضع مفاتيح في إعدادات الاستضافة. لن تحتاج ترسل لي أي كلمة سر —
تضعها مباشرة في لوحة تحكم الاستضافة.

**الطريقة المقترحة (الأسهل مع GitHub):** استضافة الموقع على **Vercel** — مجاني، ويتكامل
تلقائياً مع مستودع GitHub الحالي (كل push يعيد النشر تلقائياً)، ويدعم دوال الـ API
الموجودة في `/api` بدون أي إعداد إضافي.

---

## 1) إنشاء مشروع Supabase (قاعدة البيانات + تخزين الملفات)

1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ حساباً مجانياً ومشروعاً جديداً.
2. من **SQL Editor** داخل المشروع، شغّل هذا الكود لإنشاء الجداول:

```sql
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  brand text,
  phone text not null,
  message text not null
);

create table if not exists booking_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service text not null,
  packaging text not null,
  preferred_date date,
  preferred_time text,
  name text not null,
  brand text,
  phone text not null,
  email text,
  notes text,
  logo_files jsonb not null default '[]',
  design_files jsonb not null default '[]'
);

alter table contact_submissions enable row level security;
alter table booking_submissions enable row level security;
-- عمداً لا نضيف أي policy هنا: يعني لا أحد من المتصفح يقدر يقرأ أو يكتب مباشرة.
-- دوال الـ API تستخدم service_role key الذي يتجاوز RLS، وهذا آمن لأنه سري وموجود على السيرفر فقط.
```

3. من **Storage**، أنشئ bucket جديد باسم بالضبط: `booking-uploads`، واختر **Private** (غير عام).
4. من **SQL Editor** مرة أخرى، شغّل هذا لتفعيل الرفع من الموقع مباشرة:

```sql
create policy "Allow public inserts to booking-uploads"
on storage.objects for insert
to anon
with check (bucket_id = 'booking-uploads');
```

5. من **Project Settings → API**، انسخ 3 قيم:
   - `Project URL` → استخدمه لكل من `VITE_SUPABASE_URL` و `SUPABASE_URL`
   - `anon public` key → استخدمه لـ `VITE_SUPABASE_ANON_KEY`
   - `service_role` key (سري، لا تكشفه أبداً) → استخدمه لـ `SUPABASE_SERVICE_ROLE_KEY`

---

## 2) إنشاء حساب Resend (لإرسال إشعار بريد فوري لكل طلب)

1. اذهب إلى [resend.com](https://resend.com) وأنشئ حساباً مجانياً.
2. من **API Keys**، أنشئ مفتاحاً جديداً وانسخه لـ `RESEND_API_KEY`.
3. مبدئياً الإرسال سيكون من عنوان `onboarding@resend.dev` (يعمل مباشرة بدون أي إعداد DNS).
   لاحقاً يمكنك ربط نطاقكم الخاص (`awalhelm.com`) من نفس اللوحة إذا رغبتم أن يظهر
   البريد وكأنه مرسل من نطاقكم.

---

## 3) وضع المفاتيح في Vercel

بعد ربط المستودع بـ Vercel (Import Project من GitHub)، اذهب إلى
**Project Settings → Environment Variables** وأضف:

| المتغير | القيمة |
|---|---|
| `VITE_SUPABASE_URL` | من الخطوة 1 |
| `VITE_SUPABASE_ANON_KEY` | من الخطوة 1 |
| `SUPABASE_URL` | نفس Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | من الخطوة 1 (سري) |
| `RESEND_API_KEY` | من الخطوة 2 |
| `NOTIFY_EMAIL` | `info@awalhelm.com` |
| `VITE_GA_MEASUREMENT_ID` | (اختياري) معرّف Google Analytics 4 |

ثم أعد النشر (Redeploy). من هذه اللحظة، نموذج "تواصل معنا" وحجز الموعد سيحفظان
البيانات فعلياً في قاعدة البيانات، وترفع الملفات فعلياً، ويصلك بريد فوري لكل طلب.

**ملاحظة مهمة:** قبل ما تكمل هذي الخطوات، النموذجين يعملان بنفس الطريقة القديمة
(`mailto:`) تلقائياً بدون أي كسر — الموقع يكتشف عدم وجود الإعدادات ويرجع للطريقة
القديمة كحل احتياطي.
