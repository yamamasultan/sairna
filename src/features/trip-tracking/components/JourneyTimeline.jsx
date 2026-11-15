import { Bus, Check, MapPin } from 'lucide-react';

export const JourneyTimeline = ({ departureTime = '07:30', arrivalTime = '13:10', progress = 31 }) => (
    <div className="my-5 space-y-4">
        <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[var(--text)]">تقدم الرحلة</span>
        <span className="font-extrabold text-[var(--primary)]">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
        <div className="h-full rounded-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="relative space-y-6 pr-6 before:absolute before:bottom-3 before:right-[7px] before:top-2 before:w-px before:bg-[var(--border)]">
        <div className="relative flex items-start justify-between gap-3">
            <span className="absolute -right-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-white ring-4 ring-[var(--surface)]"><Check size={10} /></span>
            <div><p className="text-xs font-bold text-[var(--text)]">حلب</p><p className="mt-1 text-[10px] text-[var(--muted)]">محطة الانطلاق</p></div>
            <span className="text-[10px] text-[var(--muted)]">{departureTime}</span>
        </div>
        <div className="relative flex items-start justify-between gap-3">
            <span className="absolute -right-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-white ring-4 ring-[var(--surface)]"><Bus size={10} /></span>
            <div><p className="text-xs font-bold text-[var(--primary)]">على الطريق</p><p className="mt-1 text-[10px] text-[var(--muted)]">الحافلة تتحرك نحو الوجهة</p></div>
            <span className="text-[10px] font-bold text-[var(--primary)]">الآن*</span>
        </div>
        <div className="relative flex items-start justify-between gap-3">
            <span className="absolute -right-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] ring-4 ring-[var(--surface)]"><MapPin size={9} className="text-[var(--muted)]" /></span>
            <div><p className="text-xs font-bold text-[var(--text)]">دمشق</p><p className="mt-1 text-[10px] text-[var(--muted)]">محطة الوصول</p></div>
            <span className="text-[10px] text-[var(--muted)]">{arrivalTime}</span>
        </div>
        </div>
    </div>
);

export default JourneyTimeline;
