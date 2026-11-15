import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutContent = () => {
  const navigate = useNavigate();

  const handleTryTrip = () => {
    navigate("/trips"); // الانتقال إلى صفحة البحث/الرحلات
  };

  return (
    <div className="flex flex-col items-start text-right gap-6">
      {/* العنوان الفرعي */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
        فكرة صغيرة... تجربة كبيرة.
      </h2>

      {/* النص التوضيحي الأول */}
      <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
        بذلنا تجربة واضحة للمستخدم من لحظة اختيار مدينة الانطلاق والوصول، وصولاً لمقارنة الشركات، اختيار المقاعد، تأكيد التذكرة، ومشاهدة مسار الرحلة على الخريطة.
      </p>

      {/* النص التوضيحي الثاني */}
      <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
        تم تطوير هذا النموذج باستخدام HTML و CSS و JavaScript دون إطار عمل، ليكون مناسباً للتدريب والتوسع لاحقاً وربطه بواجهة API حقيقية.
      </p>

      {/* الزر التفاعلي */}
      <button
        onClick={handleTryTrip}
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-bold text-sm shadow-md hover:bg-[var(--primary-deep)] transition-all duration-300 cursor-pointer group"
      >
        <span>جرّب رحلة</span>
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default AboutContent;