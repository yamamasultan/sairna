import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default function BookingsHero() {
    return (
        <section
        dir="rtl"
        className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-alt)] py-10 md:py-14"
        >
        {/* شكل دائري زخرفي خفيف في الخلفية */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border border-[var(--primary)]/15"
        />

        <div className="container">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm font-medium">
            <Link
                to="/"
                className="text-[var(--muted)] transition-colors hover:text-[var(--primary-deep)]"
            >
                الرئيسية
            </Link>
            <ChevronLeft className="h-4 w-4 text-[var(--muted)]" />
            <span className="font-bold text-[var(--text)]">حجوزاتي</span>
            </nav>

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-xs font-bold text-[var(--primary-deep)] dark:text-[var(--primary)]">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            <span>كل رحلاتك بمكان واحد</span>
            </div>

            {/* Main Title */}
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
            تذاكرك{' '}
            <span className="text-[var(--primary)]">دايماً معك.</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm text-[var(--muted)] sm:text-base">
            راقب حجوزاتك، وارجع لتفاصيل الرحلة وقت ما تحتاج.
            </p>
        </div>
        </section>
    );
}