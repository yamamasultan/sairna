import Reviews from "./reviews";

export default function HeroContent() {
    return (
        <div className="order-1 animate-[fadeUp_0.8s_ease-out]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-5 py-2 text-sm font-semibold text-[var(--primary)]">
                <span>✦</span>
                اكتشف سوريا معنا
            </span>

            <h1 className="mt-7 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-[1.4] text-[var(--text)]">
                المحطة الجاية؟
                <span className="block text-[var(--primary)]">على كيفك.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm sm:text-base leading-8 text-[var(--muted)]">
                من حلب لدمشق، ومن الساحل للجزيرة. لاقي الرحلة اللي بتشبهك، اختار مقعدك، وخلّي الطريق علينا.
            </p>

            {/* المميزات مع الصحّات - تم ضبطها لتتجاوب بنجاح على الشاشات الضيقة */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-[var(--text)]">
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>حجز سهل</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>خيارات متنوعة</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>متابعة رحلتك</span>
                </div>
            </div>

            <Reviews />
        </div>
    );
}