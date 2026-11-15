
const formatPrice = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? `${new Intl.NumberFormat("ar-SY").format(number)} ل.س`
    : value || "غير محدد";
};

export default function BookingReview({
  trip,
  seatNumber,
  passenger,
  paymentMethod,
  onPaymentMethodChange,
  onConfirm,
  onBack,
  confirming = false,
}) {
  return (
    <section
      className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7"
      dir="rtl"
      style={{ fontFamily: "var(--font)" }}
    >
      {/* العنوان */}
      <header className="mb-6 flex items-center justify-between gap-3 sm:mb-7">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl lg:text-2xl">
            كل شي جاهز؟
          </h2>

          <p className="mt-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
            راجعي معلومات الرحلة قبل الانتقال لتسجيل الدخول وتأكيد الحجز.
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-xl font-bold text-[var(--primary)] sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          ✓
        </span>
      </header>

      {/* تفاصيل المسافر */}
      <div className="mb-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-alt)] p-4 sm:mb-6 sm:p-5">
        <h3 className="mb-4 text-sm font-bold text-[var(--text)] sm:text-base">
          تفاصيل المسافر
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-teal)] text-xl text-[var(--primary)] sm:h-12 sm:w-12 sm:text-2xl">
            ♙
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <strong className="break-words text-sm text-[var(--text)]">
              {passenger.name}
            </strong>

            <small className="break-all text-xs text-[var(--muted)] sm:text-sm">
              {passenger.phone}
            </small>
          </div>

          <span className="rounded-full bg-[var(--soft-teal)] px-3 py-2 text-xs font-bold text-[var(--primary-deep)] sm:px-4">
            المقعد {seatNumber}
          </span>
        </div>
      </div>

      {/* طريقة تأكيد الحجز */}
      <div className="mb-5 sm:mb-6">
        <h3 className="mb-4 text-sm font-bold text-[var(--text)] sm:text-base">
          طريقة تأكيد الحجز
        </h3>

        <div className="flex flex-col gap-3">
          {/* الدفع في المكتب */}
          <label
            className={`
              flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition-all duration-200 sm:p-4
              ${
                paymentMethod === "office"
                  ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
              }
            `}
          >
            <input
              type="radio"
              name="payment"
              value="office"
              checked={paymentMethod === "office"}
              onChange={() => onPaymentMethodChange("office")}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
            />

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-lg text-[var(--primary)] shadow-sm sm:h-10 sm:w-10 sm:text-xl">
              ▣
            </span>

            <span className="flex min-w-0 flex-col gap-1">
              <strong className="text-sm font-bold text-[var(--text)]">
                الدفع في مكتب الشركة
              </strong>

              <small className="text-xs leading-6 text-[var(--muted)] sm:text-sm">
                الدفع عند الحضور إلى مكتب الشركة قبل الرحلة — عرض تجريبي.
              </small>
            </span>
          </label>

          {/* الدفع الإلكتروني */}
          <label
            className={`
              flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition-all duration-200 sm:p-4
              ${
                paymentMethod === "online"
                  ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
              }
            `}
          >
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => onPaymentMethodChange("online")}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
            />

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-lg text-[var(--primary)] shadow-sm sm:h-10 sm:w-10 sm:text-xl">
              ▤
            </span>

            <span className="flex min-w-0 flex-col gap-1">
              <strong className="text-sm font-bold text-[var(--text)]">
                دفع إلكتروني (تجريبي)
              </strong>

              <small className="text-xs leading-6 text-[var(--muted)] sm:text-sm">
                محاكاة لواجهة الدفع فقط، ولن يتم تحصيل أي مبلغ.
              </small>
            </span>
          </label>
        </div>
      </div>

      {/* التنبيه */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-3 text-xs leading-7 text-[var(--text)] sm:mb-7 sm:p-4 sm:text-sm">
        <span className="shrink-0 text-lg text-[var(--primary)]">
          ⓘ
        </span>

        <p>
          عند تأكيد الحجز سيتم نقلك إلى صفحة تسجيل دخول المسافر، وبعد تسجيل
          الدخول يمكن إرسال طلب الحجز.
        </p>
      </div>

      {/* الأزرار */}
      <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-200 hover:bg-[var(--surface-alt)] sm:w-auto"
        >
          السابق
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={confirming}
          className="w-full rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {confirming ? "جارٍ الانتقال..." : "تأكيد الحجز"}
          <span className="mr-2">←</span>
        </button>
      </div>

      {/* السعر */}
      <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)] sm:text-sm">
        سعر الرحلة:

        <strong className="font-bold text-[var(--primary)]">
          {formatPrice(trip?.price ?? trip?.pricePerPassenger)}
        </strong>
      </p>
    </section>
  );
}
