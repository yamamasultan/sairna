import Mosque from "./imag/Mosque.jpg";

export default function HeroImage() {
    return (
        <div className="relative order-2 mb-6 sm:mb-10 w-full max-w-2xl mx-auto">
            <div className="absolute -right-4 -top-4 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-[var(--soft-teal)] opacity-60 blur-3xl" />
            {/* تم إزالة كلاس الميلان تماماً لتصبح الصورة مستوية وثابتة */}
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[var(--border)] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                <img
                    src={Mosque}
                    alt="الجامع الأموي في دمشق"
                    className="block h-[260px] sm:h-[320px] lg:h-[400px] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* البطاقة العليا */}
                <div className="absolute left-3 top-3 sm:left-5 sm:top-5 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
                    <svg className="w-4 h-4 text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                        <p className="text-[11px] sm:text-xs font-bold text-[var(--text)]">14 محافظة</p>
                        <p className="text-[9px] sm:text-[10px] text-[var(--muted)]">وجهات بتجمعنا</p>
                    </div>
                </div>

                {/* البطاقة السفلى */}
                <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[var(--soft-teal)] shrink-0">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </span>
                    <div className="text-right">
                        <p className="text-[11px] sm:text-xs font-bold text-[var(--text)]">سافر براحة</p>
                        <p className="text-[9px] sm:text-[10px] text-[var(--muted)]">من أول حجز لآخر محطة</p>
                    </div>
                </div>

                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 rounded-xl bg-[var(--dark)]/90 px-3 py-1 text-[10px] sm:text-[11px] font-medium text-white shadow-md">
                    صورة حقيقية من دمشق
                </div>
            </div>
        </div>
    );
}