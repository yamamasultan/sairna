import Mosque from "./imag/Mosque.jpg";

export default function HeroImage() {
    return (
        <div className="relative order-2 mb-10 w-full max-w-2xl">
            <div className="absolute -right-4 -top-4 h-36 w-36 rounded-full bg-[var(--soft-teal)] opacity-60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] shadow-2xl transition-transform duration-500 -rotate-2 hover:rotate-0">
                <img
                    src={Mosque}
                    alt="الجامع الأموي في دمشق"
                    className="block h-[340px] w-full object-cover sm:h-[380px] lg:h-[400px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* البطاقة العليا */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-lg">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                        <p className="text-xs font-bold text-[var(--text)]">14 محافظة</p>
                        <p className="text-[10px] text-[var(--muted)]">وجهات بتجمعنا</p>
                    </div>
                </div>

                {/* البطاقة السفلى */}
                <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-lg">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--soft-teal)]">
                        <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </span>
                    <div className="text-right">
                        <p className="text-xs font-bold text-[var(--text)]">سافر براحة</p>
                        <p className="text-[10px] text-[var(--muted)]">من أول حجز لآخر محطة</p>
                    </div>
                </div>

                <div className="absolute bottom-5 left-5 rounded-xl bg-[var(--dark)]/90 px-3.5 py-1.5 text-[11px] font-medium text-white shadow-md">
                    صورة حقيقية من دمشق
                </div>
            </div>
        </div>
    );
}