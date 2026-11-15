import { Sparkles } from 'lucide-react';

export default function HelpHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-alt)] border-b border-[var(--border)] pt-12 pb-14 md:pt-16 md:pb-20 transition-colors duration-300">
      {/* تدرج لوني ناعم في الخلفية يطابق التصميم */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, var(--soft-teal) 0%, transparent 55%)',
        }}
      />

      {/* الدائرة الزخرفية المتقطعة في الزاوية اليسرى */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 rounded-full border border-dashed border-[var(--primary)]/20 bg-[var(--soft-teal)]/25"
      />

      <div className="container relative z-10 text-right">
        {/* شارة نحن معك */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--soft-teal)] text-[var(--primary)] text-xs md:text-sm font-bold mb-5 border border-[var(--primary)]/15">
          <Sparkles className="w-4 h-4" />
          <span>نحن معك</span>
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text)] tracking-tight mb-3">
          شو حابب <span className="text-[var(--primary)]">تعرف؟</span>
        </h1>

        {/* الوصف المختصر */}
        <p className="text-sm md:text-base text-[var(--muted)] max-w-lg leading-relaxed">
          أسئلة بتساعدك تستخدم نموذج سيرنا بسهولة.
        </p>
      </div>
    </section>
  );
}