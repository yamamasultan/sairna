
import { useMemo, useState } from "react";

function SeatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path
        d="M7 11V6.5A2.5 2.5 0 0 1 9.5 4h5A2.5 2.5 0 0 1 17 6.5V11M5 11h14a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2ZM6 17v3m12-3v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// تحويل أي أرقام عربية إلى إنكليزية
function toEnglishDigits(value) {
  return String(value).replace(/[٠-٩۰-۹]/g, (digit) => {
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

    if (arabicDigits.includes(digit)) {
      return arabicDigits.indexOf(digit);
    }

    return persianDigits.indexOf(digit);
  });
}

export default function SeatSelection({
  seatData,
  loading,
  error,
  selectedSeat,
  onSelectSeat,
  onRetry,
}) {
  const [selectionError, setSelectionError] = useState("");

  const totalSeats = Number(seatData?.totalSeats || 0);

  const occupiedSeats = useMemo(
    () => new Set((seatData?.occupiedSeats || []).map(Number)),
    [seatData]
  );

  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.has(seatNumber)) return;

    if (selectedSeat && selectedSeat !== seatNumber) {
      setSelectionError(
        "يمكنك اختيار مقعد واحد فقط. ألغِ اختيار المقعد الحالي أولاً."
      );
      return;
    }

    setSelectionError("");
    onSelectSeat(selectedSeat === seatNumber ? null : seatNumber);
  };

  const sectionClass =
    "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7";

  if (loading) {
    return (
      <section
        className={sectionClass}
        dir="rtl"
        style={{ fontFamily: "var(--font)" }}
      >
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--soft-teal)] border-t-[var(--primary)]" />

          <p className="text-sm font-medium text-[var(--muted)]">
            جارٍ تحميل المقاعد المتاحة...
          </p>
        </div>
      </section>
    );
  }

  if (error || !seatData) {
    return (
      <section
        className={sectionClass}
        dir="rtl"
        style={{ fontFamily: "var(--font)" }}
      >
        <div
          className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700"
          role="alert"
        >
          تعذر تحميل مقاعد هذه الرحلة. تأكدي من أن الرحلة متاحة ثم حاولي مجدداً.
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="w-full rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[var(--primary-deep)] sm:w-auto"
        >
          إعادة المحاولة
        </button>
      </section>
    );
  }

  if (totalSeats <= 0) {
    return (
      <section
        className={sectionClass}
        dir="rtl"
        style={{ fontFamily: "var(--font)" }}
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          لم يرجع السيرفر عدد المقاعد لهذه الرحلة.
        </div>
      </section>
    );
  }

  const rows = Math.ceil(totalSeats / 4);

  const availableSeats =
    seatData.availableSeats ?? totalSeats - occupiedSeats.size;

  return (
    <section
      className={sectionClass}
      dir="rtl"
      style={{
        fontFamily: "var(--font)",
        fontVariantNumeric: "lining-nums",
      }}
    >
      {/* العنوان */}
      <header className="mb-6 flex items-center justify-between gap-3 sm:mb-7 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl lg:text-2xl">
            اختيار مقعدك المفضّل
          </h2>

          <p className="mt-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
            اختاري مقعداً واحداً من المقاعد المتاحة للحجز.
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-xl text-[var(--primary)] sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          ♧
        </span>
      </header>

      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.8fr)]">

        {/* مخطط الحافلة */}
        <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 sm:p-5 lg:p-6">

          {/* مقدمة الحافلة */}
          <div className="mx-auto mb-6 flex max-w-xs items-center justify-between rounded-t-[3rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 sm:px-6">
            <span className="text-xs font-semibold text-[var(--muted)]">
              مقدمة الحافلة
            </span>

            <span className="text-xl text-[var(--primary)]">
              ◉
            </span>
          </div>

          {/* المقاعد */}
          <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
            {Array.from({ length: rows }, (_, rowIndex) => {
              const rowSeats = [4, 3, 2, 1]
                .map((offset) => rowIndex * 4 + offset)
                .filter((number) => number <= totalSeats);

              return (
                <div
                  className="grid grid-cols-4 gap-2 sm:gap-3"
                  key={rowIndex}
                >
                  {rowSeats.map((seatNumber) => {
                    const occupied = occupiedSeats.has(seatNumber);
                    const selected = selectedSeat === seatNumber;

                    return (
                      <button
                        key={seatNumber}
                        type="button"
                        disabled={occupied}
                        aria-pressed={selected}
                        aria-label={`المقعد رقم ${toEnglishDigits(seatNumber)}${
                          occupied
                            ? " محجوز"
                            : selected
                            ? " محدد"
                            : " متاح"
                        }`}
                        onClick={() => handleSeatClick(seatNumber)}
                        className={`
                          flex aspect-square min-w-0 flex-col items-center justify-center
                          gap-1 rounded-xl border-2 transition-all duration-200
                          ${
                            occupied
                              ? "cursor-not-allowed border-[var(--border)] bg-[var(--border)] text-[var(--muted)] opacity-70"
                              : selected
                              ? "scale-105 border-[var(--primary)] bg-[var(--primary)] text-white shadow-md"
                              : "border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-md"
                          }
                        `}
                      >
                        <SeatIcon />

                        <span className="text-xs font-bold">
                          {toEnglishDigits(seatNumber)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* دليل الألوان */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-3 border-t border-[var(--border)] pt-5 sm:gap-x-5">
            <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <i className="h-3.5 w-3.5 rounded border border-[var(--border)] bg-[var(--surface)]" />
              متاح
            </span>

            <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <i className="h-3.5 w-3.5 rounded bg-[var(--primary)]" />
              مختار
            </span>

            <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <i className="h-3.5 w-3.5 rounded bg-[var(--border)]" />
              محجوز
            </span>
          </div>
        </div>

        {/* معلومات المقعد */}
        <aside className="h-fit min-w-0 self-start rounded-2xl border border-[var(--border)] bg-[var(--soft-teal)] p-4 sm:p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-sm sm:h-11 sm:w-11">
            <SeatIcon />
          </div>

          <h3 className="mt-3 text-base font-bold text-[var(--text)] sm:text-lg">
            مكانك، راحتك.
          </h3>

          <p className="mt-1 text-xs leading-6 text-[var(--muted)] sm:text-sm">
            اختاري مقعدك حسب تفضيلك. المقعد المحجوز غير قابل للاختيار.
          </p>

          <div className="mt-4 rounded-xl bg-[var(--surface)] p-3 sm:p-4">
            <strong className="text-2xl font-extrabold text-[var(--primary)]">
              {selectedSeat ? "1 / 1" : "0 / 1"}
            </strong>

            <p className="mt-1 text-xs text-[var(--muted)]">
              المقاعد المختارة
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center text-sm font-semibold text-[var(--primary-deep)]">
            {selectedSeat
              ? `مقعد ${toEnglishDigits(selectedSeat)}`
              : "لسا ما اخترتي مقعد"}
          </div>

          {/* تحذير اختيار مقعد ثاني */}
          {selectionError && (
            <p
              className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-700"
              role="alert"
            >
              {selectionError}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-sm text-[var(--muted)]">
            <span>المقاعد المتاحة</span>

            <strong className="font-bold text-[var(--primary)]">
              {toEnglishDigits(availableSeats)}
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
