
import { Ticket, Bus, Armchair, Wallet, Route, Info } from 'lucide-react';

export default function BookingCard({ booking, onShowTicket, onTrackTrip }) {
    const formattedPrice = Number(booking.price).toLocaleString('en-US');

    return (
        <article
        dir="rtl"
        className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-shadow hover:shadow-md"
        >
        {/* الجزء العلوي */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-alt)]/60 px-5 py-4 sm:px-7">

            <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--soft-teal)] text-[var(--primary)]">
                <Ticket className="h-5 w-5" />
            </div>

            <div>
                <span className="block text-xs text-[var(--muted)]">
                رقم الحجز
                </span>

                <span
                dir="ltr"
                className="block text-base font-extrabold tracking-wide text-[var(--text)]"
                >
                {booking.bookingCode}
                </span>
            </div>
            </div>

            {booking.isDemo ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/50">
                <Info className="h-3.5 w-3.5" />
                حجز توضيحي
            </span>
            ) : (
            <div />
            )}
        </div>

        {/* القسم الأوسط: تفاصيل الشركة ومسار الرحلة */}
        <div className="flex flex-col justify-between gap-6 px-5 py-6 sm:px-7 lg:flex-row-reverse lg:items-center">

            {/* تفاصيل الشركة والمقعد والسعر - أقصى اليسار */}
            <div className="flex flex-col gap-2.5 lg:min-w-[150px] lg:flex-none">
            <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--soft-teal)] text-xs font-extrabold text-[var(--primary)]">
                {booking.companyInitial}
                </span>

                <span className="text-sm font-bold text-[var(--text)]">
                {booking.companyName}
                </span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
                <Armchair className="h-4 w-4 text-[var(--muted)]" />
                <span>المقعد: {booking.seatNumber}</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm font-bold text-[var(--text)]">
                <Wallet className="h-4 w-4 text-[var(--muted)]" />
                <span>
                {formattedPrice} {booking.currency}
                </span>
            </div>
            </div>

            {/* الفاصل العمودي */}
            <div className="h-px w-full bg-[var(--border)] lg:h-20 lg:w-px lg:flex-none" />

            {/* مسار الرحلة */}
            <div className="flex flex-1 items-center justify-between gap-3 sm:gap-6">

            {/* مدينة المغادرة - اليمين */}
            <div className="text-right shrink-0">
                <span className="block text-xs text-[var(--muted)]">
                من
                </span>

                <h3 className="mt-0.5 text-xl font-extrabold text-[var(--text)] sm:text-2xl">
                {booking.originCity}
                </h3>

                <span
                dir="ltr"
                className="mt-1 inline-block text-xs font-bold text-[var(--text)] sm:text-sm"
                >
                {booking.departureTime}
                </span>
            </div>

            {/* الخط المتقطع وأيقونة الباص والتاريخ */}
            <div className="flex min-w-0 flex-1 flex-col items-center px-2">
                <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--soft-teal)] text-[var(--primary)]">
                <Bus className="h-4 w-4" />
                </div>

                <div className="w-full border-t border-dashed border-[var(--border)]" />

                <span className="mt-2 text-center text-[11px] font-medium text-[var(--muted)] sm:text-xs">
                {booking.departureDate}
                </span>
            </div>

            {/* مدينة الوصول - اليسار */}
            <div className="text-left shrink-0">
                <span className="block text-xs text-[var(--muted)]">
                إلى
                </span>

                <h3 className="mt-0.5 text-xl font-extrabold text-[var(--text)] sm:text-2xl">
                {booking.destinationCity}
                </h3>

                <span
                dir="ltr"
                className="mt-1 inline-block text-xs font-bold text-[var(--text)] sm:text-sm"
                >
                {booking.arrivalTime}
                </span>
            </div>

            </div>
        </div>

        {/* القسم السفلي: الأزرار */}
        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] bg-[var(--surface-alt)]/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-start sm:px-7">

            <button
            type="button"
            onClick={() => onTrackTrip(booking)}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-bold text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-sm active:translate-y-0 sm:w-auto"
            >
            <Route className="h-4 w-4 text-[var(--primary)]" />
            <span>تتبّع الرحلة</span>
            </button>

            <button
            type="button"
            onClick={() => onShowTicket(booking)}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--surface-alt)] px-5 py-2.5 text-sm font-bold text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--border)] hover:shadow-sm active:translate-y-0 sm:w-auto"
            >
            <Ticket className="h-4 w-4 text-[var(--text)]" />
            <span>عرض التذكرة</span>
            </button>

        </div>
        </article>
    );
}
