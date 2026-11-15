
export default function BusCompaniesBar({
  companies,
  selectedCompanyId,
  onCompanyChange,
}) {
  return (
    <section className="mt-8" dir="rtl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#112F41]">
            اختيار شركة النقل
          </h2>
          <p className="mt-1 text-sm text-[#718493]">
            حدد الشركة التي تفضلها
          </p>
        </div>
        <span className="rounded-xl bg-[#e6f8f3] px-3 py-2 font-bold text-[#0aa99b]">
          01
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <button
          type="button"
          onClick={() => onCompanyChange("all")}
          className={`min-h-28 rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
            selectedCompanyId === "all"
              ? "border-[#0aa99b] bg-emerald-50"
              : "border-gray-200 bg-white hover:border-[#0aa99b]"
          }`}
        >
          <span className="text-2xl text-[#0aa99b]">🚌</span>
          <h3 className="mt-2 font-bold text-[#112F41]">
            كل الشركات
          </h3>
          <p className="mt-1 text-xs text-[#718493]">
            قارن الخيارات
          </p>
        </button>

        {companies.map((company) => (
          <button
            key={company.id}
            type="button"
            onClick={() => onCompanyChange(company.id)}
            className={`min-h-28 rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
              selectedCompanyId === company.id
                ? "border-[#0aa99b] bg-emerald-50"
                : "border-gray-200 bg-white hover:border-[#0aa99b]"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center mx-auto rounded-xl bg-[#e6f8f3] font-extrabold text-[#0aa99b]">
              {company.name?.charAt(0)}
            </span>

            <h3 className="mt-2 font-bold text-[#112F41]">
              {company.name}
            </h3>

            <p className="mt-1 text-xs text-[#718493]">
              {company.count} رحلات
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
