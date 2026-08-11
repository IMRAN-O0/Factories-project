import { Resend } from 'resend';
import escapeHtml from 'escape-html';

export { escapeHtml };

export async function sendNotification({ subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: 'Awal Helm Factory <onboarding@resend.dev>',
    to,
    subject,
    html,
  });
}
