
export default function TripCard({ trip, onChooseSeats }) {
  return (
    <article
      dir="rtl"
      className="overflow-hidden rounded-[22px] border border-[#e4ecef] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0aa99b] hover:shadow-md"
    >
      <div className="p-6">
        {/* معلومات الشركة */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f8f3] text-xl font-extrabold text-[#0aa99b]">
              {trip.companyName?.charAt(0)}
            </div>

            <div>
              <h3 className="font-bold text-[#112F41]">
                {trip.companyName}
              </h3>
              <p className="mt-1 text-sm text-[#f5a623]">
                ★ {trip.rating || "—"}
                {trip.rating ? " · الأعلى تقييماً" : ""}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-[#e4ecef] px-3 py-2 text-xs text-[#718493]">
            🚌 حافلة سياحية
          </span>
        </div>

        {/* أوقات الرحلة */}
        <div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#112F41]">
              {trip.departureTime || "--:--"}
            </h2>
            <p className="mt-1 text-sm text-[#718493]">
              {trip.from}
            </p>
          </div>

          <div className="min-w-0 text-center">
            <p className="text-xs text-[#718493]">
              {trip.duration || "مدة الرحلة"}
            </p>
            <div className="my-2 flex items-center gap-2 text-[#0aa99b]">
              <span className="h-px flex-1 border-t border-dashed border-[#b8d5d7]" />
              🚌
              <span className="h-px flex-1 border-t border-dashed border-[#b8d5d7]" />
            </div>
            <p className="text-xs font-bold text-[#0aa99b]">
              مباشرة
            </p>
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-[#112F41]">
              {trip.arrivalTime || "--:--"}
            </h2>
            <p className="mt-1 text-sm text-[#718493]">
              {trip.to}
            </p>
          </div>
        </div>

        {/* السعر والمقاعد */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#e4ecef] pt-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-[#718493]">
              السعر للشخص
            </p>
            <h3 className="mt-1 text-2xl font-extrabold text-[#112F41]">
              {Number(trip.price || 0).toLocaleString("en-US")} ل.س
            </h3>
            <p className="mt-1 text-sm text-[#0aa99b]">
              ♧ {trip.availableSeats ?? "—"} مقعد متاح
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChooseSeats(trip)}
            className="rounded-xl bg-[#0aa99b] px-7 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#078e87] hover:shadow-md"
          >
            اختيار المقاعد ←
          </button>
        </div>
      </div>

      {/* الخدمات */}
      <div className="flex flex-wrap gap-2 border-t border-[#e4ecef] bg-[#f8fafb] px-6 py-4 text-xs text-[#718493]">
        {(trip.amenities?.length
          ? trip.amenities
          : ["حافلة سياحية"]
        ).map((item, index) => (
          <span
            key={index}
            className="rounded-lg bg-white px-3 py-2"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
