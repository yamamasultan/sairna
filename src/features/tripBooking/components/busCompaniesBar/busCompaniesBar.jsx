
export default function BusCompaniesBar({
  companies,
  selectedCompanyId,
  onCompanyChange,
}) {
  return (
    <section className="mt-8" dir="rtl" style={{ fontFamily: "var(--font)" }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl">
            اختيار شركة النقل
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            حدد الشركة التي تفضلها
          </p>
        </div>

        <span className="shrink-0 rounded-xl bg-[var(--soft-teal)] px-3 py-2 font-bold text-[var(--primary)]">
          01
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {/* كل الشركات */}
        <button
          type="button"
          onClick={() => onCompanyChange("all")}
          className={`
            min-h-28 rounded-2xl border-2 p-4 text-center
            transition-all duration-300
            ${
              selectedCompanyId === "all"
                ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
            }
          `}
        >
          <span className="text-2xl text-[var(--primary)]">
            🚌
          </span>

          <h3 className="mt-2 font-bold text-[var(--text)]">
            كل الشركات
          </h3>

          <p className="mt-1 text-xs text-[var(--muted)]">
            قارن الخيارات
          </p>
        </button>

        {/* شركات النقل */}
        {companies.map((company) => (
          <button
            key={company.id}
            type="button"
            onClick={() => onCompanyChange(company.id)}
            className={`
              min-h-28 min-w-0 rounded-2xl border-2 p-4 text-center
              transition-all duration-300
              ${
                selectedCompanyId === company.id
                  ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
              }
            `}
          >
            <span className="
              mx-auto flex h-10 w-10 items-center
              justify-center rounded-xl
              bg-[var(--soft-teal)]
              font-extrabold text-[var(--primary)]
            ">
              {company.name?.charAt(0)}
            </span>

            <h3 className="mt-2 break-words font-bold text-[var(--text)]">
              {company.name}
            </h3>

            <p className="mt-1 text-xs text-[var(--muted)]">
              {company.count} رحلات
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
