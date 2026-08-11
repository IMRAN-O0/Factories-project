const UUID_PREFIXED_PATH = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-.+$/i;
const MAX_FIELD_LENGTH = 300;
const MAX_TEXT_LENGTH = 5000;
const MAX_FILES = 10;

export function isNonEmptyString(value, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

export function isOptionalString(value, maxLength = MAX_FIELD_LENGTH) {
  return value === undefined || value === null || value === '' || (typeof value === 'string' && value.length <= maxLength);
}

export function isValidText(value, maxLength = MAX_TEXT_LENGTH) {
  return isOptionalString(value, maxLength);
}

// Strip CR/LF and cap length before a value is interpolated into an email
// subject line, so a submitted name can't inject extra headers.
export function sanitizeHeaderValue(value, maxLength = 150) {
  return String(value).replace(/[\r\n]+/g, ' ').slice(0, maxLength);
}

// Only accept file references that point at a path our own upload helper generated
// (a random UUID prefix), so the server never signs/looks up arbitrary caller-supplied
// storage paths. Also bounds the array size to prevent abuse.
export function sanitizeFileRefs(files) {
  if (!Array.isArray(files)) return [];
  return files
    .filter(
      (f) =>
        f &&
        typeof f === 'object' &&
        isNonEmptyString(f.name) &&
        typeof f.path === 'string' &&
        UUID_PREFIXED_PATH.test(f.path)
    )
    .slice(0, MAX_FILES)
    .map((f) => ({ name: f.name, path: f.path }));
}
