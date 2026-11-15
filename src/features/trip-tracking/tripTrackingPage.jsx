
import {
    ArrowLeft,
    Bus,
    Clock3,
    ExternalLink,
    Home,
    Info,
    MapPin,
    Navigation,
    Pause,
    Play,
    RotateCw,
    Sparkles,
    Check,
    ChevronLeft
    } from 'lucide-react';

    import { Link } from 'react-router-dom';
    import { useTripSimulation } from './hooks/useTripSimulation.jsx';

    const TripTrackingPage = () => {
    const { progress, activeSimulation, toggleSimulation, resetSimulation } =
        useTripSimulation(31, true);

    return (
        <main
        dir="rtl"
        className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-5 sm:py-7 font-[var(--font)] transition-colors duration-300"
        >
        <div className="mx-auto w-full max-w-[var(--container)] px-3 sm:px-5 lg:px-6">

            {/* عنوان الصفحة والتنقل */}
            <header className="mb-6 flex flex-col gap-5 sm:mb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <nav
                aria-label="مسار التنقل"
                className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)]"
                >
                <Link to="/" className="transition hover:text-[var(--primary)]">
                    الرئيسية
                </Link>

                <ChevronLeft size={14} className="text-[var(--muted)]" />

                <Link to="/my-bookings" className="transition hover:text-[var(--primary)]">
                    حجوزاتي
                </Link>

                <ChevronLeft size={14} className="text-[var(--muted)]" />

                <span className="text-[var(--text)]">تتبع الرحلة</span>
                </nav>

                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-xs font-bold text-[var(--primary)]">
                <Sparkles size={14} />
                <span>تابع الطريق</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    رحلتك قدام عيونك
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary)]">
                    <Navigation size={13} />
                    محاكاة تفاعلية
                </span>
                </div>

                <p className="mt-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
                خط السير على الخريطة مع محطات ووقت وصول توضيحي.
                </p>
            </div>

            <Link
                to="/my-bookings"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-bold shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)] sm:text-sm"
            >
                <span>كل الحجوزات</span>
                <ArrowLeft size={17} />
            </Link>
            </header>

            {/* الخريطة وبطاقة الرحلة */}
            <div
            className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.72fr)_minmax(330px,0.9fr)] lg:gap-5"
            dir="ltr"
            >

            {/* الخريطة */}
            <section
                className="min-w-0 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-sm"
                dir="rtl"
            >
                <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[620px]">
                <iframe
                    title="خريطة مسار الرحلة من حلب إلى دمشق"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?output=embed&saddr=Aleppo,+Syria&daddr=Damascus,+Syria"
                />

                <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/95 px-3 py-2 text-[11px] font-bold text-[var(--text)] shadow-sm backdrop-blur">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] shadow-[0_0_0_4px_var(--soft-teal)]" />
                    خريطة تفاعلية
                </div>

                <a
                    href="https://www.google.com/maps/dir/Aleppo,+Syria/Damascus,+Syria"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs font-bold text-[var(--text)] shadow-md transition hover:text-[var(--primary)]"
                >
                    <ExternalLink size={15} className="text-[var(--primary)]" />
                    عرض الطرق في Google Maps
                </a>
                </div>
            </section>

            {/* بطاقة تفاصيل الرحلة */}
            <aside
                className="min-w-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5"
                dir="rtl"
            >

                {/* حالة الرحلة ورقم الحجز */}
                <div className="flex items-center justify-between gap-2 border-b border-dashed border-[var(--border)] pb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                    الرحلة قيد العرض التجريبي
                </span>

                <span className="text-[10px] font-bold text-[var(--muted)]">
                    SR-24081
                </span>
                </div>

                {/* المدن والسهم وشركة النقل */}
                <div className="py-5">

                {/* المدن */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

                    {/* نقطة الانطلاق */}
                    <div className="min-w-0 text-right">
                    <span className="text-[11px] text-[var(--muted)]">
                        من
                    </span>

                    <h2 className="mt-1 text-2xl font-black">
                        حلب
                    </h2>
                    </div>

                    {/* السهم */}
                    <div className="flex items-center justify-center">
                    <ArrowLeft
                        size={22}
                        strokeWidth={2.2}
                        className="text-[var(--primary)]"
                    />
                    </div>

                    {/* الوجهة */}
                    <div className="min-w-0 text-left">
                    <span className="text-[11px] text-[var(--muted)]">
                        إلى
                    </span>

                    <h2 className="mt-1 text-2xl font-black">
                        دمشق
                    </h2>
                    </div>
                </div>

                {/* شركة النقل */}
                <div className="mt-5 flex justify-start">
                    <div className="inline-flex items-center gap-2.5 rounded-2xl  px-3 py-2">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--soft-teal)] text-2xl font-black text-[var(--primary)]">
                        ش
                    </div>
                    </div>
                    <div className="min-w-0">
                        <p className="whitespace-nowrap text-xs font-bold">
                        الشام للنقل
                        </p>

                        <p className="mt-0.5 whitespace-nowrap text-[10px] text-[var(--muted)]">
                        موعد الانطلاق 07:30
                        </p>
                    </div>

                    </div>
                
                </div>

                {/* تقدم الرحلة */}
                <div className="border-t border-dashed border-[var(--border)] pt-4">

                <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-bold">
                    تقدم الرحلة
                    </span>

                    <span className="font-extrabold tabular-nums text-[var(--primary)]">
                    {progress}%
                    </span>
                </div>

                {/* شريط التقدم */}
                <div
                    className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]"
                    role="progressbar"
                    aria-label="تقدم الرحلة"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    />
                </div>

                {/* محطات الرحلة */}
                <div className="relative mt-6 space-y-6 pr-6 before:absolute before:bottom-3 before:right-[7px] before:top-3 before:w-px before:bg-[var(--border)]">

                    {/* محطة الانطلاق */}
                    <div className="relative flex items-start justify-between gap-3">
                    <span className="absolute -right-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-white ring-4 ring-[var(--surface)]">
                        <Check size={10} />
                    </span>

                    <div>
                        <p className="text-xs font-bold">
                        حلب
                        </p>

                        <p className="mt-1 text-[10px] text-[var(--muted)]">
                        محطة الانطلاق
                        </p>
                    </div>

                    <span className="text-[10px] text-[var(--muted)]">
                        07:30
                    </span>
                    </div>

                    {/* الحافلة على الطريق */}
                    <div className="relative flex items-start justify-between gap-3">
                    <span className="absolute -right-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-white ring-4 ring-[var(--surface)]">
                        <Bus size={10} />
                    </span>

                    <div>
                        <p className="text-xs font-bold text-[var(--primary)]">
                        على الطريق
                        </p>

                        <p className="mt-1 text-[10px] text-[var(--muted)]">
                        الحافلة تتحرك نحو الوجهة
                        </p>
                    </div>

                    <span className="text-[10px] font-bold text-[var(--primary)]">
                        الآن*
                    </span>
                    </div>

                    {/* محطة الوصول */}
                    <div className="relative flex items-start justify-between gap-3">
                    <span className="absolute -right-6 top-0.5 h-4 w-4 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] ring-4 ring-[var(--surface)]" />

                    <div>
                        <p className="text-xs font-bold">
                        دمشق
                        </p>

                        <p className="mt-1 text-[10px] text-[var(--muted)]">
                        محطة الوصول
                        </p>
                    </div>

                    <span className="text-[10px] text-[var(--muted)]">
                        13:10
                    </span>
                    </div>

                </div>
                </div>

                {/* المسافة والوقت */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">

                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                    <Bus size={13} />
                    المسافة الكلية
                    </div>

                    <p className="text-sm font-black">
                    ~366 كم
                    </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                    <Clock3 size={13} />
                    المتبقي التقديري
                    </div>

                    <p className="text-sm font-black">
                    6 ساعات تقريباً
                    </p>
                </div>

                </div>

                {/* أزرار التحكم بالمحاكاة */}
                <div className="mt-4 flex gap-2">

                <button
                    type="button"
                    onClick={toggleSimulation}
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-3 py-3 text-xs font-bold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:bg-[var(--primary-deep)]"
                >
                    {activeSimulation ? (
                    <Pause size={16} />
                    ) : (
                    <Play size={16} />
                    )}

                    {activeSimulation ? 'إيقاف الحركة' : 'متابعة الحركة'}
                </button>

                <button
                    type="button"
                    onClick={resetSimulation}
                    aria-label="إعادة المحاكاة"
                    title="إعادة المحاكاة"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                    <RotateCw size={17} />
                </button>

                </div>

                {/* ملاحظة المحاكاة */}
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-[var(--surface-alt)] p-3 text-[10px] leading-5 text-[var(--muted)]">
                <Info
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                />

                <p>
                    هذه محاكاة توضيحية وليست تتبع GPS مباشر. خط السير المعروض تقريبي، ويمكن فتح Google Maps لعرض الطريق.
                </p>
                </div>

            </aside>
            </div>

            {/* روابط أسفل الصفحة */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--muted)] lg:justify-start">

            <Link
                to="/"
                className="inline-flex items-center gap-1.5 transition hover:text-[var(--primary)]"
            >
                <Home size={14} />
                الصفحة الرئيسية
            </Link>

            <Link
                to="/my-bookings"
                className="inline-flex items-center gap-1.5 transition hover:text-[var(--primary)]"
            >
                <MapPin size={14} />
                حجوزاتي
            </Link>

            </div>

        </div>
        </main>
    );
};

export default TripTrackingPage;
