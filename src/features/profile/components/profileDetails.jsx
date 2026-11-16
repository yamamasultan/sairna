import { ArrowLeft } from 'lucide-react';

export default function ProfileDetails({ user, onGoToBookings }) {
  return (
    <div className="flex flex-col justify-between rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm transition-colors duration-300">
      <div>
        <h2 className="mb-6 text-xl font-extrabold text-[var(--text)]">
          معلومات الحساب
        </h2>

        <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
          {/* الاسم الكامل */}
          <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-[var(--muted)]">
              الاسم الكامل
            </span>
            <span className="text-sm font-extrabold text-[var(--text)]">
              {user?.name || '-'}
            </span>
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-[var(--muted)]">
              البريد الإلكتروني
            </span>
            <span dir="ltr" className="text-sm font-extrabold text-[var(--text)]">
              {user?.email || '-'}
            </span>
          </div>

          {/* نوع الحساب */}
          <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-[var(--muted)]">
              نوع الحساب
            </span>
            <span className="text-sm font-extrabold text-[var(--text)]">
              حساب تجريبي
            </span>
          </div>
        </div>
      </div>

      {/* زر انتقل لحجوزاتي */}
      <div className="mt-8 flex justify-start">
        <button
          type="button"
          onClick={onGoToBookings}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-[var(--primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(10,169,155,0.25)] transition-all hover:bg-[var(--primary-deep)] active:scale-[0.99] sm:w-auto"
        >
          <span>انتقل لحجوزاتي</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}