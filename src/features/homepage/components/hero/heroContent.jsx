import Reviews from "./reviews";

export default function HeroContent() {
    return (
        <div className="order-1 animate-[fadeUp_0.8s_ease-out]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-5 py-2 text-sm font-semibold text-[var(--primary)]">
                <span>✦</span>
                اكتشف سوريا معنا
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.5] text-[var(--text)] sm:text-5xl lg:text-6xl">
                المحطة الجاية؟
                <span className="block text-[var(--primary)]">على كيفك.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-9 text-[var(--muted)] sm:text-lg">
                من حلب لدمشق، ومن الساحل للجزيرة. لاقي الرحلة اللي بتشبهك، اختار مقعدك، وخلّي الطريق علينا.
            </p>

            {/* المميزات مع الصحّات */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-[var(--text)]">
                <div className="flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    حجز سهل
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    خيارات متنوعة
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    متابعة رحلتك
                </div>
            </div>

            <Reviews />
        </div>
    );
}