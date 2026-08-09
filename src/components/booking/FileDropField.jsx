import { useRef } from 'react';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileDropField({ label, hint, files, onChange, accept, multiple = true }) {
  const inputRef = useRef(null);

  const handlePick = (e) => {
    const picked = Array.from(e.target.files || []);
    onChange(multiple ? [...files, ...picked] : picked.slice(0, 1));
    e.target.value = '';
  };

  const removeAt = (idx) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 px-4 py-5 text-sm text-ink-400 transition-colors hover:border-brand-400 hover:text-brand-600"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        اضغط لاختيار {multiple ? 'ملفات' : 'ملف'}
      </button>
      {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}

      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handlePick} className="hidden" />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-brand-50 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2 text-brand-800">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0">
                  <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-brand-500">({formatSize(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={() => removeAt(idx)}
                aria-label="إزالة الملف"
                className="shrink-0 text-brand-500 transition-colors hover:text-red-500"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
