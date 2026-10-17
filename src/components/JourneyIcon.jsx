const PATHS = [
  // Concept — idea
  <g key="1">
    <path d="M24 6a12 12 0 0 0-7 21.7V32h14v-4.3A12 12 0 0 0 24 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M18 37h12M20 42h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </g>,
  // Product selection — formula flask
  <g key="2">
    <path d="M20 6h8v8l6 12v10a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V26l6-12V6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M16 32h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </g>,
  // Sampling — dropper
  <g key="3">
    <path d="M34 6.5a4.95 4.95 0 0 1 7 7l-4 4-7-7 4-4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M30 10.5l7 7-17 17-7 1.5 1.5-7 15.5-18.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M10 40.5c0-2 2-4.5 2-4.5s2 2.5 2 4.5a2 2 0 0 1-4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </g>,
  // Packaging — box
  <g key="4">
    <rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.2" />
    <path d="M8 22h32" stroke="currentColor" strokeWidth="2.2" />
    <path d="M18 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" stroke="currentColor" strokeWidth="2.2" />
  </g>,
  // Approval — approved document
  <g key="5">
    <path d="M12 6h17l9 9v25a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M29 6v9h9" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="m17 28 5 5 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </g>,
  // Manufacturing — factory
  <g key="6">
    <path d="M6 41V22l10 6v-6l10 6v-6l10 6V9h6v32H6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M13 35h4M23 35h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </g>,
  // Delivery — truck
  <g key="7">
    <path d="M4 12h24v22H4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M28 19h8l8 8v7H28" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="13" cy="36" r="4" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="35" cy="36" r="4" stroke="currentColor" strokeWidth="2.2" />
  </g>,
];

export default function JourneyIcon({ index, className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {Reflect.get(PATHS, index)}
    </svg>
  );
}
