export default function ImagePlaceholder({ label, aspect = 'aspect-square', className = '' }) {
  return (
    <div
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/60 text-brand-500 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 opacity-70">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m5 17 5-5 3 3 3-4 3 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {label && <span className="text-xs font-medium">{label}</span>}
    </div>
  );
}
