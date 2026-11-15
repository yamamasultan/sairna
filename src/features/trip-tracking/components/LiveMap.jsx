import { ExternalLink } from 'lucide-react';

export const LiveMap = ({ departureCity = 'حلب', arrivalCity = 'دمشق' }) => {
    const googleMapsUrl = "https://www.google.com/maps/dir/%D8%AD%D9%84%D8%A8%ط1,%D8%B3%D9%88%D8%B1%D9%8A%D8%A7/%D8%AF%D9%85%D8%B4%D9%82%ط1,%D8%B3%D9%88%D8%B1%D9%8A%D8%A7";


    return (
        <section className="relative flex h-[340px] min-h-[340px] w-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-sm sm:h-[460px] lg:h-full lg:min-h-[560px]">
        <iframe
            title={`خريطة الطريق من ${departureCity} إلى ${arrivalCity}`}
            src={googleMapsUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
        />
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/95 px-3 py-2 text-[11px] font-bold text-[var(--text)] shadow-sm">
            خريطة تفاعلية
        </span>
        <div className="absolute bottom-3 right-3 left-3 flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-lg bg-[var(--surface)]/95 px-3 py-2 text-xs font-semibold text-[var(--text)] shadow-sm">
            {departureCity} ــ {arrivalCity}
            </span>
            <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs font-bold text-[var(--text)] shadow-md transition hover:text-[var(--primary)]"
            >
            <ExternalLink size={14} className="text-[var(--primary)]" />
            عرض الطرق في Google Maps
            </a>
        </div>
        </section>
    );
};

export default LiveMap;
