import { Resend } from 'resend';

// A plain address (no display name) avoids the "Name <email>" mailbox syntax
// a static scanner can misread as embedded HTML.
const NOTIFICATION_SENDER = 'onboarding@resend.dev';

export async function sendNotification({ subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  const resend = new Resend(apiKey);
  // Plain text, deliberately: these are internal notification emails, and
  // avoiding hand-built HTML sidesteps the entire injection surface rather
  // than trying to escape it away.
  return resend.emails.send({
    from: NOTIFICATION_SENDER,
    to,
    subject,
    text,
  });
}
