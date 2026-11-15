
const periods = [
  { id: "all", label: "كل الأوقات" },
  { id: "morning", label: "صباحاً (قبل 12)" },
  { id: "afternoon", label: "ظهراً (12–17)" },
  { id: "evening", label: "مساءً (بعد 17)" },
];

export default function FilterSideBar({
  companies,
  selectedCompanyId,
  onCompanyChange,
  departurePeriod,
  onDeparturePeriodChange,
  onReset,
}) {
  return (
    <aside
      className="
        h-fit min-w-0 rounded-[var(--radius)]
        border border-[var(--border)]
        bg-[var(--surface)] p-4
        transition-colors duration-300
        sm:p-6
      "
      dir="rtl"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* العنوان */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
        <h3 className="text-base font-bold text-[var(--text)] sm:text-lg">
          ⚲ تصفية النتائج
        </h3>

        <button
          type="button"
          onClick={onReset}
          className="
            shrink-0 text-sm font-bold text-[var(--primary)]
            transition-colors duration-200
            hover:text-[var(--primary-deep)] hover:underline
          "
        >
          إعادة ضبط
        </button>
      </div>

      {/* شركات النقل */}
      <div className="mt-6">
        <h4 className="mb-4 font-bold text-[var(--text)]">
          شركة النقل
        </h4>

        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <span>كل الشركات</span>

            <input
              type="radio"
              name="company"
              checked={selectedCompanyId === "all"}
              onChange={() => onCompanyChange("all")}
              className="accent-[var(--primary)]"
            />
          </label>

          {companies.map((company) => (
            <label
              key={company.id}
              className="
                flex cursor-pointer items-center
                justify-between gap-3 text-sm
                text-[var(--muted)]
              "
            >
              <span className="min-w-0 break-words">
                {company.name}
              </span>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-md bg-[var(--surface-alt)] px-2 py-1 text-xs text-[var(--muted)]">
                  {company.count}
                </span>

                <input
                  type="radio"
                  name="company"
                  checked={selectedCompanyId === company.id}
                  onChange={() => onCompanyChange(company.id)}
                  className="accent-[var(--primary)]"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* وقت الانطلاق */}
      <div className="mt-8">
        <h4 className="mb-4 font-bold text-[var(--text)]">
          وقت الانطلاق
        </h4>

        <div className="space-y-4">
          {periods.map((period) => (
            <label
              key={period.id}
              className="
                flex cursor-pointer items-center
                justify-between gap-3 text-sm
                text-[var(--muted)]
              "
            >
              <span>{period.label}</span>

              <input
                type="radio"
                name="period"
                checked={departurePeriod === period.id}
                onChange={() =>
                  onDeparturePeriodChange(period.id)
                }
                className="accent-[var(--primary)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* ملاحظة الحجز */}
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--soft-teal)] p-4">
        <h4 className="font-bold text-[var(--text)]">
          ✓ الحجز بشكل واضح
        </h4>

        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          كل تفاصيل الرحلة أمامك قبل التأكيد.
        </p>
      </div>
    </aside>
  );
}
