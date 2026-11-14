import { Sparkles } from 'lucide-react';

export default function TransportCompaniesHero() {
    return (
        <div className="container pt-6 pb-4">
        {/* Breadcrumb في الجهة اليمنى */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-8">
            <a href="/" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
            الرئيسية
            </a>
            <span className="text-[var(--muted)]">›</span>
            <span className="text-[var(--text)] font-bold">شركات النقل</span>
        </div>

        {/* شارة "شركاء الطريق" */}
        <div className="inline-flex items-center gap-2 bg-[var(--soft-teal)] text-[var(--primary)] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>شركاء الطريق</span>
        </div>

        {/* العنوان الرئيسي والوصف */}
        <div className="flex flex-col items-start text-right max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text)] tracking-tight leading-[1.15] mb-4">
            شركات بتوصلك <span className="text-[var(--primary)]">لوين ما بدك.</span>
            </h1>
            <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg leading-relaxed">
            تعرّف على شركات النقل الموجودة في النموذج واختار الأنسب إلك.
            </p>
        </div>
        </div>
    );
}