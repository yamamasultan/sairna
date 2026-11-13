import { useState, useEffect, useRef } from 'react';
import {
    Sparkles,
    CheckCircle2,
    ArrowLeft,
    ExternalLink,
    Navigation,
    MapPin,
    ArrowUpRight,
    } from 'lucide-react';

    export default function JourneySection({ onNavigateSearch }) {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const timerRef = useRef(null);

    const googleMapsUrl =
        'https://www.google.com/maps/dir/?api=1&origin=36.2021,37.1343&destination=33.5138,36.2765&travelmode=driving';

    useEffect(() => {
        const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isRunning) return;

        if (prefersReducedMotion) {
        setProgress(100);
        setIsRunning(false);
        setIsCompleted(true);
        return;
        }

        const startTime = performance.now();
        const duration = 10000;

        const updateProgress = (now) => {
        const elapsed = now - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(currentProgress);

        if (currentProgress < 100) {
            timerRef.current = requestAnimationFrame(updateProgress);
        } else {
            setIsRunning(false);
            setIsCompleted(true);
        }
        };

        timerRef.current = requestAnimationFrame(updateProgress);

        return () => {
        if (timerRef.current) {
            cancelAnimationFrame(timerRef.current);
        }
        };
    }, [isRunning]);

    const handleStartJourney = () => {
        if (isRunning) return;
        if (isCompleted) {
        setProgress(0);
        setIsCompleted(false);
        }
        setIsRunning(true);
    };

    const getButtonText = () => {
        if (isRunning) return 'جاري تتبّع الرحلة';
        if (isCompleted) return 'إعادة التجربة';
        return 'جرّب تتبّع رحلة';
    };

    const handleCtaClick = () => {
        if (typeof onNavigateSearch === 'function') {
        onNavigateSearch();
        } else {
        window.location.href = '/search';
        }
    };

    const busTop = 18 + progress * 0.62;
    const busRight = 32 + progress * 0.24;

    return (
        <div 
        dir="rtl" 
        className="flex flex-col gap-10 py-8 sm:py-12 font-[var(--font)] bg-[var(--bg)] text-[var(--text)] transition-colors duration-300"
        >
        {/* القسم الأول: Journey Tracking Section */}
        <section className="container">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden shadow-sm transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* العمود الأول: المحتوى النصي (في اليمين) */}
                <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-start text-right bg-[var(--surface)] transition-colors duration-300">
                <div className="inline-flex items-center gap-2 bg-[var(--soft-teal)] text-[var(--primary)] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-5 transition-colors duration-300">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>وين وصلت الرحلة؟</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[var(--text)] leading-[1.2] mb-4">
                    الطريق قدامك.
                    <span className="block text-[var(--primary)] mt-1">لحظة بلحظة؟</span>
                </h2>

                <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                    بصفحة التّتبع بتشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل وواضح.
                </p>

                <ul className="flex flex-col gap-3 mb-8 w-full">
                    <li className="flex items-center gap-3 text-[var(--text)] text-sm sm:text-base font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                    <span>عرض المسار على الخريطة</span>
                    </li>
                    <li className="flex items-center gap-3 text-[var(--text)] text-sm sm:text-base font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                    <span>وقت وصول تقديري ومحطات الطريق</span>
                    </li>
                </ul>

                <button
                    type="button"
                    onClick={handleStartJourney}
                    disabled={isRunning}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white font-bold px-8 py-3.5 rounded-[16px] shadow-md transition-all duration-200 cursor-pointer ${
                    isRunning ? 'opacity-85 cursor-not-allowed' : 'hover:-translate-y-0.5'
                    }`}
                >
                    <span>{getButtonText()}</span>
                    <ArrowLeft className={`w-5 h-5 ${isRunning ? 'animate-pulse' : ''}`} />
                </button>

                <p className="text-[var(--muted)] text-xs mt-4 leading-normal">
                    * الخريطة وحركة الحافلة في هذا النموذج توضيحية وليست GPS مباشر.
                </p>
                </div>

                {/* العمود الثاني: مساحة الخريطة (في اليسار) */}
                <div className="bg-[var(--surface-alt)] border-t lg:border-t-0 lg:border-r border-[var(--border)] p-5 sm:p-7 flex flex-col justify-between gap-4 transition-colors duration-300">
                
                {/* رأس الخريطة */}
                <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full text-xs font-bold text-[var(--text)] transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                    <span>{isCompleted ? 'وصلت الرحلة' : 'معاينة مسار رحلة'}</span>
                    </div>

                    <div className="text-[var(--text)] font-bold text-sm" dir="ltr">
                    حلب ← دمشق
                    </div>
                </div>

                {/* إطار الخريطة */}
                <div className="relative w-full h-[240px] sm:h-[280px] rounded-[16px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300">
                    <iframe
                    title="مسار الرحلة من حلب إلى دمشق"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1705658.4!2d36.75!3d34.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc413cc6a7%3A0x877546e4882af620!2sSyria!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-95 transition-all"
                    />

                    {/* زر Open in Maps */}
                    <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="absolute top-3 left-3 z-10 bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--primary)] px-3.5 py-2 rounded-xl shadow-md border border-[var(--border)] inline-flex items-center gap-2 text-xs font-bold transition-colors"
                    >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* مؤشر الحافلة المتحرك */}
                    <div
                    className="absolute z-10 pointer-events-none transition-all duration-100 ease-linear flex flex-col items-center"
                    style={{
                        top: `${busTop}%`,
                        right: `${busRight}%`,
                        transform: 'translate(50%, -50%)',
                    }}
                    >
                    <div className="bg-[var(--primary)] text-white p-2 rounded-full shadow-lg ring-4 ring-[var(--primary)]/25">
                        <Navigation className="w-4 h-4 -rotate-135" />
                    </div>
                    </div>

                    {/* زر فتح المسار في الأسفل */}
                    <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-3 z-10 bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--text)] px-3 py-1.5 rounded-xl shadow-sm border border-[var(--border)] inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                    >
                    <span>فتح المسار في Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--primary)]" />
                    </a>
                </div>

                {/* شريط التقدم السفلي */}
                <div className="flex items-center gap-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 text-[var(--text)] text-xs sm:text-sm font-bold shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--primary)]" />
                    <span>حلب</span>
                    </div>

                    <div className="relative flex-1 h-1.5 bg-[var(--border)] rounded-full">
                    <div
                        className="absolute top-0 right-0 h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[var(--primary)] border-2 border-[var(--surface)] shadow"
                        style={{ right: `${progress}%` }}
                    />
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[var(--text)] text-xs sm:text-sm font-bold shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--muted)]" />
                    <span>دمشق</span>
                    </div>
                </div>

                </div>

            </div>
            </div>
        </section>

        {/* القسم الثاني: Journey CTA Section */}
        <section className="container">
            <div
            className="relative overflow-hidden rounded-[var(--radius)] p-7 sm:p-11 lg:px-14 lg:py-12 shadow-lg text-white"
            style={{
                background:
                'linear-gradient(270deg, var(--primary-deep) 0%, var(--dark) 55%, var(--dark-deep) 100%)',
            }}
            >
            <div className="absolute -top-24 left-1/3 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col items-start text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/95 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3.5 border border-white/15">
                    <Sparkles className="w-4 h-4 text-[#5eead4]" />
                    <span>جاهز تغير جو؟</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight mb-2">
                    الطريق الجاي بيناديك.
                </h2>

                <p className="text-white/80 text-sm sm:text-base">
                    دوّر على رحلة، واحجز أول مقعد إلك.
                </p>
                </div>

                <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--text)] font-bold px-8 py-4 rounded-[16px] shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                <span>يلا نلاقي رحلة</span>
                <ArrowLeft className="w-5 h-5 text-[var(--primary)]" />
                </button>
            </div>
            </div>
        </section>
        </div>
    );
}