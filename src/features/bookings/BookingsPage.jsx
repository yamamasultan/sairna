import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import { useBookings } from './hooks/useBookings';
import BookingsHero from './components/BookingsHero';
import BookingCard from './components/BookingsCard';
import TicketModal from './components/TicketModel';

export default function BookingsPage() {
    const navigate = useNavigate();
    const { bookings, isDemoMode, loading } = useBookings();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [trackingNotice, setTrackingNotice] = useState(null);

    const handleTrackTrip = (booking) => {
        if (booking.isDemo) {
        setTrackingNotice('هذه رحلة توضيحية؛ ميزة التتبع المباشر تعمل مع الحجوزات الفعلية المؤكدة.');
        setTimeout(() => setTrackingNotice(null), 4000);
        return;
        }
        navigate(`/bookings/${booking.id}/track`);
    };

    return (
        <main dir="rtl" className="min-h-screen bg-[var(--bg)] pb-16">
        {/* القسم العلوي (Hero) */}
        <BookingsHero />

        {/* المحتوى الرئيسي */}
        <section className="container pt-10">
            {/* ترويسة القائمة + زر حجز جديد */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-extrabold text-[var(--text)] sm:text-2xl">
                رحلاتي القادمة
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
                {isDemoMode
                    ? 'رحلة نموذجية لمعاينة تصميم صفحة الحجوزات'
                    : 'جميع رحلاتك القادمة والمؤكدة'}
                </p>
            </div>

            <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--primary-deep)] active:scale-[0.99]"
            >
                <Plus className="h-4 w-4" />
                <span>حجز جديد</span>
            </button>
            </div>

            {/* تنبيه مؤقت عند النقر على تتبع رحلة توضيحية */}
            {trackingNotice && (
            <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800 sm:text-sm">
                <Info className="h-4 w-4 shrink-0" />
                <span>{trackingNotice}</span>
            </div>
            )}

            {/* حالة التحميل (Skeleton) */}
            {loading ? (
            <div className="h-64 animate-pulse rounded-[22px] border border-[var(--border)] bg-[var(--surface)]" />
            ) : (
            <div className="space-y-5">
                {bookings.map((booking) => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    onShowTicket={setSelectedTicket}
                    onTrackTrip={handleTrackTrip}
                />
                ))}
            </div>
            )}

            {/* شريط الملاحظة السفلي في وضع المعاينة */}
            {!loading && isDemoMode && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[var(--soft-teal)] px-5 py-4 text-xs font-semibold text-[var(--primary-deep)] dark:text-[var(--primary)] sm:text-sm">
                <Info className="h-5 w-5 shrink-0 text-[var(--primary)]" />
                <span>
                هذه رحلة معاينة. احجز من الموقع لتظهر تذاكرك الفعلية ضمن النموذج.
                </span>
            </div>
            )}
        </section>

        {/* النافذة المنبثقة للتذكرة */}
        <TicketModal
            booking={selectedTicket}
            onClose={() => setSelectedTicket(null)}
        />
        </main>
    );
}