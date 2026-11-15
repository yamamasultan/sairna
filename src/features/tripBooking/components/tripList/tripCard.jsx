
export default function TripCard({ trip, onChooseSeats }) {
  return (
    <article
      dir="rtl"
      className="
        overflow-hidden rounded-[var(--radius)]
        border border-[var(--border)]
        bg-[var(--surface)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[var(--primary)]
        hover:shadow-md
      "
      style={{ fontFamily: "var(--font)" }}
    >
      <div className="p-4 sm:p-6">
        {/* معلومات الشركة */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center
                justify-center rounded-2xl
                bg-[var(--soft-teal)]
                text-xl font-extrabold text-[var(--primary)]
                sm:h-14 sm:w-14
              "
            >
              {trip.companyName?.charAt(0)}
            </div>

            <div className="min-w-0">
              <h3 className="break-words font-bold text-[var(--text)]">
                {trip.companyName}
              </h3>

              <p className="mt-1 text-sm text-[#f5a623]">
                ★ {trip.rating || "—"}
                {trip.rating ? " · الأعلى تقييماً" : ""}
              </p>
            </div>
          </div>

          <span
            className="
              rounded-full border border-[var(--border)]
              px-3 py-2 text-xs text-[var(--muted)]
            "
          >
            🚌 حافلة سياحية
          </span>
        </div>

        {/* أوقات الرحلة */}
        <div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-[var(--text)] sm:text-2xl">
              {trip.departureTime || "--:--"}
            </h2>

            <p className="mt-1 break-words text-sm text-[var(--muted)]">
              {trip.from}
            </p>
          </div>

          <div className="min-w-0 text-center">
            <p className="text-xs text-[var(--muted)]">
              {trip.duration || "مدة الرحلة"}
            </p>

            <div className="my-2 flex items-center gap-2 text-[var(--primary)]">
              <span className="h-px flex-1 border-t border-dashed border-[var(--border)]" />
              🚌
              <span className="h-px flex-1 border-t border-dashed border-[var(--border)]" />
            </div>

            <p className="text-xs font-bold text-[var(--primary)]">
              مباشرة
            </p>
          </div>

          <div className="min-w-0 text-left">
            <h2 className="text-xl font-extrabold text-[var(--text)] sm:text-2xl">
              {trip.arrivalTime || "--:--"}
            </h2>

            <p className="mt-1 break-words text-sm text-[var(--muted)]">
              {trip.to}
            </p>
          </div>
        </div>

        {/* السعر والمقاعد */}
        <div className="
          flex flex-col justify-between gap-4
          border-t border-[var(--border)] pt-5
          sm:flex-row sm:items-center
        ">
          <div>
            <p className="text-xs text-[var(--muted)]">
              السعر للشخص
            </p>

            <h3 className="mt-1 text-2xl font-extrabold text-[var(--text)]">
              {Number(trip.price || 0).toLocaleString("en-US")} ل.س
            </h3>

            <p className="mt-1 text-sm text-[var(--primary)]">
              ♧ {trip.availableSeats ?? "—"} مقعد متاح
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChooseSeats(trip)}
            className="
              rounded-xl bg-[var(--primary)]
              px-7 py-3 font-bold text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[var(--primary-deep)]
              hover:shadow-md
            "
          >
            اختيار المقاعد ←
          </button>
        </div>
      </div>

      {/* الخدمات */}
      <div
        className="
          flex flex-wrap gap-2
          border-t border-[var(--border)]
          bg-[var(--surface-alt)]
          px-4 py-4 text-xs text-[var(--muted)]
          sm:px-6
        "
      >
        {(trip.amenities?.length
          ? trip.amenities
          : ["حافلة سياحية"]
        ).map((item, index) => (
          <span
            key={index}
            className="
              rounded-lg border border-[var(--border)]
              bg-[var(--surface)] px-3 py-2
              text-[var(--muted)]
            "
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
