import { Sparkles, Hand } from 'lucide-react';

export default function ProfileHero({ userName }) {
  const firstName = userName ? userName.split(' ')[0] : 'بك';

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-alt)] py-10 md:py-14 transition-colors duration-300"
    >
      {/* دائرة زخرفية خفيفة */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border border-[var(--primary)]/15"
      />

      <div className="container">
        {/* الشارة العلوية */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-xs font-bold text-[var(--primary-deep)] dark:text-[var(--primary)]">
          <Sparkles className="h-4 w-4 text-[var(--primary)]" />
          <span>ملفك الشخصي</span>
        </div>

        {/* الترحيب واسم المستخدم */}
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
          <span>أهلاً {firstName}</span>
          <Hand className="h-8 w-8 text-[var(--primary)] sm:h-10 sm:w-10" />
        </h1>

        <p className="max-w-xl text-sm text-[var(--muted)] sm:text-base">
          هون كل التفاصيل المتعلقة بحسابك التجريبي.
        </p>
      </div>
    </section>
  );
}