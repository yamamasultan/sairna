import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export default function JourneyMap({ progress, isRunning, isCompleted }) {
  // رابط Google Maps اتجاهات من حلب إلى دمشق
    const googleMapsUrl = "https://www.google.com/maps/dir/%D8%AD%D9%84%D8%A8%ط1,%D8%B3%D9%88%D8%B1%D9%8A%D8%A7/%D8%AF%D9%85%D8%B4%D9%82%ط1,%D8%B3%D9%88%D8%B1%D9%8A%D8%A7";

    return (
        <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-[22px] p-4 sm:p-5 flex flex-col gap-4 transition-colors duration-300">
        {/* رأس الخريطة */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--text)] font-semibold text-sm sm:text-base">
            <span>حلب ← دمشق</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--primary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
            <span>معاينة مسار رحلة</span>
            </div>
        </div>

        {/* مساحة الخريطة الجغرافية */}
        <div className="relative w-full h-[220px] sm:h-[260px] rounded-[16px] overflow-hidden border border-[var(--border)] bg-[#eef4f6]">
            {/* صورة خريطة تفاعلية أو خلفية خرائط واقعية مع طبقة مطابقة */}
            <iframe
            title="Journey Route Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d864117.8596046757!2d36.719665!3d35.213977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152311356f9f3801%3A0x5776d5483ea4fbe!2sAleppo%2C%20Syria!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full object-cover opacity-85 dark:opacity-75 dark:invert dark:hue-rotate-180"
            ></iframe>

            {/* زر Open in Maps العلوي الأيسر */}
            <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 bg-[var(--surface)] hover:bg-[var(--soft-teal)] text-[var(--text)] px-3.5 py-2 rounded-xl shadow-md border border-[var(--border)] flex items-center gap-2 text-xs font-bold transition-all duration-200"
            >
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--primary)]" />
            </a>

            {/* مؤشر الحافلة المتحرك على الخريطة بناءً على التقدم */}
            <div 
            className="absolute transition-all duration-300 ease-linear z-10 flex flex-col items-center pointer-events-none"
            style={{
                // تحريك تقريبي بين موقع حلب ودمشق على الخريطة
                top: `${30 + (progress * 0.45)}%`,
                right: `${25 + (progress * 0.4)}%`,
            }}
            >
            <div className="bg-[var(--primary)] text-white p-1.5 rounded-full shadow-lg animate-bounce">
                <Navigation className="w-4 h-4 transform rotate-45" />
            </div>
            <span className="bg-[var(--surface)] text-[var(--text)] text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-[var(--border)] mt-1">
                {isCompleted ? 'وصلت الرحلة' : isRunning ? 'الحافلة تتحرك...' : 'حلب'}
            </span>
            </div>
        </div>

        {/* شريط تقدم الرحلة السفلي */}
        <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
            <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-[var(--text)]">دمشق</span>
            </div>
            <span className="text-[var(--primary)] font-bold">
                {isCompleted ? '100% - وصلت الرحلة' : `${Math.round(progress)}%`}
            </span>
            <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-[var(--text)]">حلب</span>
            </div>
            </div>

            {/* الخط والتقدم */}
            <div className="relative w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div 
                className="absolute top-0 right-0 h-full bg-[var(--primary)] transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
            </div>
        </div>
        </div>
    );
}