
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
      className="h-fit rounded-[22px] border border-[#e4ecef] bg-white p-6"
      dir="rtl"
    >
      <div className="flex items-center justify-between border-b border-[#e4ecef] pb-5">
        <h3 className="text-lg font-bold text-[#112F41]">
          ⚲ تصفية النتائج
        </h3>

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-bold text-[#0aa99b] hover:underline"
        >
          إعادة ضبط
        </button>
      </div>

      <div className="mt-6">
        <h4 className="mb-4 font-bold text-[#112F41]">
          شركة النقل
        </h4>

        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-[#718493]">
            <span>كل الشركات</span>
            <input
              type="radio"
              name="company"
              checked={selectedCompanyId === "all"}
              onChange={() => onCompanyChange("all")}
              className="accent-[#0aa99b]"
            />
          </label>

          {companies.map((company) => (
            <label
              key={company.id}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm text-[#718493]"
            >
              <span>{company.name}</span>

              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#f2f7f8] px-2 py-1 text-xs">
                  {company.count}
                </span>

                <input
                  type="radio"
                  name="company"
                  checked={selectedCompanyId === company.id}
                  onChange={() => onCompanyChange(company.id)}
                  className="accent-[#0aa99b]"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="mb-4 font-bold text-[#112F41]">
          وقت الانطلاق
        </h4>

        <div className="space-y-4">
          {periods.map((period) => (
            <label
              key={period.id}
              className="flex cursor-pointer items-center justify-between text-sm text-[#718493]"
            >
              <span>{period.label}</span>

              <input
                type="radio"
                name="period"
                checked={departurePeriod === period.id}
                onChange={() =>
                  onDeparturePeriodChange(period.id)
                }
                className="accent-[#0aa99b]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-[#e6f8f3] p-4">
        <h4 className="font-bold text-[#112F41]">
          ✓ الحجز بشكل واضح
        </h4>
        <p className="mt-2 text-sm leading-7 text-[#718493]">
          كل تفاصيل الرحلة أمامك قبل التأكيد.
        </p>
      </div>
    </aside>
  );
}
