// Lightweight best-effort rate limiting for public write endpoints. Serverless
// invocations don't share state reliably across cold starts, so this is
// defense-in-depth against casual abuse/spam, not a hard guarantee.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const hits = new Map();

export function isRateLimited(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();

  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  return recent.length > MAX_REQUESTS;
}
