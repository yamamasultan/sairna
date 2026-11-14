
import { Star, Wifi, Wind, Zap, ArrowLeft } from 'lucide-react';

// المميزات الخاصة بكل شركة حسب ID القادم من الباك إند
const COMPANY_FEATURES = {
    2: ["مكيف", "Wi-Fi", "شحن USB"],
    3: ["مكيف", "مقاعد واسعة"],
    4: ["مكيف", "Wi-Fi"],
    18: ["مكيف", "شحن USB"],
};

export default function TransportCompanyCard({ company, onSelectCompany }) {
    const name = company?.name || 'شركة نقل';
    const logo = company?.logoUrl;
    const companyId = company?.id;

    const description = company?.description || "رحلات منتظمة بين المحافظات وتجربة سفر مريحة.";
    const rating = company?.rating || "4.9";

    // جلب المميزات الخاصة بالشركة فقط
    const features = COMPANY_FEATURES[companyId] || [];

    const schedule = "يومياً";
    const tripsCount = "12+";

    return (
        <div
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[28px] p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group "
        >

            {/* القسم العلوي: التقييم في اليسار والشعار في اليمين */}
            <div className="flex items-center justify-between mb-6">

                {/* شعار الشركة */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center justify-center overflow-hidden text-[var(--primary)] font-black text-xl shadow-sm">
                    {logo && logo.startsWith('http') ? (
                        <img src={logo} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <span>{name.charAt(0)}</span>
                    )}
                </div>

                {/* التقييم */}
                <div className="inline-flex items-center gap-1.5 bg-[var(--soft-teal)] text-[var(--primary)] px-3.5 py-1.5 rounded-full text-xs font-bold" dir="ltr">
                    <span>5</span>
                    <span>/</span>
                    <span>{rating}</span>
                    <Star className="w-3.5 h-3.5 fill-current text-[#008a98]" />
                </div>
            </div>

            {/* اسم الشركة والوصف */}
            <div className="flex flex-col items-start text-right mb-8">
                <h3 className="text-xl font-black text-[var(--text)] mb-2 tracking-tight">{name}</h3>
                <p className="text-[var(--muted)] text-xs leading-relaxed line-clamp-2 font-medium">
                    {description}
                </p>
            </div>

            {/* المميزات الخاصة بكل شركة */}
            <div className="flex flex-wrap items-start justify-start gap-1 mb-4" dir="rtl">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--muted)] px-1 py-1 rounded-xl text-xs font-semibold"
                    >
                        {feature.includes('مكيف') && <Wind className="w-3.5 h-3.5 text-[var(--muted)]" />}
                        {feature.includes('Wi-Fi') && <Wifi className="w-3.5 h-3.5 text-[var(--muted)]" />}
                        {feature.includes('شحن') && <Zap className="w-3.5 h-3.5 text-[var(--muted)]" />}
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <hr className="border-[var(--border)] mb-6 opacity-60" />

            {/* الرحلات والمواعيد */}
            <div className="flex items-start justify-between mb-8 px-2" dir="rtl">
                <div className="flex flex-col items-start">
                    <span className="text-[var(--text)] font-black text-base mb-0.5">{schedule}</span>
                    <span className="text-[var(--muted)] text-[11px] font-medium">مواعيد متاحة</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[var(--text)] font-black text-base mb-0.5">{tripsCount}</span>
                    <span className="text-[var(--muted)] text-[11px] font-medium">وجهة تجريبية</span>
                </div>
            </div>

            {/* زر عرض رحلات الشركة */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectCompany(companyId);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--surface)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white border border-[var(--primary)] font-bold py-3.5 px-4 rounded-[16px] transition-all duration-200 cursor-pointer text-xs shadow-sm group/btn"
            >
                <span>عرض رحلات الشركة</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
            </button>

        </div>
    );
}
