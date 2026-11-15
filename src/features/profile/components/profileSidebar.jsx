import { Ticket, LogOut } from 'lucide-react';

export default function ProfileSidebar({ user, onLogout }) {
  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <aside className="flex flex-col items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 text-center shadow-sm transition-colors duration-300">
      {/* مربع الحرف الأول */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[22px] bg-[var(--soft-teal)] text-3xl font-black text-[var(--primary)]">
        {initial}
      </div>

      {/* الاسم والبريد */}
      <h2 className="text-xl font-extrabold text-[var(--text)]">
        {user?.name || 'مستخدم سيرنا'}
      </h2>
      <p dir="ltr" className="mt-1 text-sm font-medium text-[var(--muted)]">
        {user?.email || 'user@example.com'}
      </p>

      {/* شريط الحجوزات المحفوظة */}
      <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--surface-alt)] px-4 py-3.5 text-sm font-bold text-[var(--text)]">
        <Ticket className="h-4 w-4 text-[var(--primary)]" />
        <span>0 حجوزات محفوظة</span>
      </div>

      {/* زر تسجيل الخروج */}
      <button
        type="button"
        onClick={onLogout}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm font-extrabold text-[var(--text)] transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-800/60 dark:hover:bg-red-950/40 dark:hover:text-red-400"
      >
        <LogOut className="h-4 w-4" />
        <span>تسجيل الخروج</span>
      </button>
    </aside>
  );
}