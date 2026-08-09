const CAPABILITIES = [
  { label: 'عناية بالبشرة', desc: 'كريمات، سيروم، مرطبات، وأقنعة' },
  { label: 'عناية بالشعر', desc: 'شامبو، بلسم، وزيوت علاجية' },
  { label: 'العناية اليومية', desc: 'مستحضرات استحمام وعناية عامة' },
  { label: 'المكياج', desc: 'منتجات تجميل وألوان متنوعة' },
];

export default function Stats() {
  return (
    <section className="bg-ink-900 py-16 md:py-20">
      <div className="container-px mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">قدراتنا التصنيعية</span>
          <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">نصنع من أجل كل فئات مستحضرات التجميل</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:border-brand-500/40 hover:bg-white/[0.07]"
            >
              <p className="text-lg font-bold text-brand-400">{c.label}</p>
              <p className="mt-2 text-sm text-white/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
