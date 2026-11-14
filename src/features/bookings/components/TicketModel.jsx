import { useState, useEffect } from 'react';
import { X, Ticket, ArrowLeft, Copy, Check } from 'lucide-react';

export default function TicketModal({ booking, onClose }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!booking) return null;

    const formattedPrice = Number(booking.price).toLocaleString('en-US');

    const handleCopyCode = async () => {
        try {
        await navigator.clipboard.writeText(booking.bookingCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        } catch {
        // Fallback للمتصفحات القديمة
        const input = document.createElement('input');
        input.value = booking.bookingCode;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
        dir="rtl"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#091c27]/70 p-4 backdrop-blur-xs transition-opacity"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        >
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[460px] overflow-hidden rounded-[26px] bg-[var(--surface)] shadow-2xl ring-1 ring-black/5"
        >
            {/* الترويسة المتدرجة */}
            <div className="relative flex items-center justify-between bg-gradient-to-l from-[#0aa99b] via-[#0c7a7a] to-[#0f4556] px-6 py-6 text-white">
            <div className="flex items-center gap-2.5">
                <Ticket className="h-6 w-6 text-white/95" />
                <h2 id="ticket-modal-title" className="text-lg font-extrabold">
                تذكرتك مع سيرنا
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold tracking-widest text-white/75 uppercase">
                SAIRNA
                </span>
                <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--text)] shadow-sm transition-transform hover:scale-105"
                >
                <X className="h-4 w-4" />
                </button>
            </div>
            </div>

            {/* محتوى التذكرة */}
            <div className="p-6">
            {/* رقم الحجز */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--muted)]">رقم الحجز</span>
                <span
                dir="ltr"
                className="text-base font-extrabold tracking-wider text-[var(--text)]"
                >
                {booking.bookingCode}
                </span>
            </div>

            {/* مسار المدن */}
            <div className="my-5 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-[var(--text)]">
                {booking.originCity}
                </span>
                <ArrowLeft className="h-5 w-5 text-[var(--primary)]" />
                <span className="text-2xl font-extrabold text-[var(--text)]">
                {booking.destinationCity}
                </span>
            </div>

            <hr className="border-dashed border-[var(--border)]" />

            {/* شبكة التفاصيل */}
            <div className="my-5 grid grid-cols-2 gap-y-4 text-sm">
                <div>
                <span className="block text-xs text-[var(--muted)]">شركة النقل</span>
                <span className="mt-1 block font-extrabold text-[var(--text)]">
                    {booking.companyName}
                </span>
                </div>

                <div className="text-right">
                <span className="block text-xs text-[var(--muted)]">التاريخ</span>
                <span className="mt-1 block font-extrabold text-[var(--text)]">
                    {booking.departureDate}
                </span>
                </div>

                <div>
                <span className="block text-xs text-[var(--muted)]">الموعد</span>
                <span
                    dir="ltr"
                    className="mt-1 inline-block font-extrabold text-[var(--text)]"
                >
                    {booking.departureTime}
                </span>
                </div>

                <div className="text-right">
                <span className="block text-xs text-[var(--muted)]">المقاعد</span>
                <span className="mt-1 block font-extrabold text-[var(--text)]">
                    {booking.seatNumber}
                </span>
                </div>

                <div className="col-span-2">
                <span className="block text-xs text-[var(--muted)]">الإجمالي</span>
                <span className="mt-1 block text-base font-extrabold text-[var(--text)]">
                    {formattedPrice} {booking.currency}
                </span>
                </div>
            </div>

            <hr className="border-dashed border-[var(--border)]" />

            {/* ملاحظة التذكرة التوضيحية */}
            {booking.isDemo && (
                <p className="mt-4 text-center text-xs text-[var(--muted)]">
                تذكرة توضيحية — غير صالحة للسفر أو الدفع.
                </p>
            )}

            {/* زر نسخ رقم الحجز */}
            <button
                type="button"
                onClick={handleCopyCode}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-extrabold transition-all ${
                copied
                    ? 'border-[var(--primary)] bg-[var(--soft-teal)] text-[var(--primary-deep)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}
            >
                {copied ? (
                <>
                    <Check className="h-4 w-4 text-[var(--primary)]" />
                    <span>تم نسخ رقم الحجز!</span>
                </>
                ) : (
                <>
                    <Copy className="h-4 w-4 text-[var(--primary)]" />
                    <span>نسخ رقم الحجز</span>
                </>
                )}
            </button>
            </div>
        </div>
        </div>
    );
}