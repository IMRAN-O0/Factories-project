// Both endpoints are public and unauthenticated (no session/cookie), but they
// still trigger a DB write and an outbound email — so a classic cross-site
// <form> POST (which browsers send without any CORS preflight) could otherwise
// be used to spam them. Browsers always attach Origin on cross-site POSTs, so
// comparing it against the request's own Host is a reliable, session-free CSRF
// check for a JSON API like this one.
export function isSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
