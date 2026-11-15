
const getValue = (...values) =>
  values.find(
    (value) => value !== undefined && value !== null && value !== ""
  );

const formatPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return value || "غير محدد";

  return `${new Intl.NumberFormat("en-US").format(number)} ل.س`;
};

const formatDigits = (value) =>
  String(value).replace(/[٠-٩۰-۹]/g, (digit) => {
    const arabic = "٠١٢٣٤٥٦٧٨٩";
    const persian = "۰۱۲۳۴۵۶۷۸۹";

    if (arabic.includes(digit)) return arabic.indexOf(digit);
    return persian.indexOf(digit);
  });

export default function BookingSummary({
  trip,
  selectedSeat,
  passengerCount = 1,
}) {
  const companyName = getValue(
    trip?.company?.name,
    trip?.companyName,
    trip?.operatorName,
    "شركة النقل"
  );

  const companyLogo = getValue(
    trip?.company?.logoUrl,
    trip?.companyLogo
  );

  const origin = getValue(
    trip?.origin?.name,
    trip?.originName,
    trip?.from,
    "غير محدد"
  );

  const destination = getValue(
    trip?.destination?.name,
    trip?.destinationName,
    trip?.to,
    "غير محدد"
  );

  const departureTime = getValue(
    trip?.departureTime,
    trip?.departure_at,
    trip?.departureAt
  );

  const arrivalTime = getValue(
    trip?.arrivalTime,
    trip?.arrival_at,
    trip?.arrivalAt
  );

  const date = getValue(
    trip?.date,
    trip?.travelDate,
    trip?.departureAt
  );

  const price = getValue(
    trip?.price,
    trip?.pricePerPassenger,
    0
  );

  const total = Number(price || 0) * passengerCount;

  const displayTime = (value) => {
    if (!value) return "--:--";

    const parsed = new Date(value);

    return Number.isNaN(parsed.getTime())
      ? formatDigits(value)
      : parsed.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const displayDate = (value) => {
    if (!value) return "غير محدد";

    const parsed = new Date(value);

    return Number.isNaN(parsed.getTime())
      ? formatDigits(value)
      : parsed.toLocaleDateString("ar-SY-u-nu-latn", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <aside
      className="h-fit w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 lg:p-6"
      aria-label="ملخص الحجز"
      dir="rtl"
      style={{
        fontFamily: "var(--font)",
        fontVariantNumeric: "lining-nums",
      }}
    >
      {/* العنوان */}
      <h2 className="mb-4 flex items-center gap-3 text-base font-bold text-[var(--text)] sm:mb-5 sm:text-lg">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-lg text-[var(--primary)] sm:h-10 sm:w-10">
          ▤
        </span>
        ملخص الحجز
      </h2>

      {/* شركة النقل */}
      <div className="mb-4 flex items-center gap-3 border-b border-[var(--border)] pb-4 sm:mb-5 sm:pb-5">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt=""
            className="h-11 w-11 shrink-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] object-contain p-1 sm:h-12 sm:w-12"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-lg font-bold text-[var(--primary)] sm:h-12 sm:w-12">
            {String(companyName).slice(0, 1)}
          </span>
        )}

        <div className="flex min-w-0 flex-col gap-1">
          <strong className="break-words text-sm font-bold text-[var(--text)]">
            {companyName}
          </strong>

          <small className="text-xs text-[var(--primary)]">
            رحلة مباشرة
          </small>
        </div>
      </div>

      {/* مسار الرحلة */}
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-2xl bg-[var(--surface-alt)] p-3 sm:mb-5 sm:p-4">
        <div className="flex min-w-0 flex-col gap-2">
          <small className="text-xs text-[var(--muted)]">
            الانطلاق
          </small>

          <strong className="break-words text-sm font-bold text-[var(--text)]">
            {origin}
          </strong>

          <span className="text-xs font-semibold text-[var(--primary)] sm:text-sm">
            {displayTime(departureTime)}
          </span>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)] text-base text-[var(--primary)] shadow-sm sm:h-9 sm:w-9">
          ←
        </span>

        <div className="flex min-w-0 flex-col gap-2">
          <small className="text-xs text-[var(--muted)]">
            الوصول
          </small>

          <strong className="break-words text-sm font-bold text-[var(--text)]">
            {destination}
          </strong>

          <span className="text-xs font-semibold text-[var(--primary)] sm:text-sm">
            {displayTime(arrivalTime)}
          </span>
        </div>
      </div>

      {/* تفاصيل الحجز */}
      <dl className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">
            تاريخ الرحلة
          </dt>

          <dd className="max-w-[65%] text-left text-xs font-semibold text-[var(--text)] sm:text-sm">
            {displayDate(date)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">
            المسافرون
          </dt>

          <dd className="text-sm font-semibold text-[var(--text)]">
            {formatDigits(passengerCount)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">
            المقاعد
          </dt>

          <dd className="text-sm font-semibold text-[var(--text)]">
            {selectedSeat
              ? formatDigits(selectedSeat)
              : "لم تحدد بعد"}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3">
          <dt className="text-xs text-[var(--muted)] sm:text-sm">
            السعر للمسافر
          </dt>

          <dd className="text-xs font-semibold text-[var(--text)] sm:text-sm">
            {formatPrice(price)}
          </dd>
        </div>
      </dl>

      {/* السعر الإجمالي */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--soft-teal)] p-3 sm:mt-5 sm:p-4">
        <strong className="text-sm font-bold text-[var(--text)]">
          السعر الإجمالي
        </strong>

        <b className="text-sm font-extrabold text-[var(--primary-deep)] sm:text-base">
          {formatPrice(total)}
        </b>
      </div>

      {/* ملاحظة */}
      <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-[var(--muted)]">
        <span className="shrink-0 text-[var(--primary)]" aria-hidden="true">
          ⓘ
        </span>

        لا يوجد دفع حقيقي ضمن المشروع التعليمي.
      </p>
    </aside>
  );
}
