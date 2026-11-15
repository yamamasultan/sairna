
export default function PassengerForm({
  seatNumber,
  passenger,
  onChange,
  onNext,
  onBack,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <section
      className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7"
      dir="rtl"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* العنوان */}
      <header className="mb-6 flex items-center justify-between gap-3 sm:mb-7 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl lg:text-2xl">
            مين مسافر معنا؟
          </h2>

          <p className="mt-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
            أدخلي بيانات المسافر المرتبط بالمقعد المختار.
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-xl text-[var(--primary)] sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          ♙
        </span>
      </header>

      <form onSubmit={handleSubmit}>
        {/* معلومات المسافر */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 sm:mb-6 sm:p-4">
          <strong className="text-sm font-bold text-[var(--text)]">
            المسافر 1
          </strong>

          <span className="rounded-full bg-[var(--soft-teal)] px-3 py-2 text-xs font-semibold text-[var(--primary-deep)] sm:px-4">
            مقعد رقم {seatNumber}
          </span>
        </div>

        {/* حقول البيانات */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="flex min-w-0 flex-col gap-2">
            <span className="text-sm font-semibold text-[var(--text)]">
              الاسم الكامل <b className="text-red-500">*</b>
            </span>

            <input
              type="text"
              name="name"
              value={passenger.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="مثال: أحمد خالد"
              autoComplete="name"
              required
              minLength={3}
              maxLength={100}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--soft-teal)]"
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2">
            <span className="text-sm font-semibold text-[var(--text)]">
              رقم الموبايل <b className="text-red-500">*</b>
            </span>

            <input
              type="tel"
              name="phone"
              value={passenger.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              placeholder="09xxxxxxxx"
              autoComplete="tel"
              required
              minLength={8}
              maxLength={20}
              pattern="[0-9+ ]{8,20}"
              title="أدخلي رقم هاتف صحيحاً باستخدام الأرقام فقط"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--soft-teal)]"
            />
          </label>
        </div>

        {/* التنبيه */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 text-xs leading-7 text-[var(--text)] sm:mt-6 sm:p-4 sm:text-sm">
          <span className="shrink-0 text-lg text-[var(--primary)]">
            ⓘ
          </span>

          <p>
            هذه بيانات تجريبية ضمن المشروع التعليمي. تأكدي من صحتها قبل المتابعة.
          </p>
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-200 hover:bg-[var(--surface-alt)] sm:w-auto"
          >
            السابق
          </button>

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] hover:shadow-md sm:w-auto"
          >
            متابعة الحجز <span className="mr-2">←</span>
          </button>
        </div>
      </form>
    </section>
  );
}
