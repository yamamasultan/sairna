import { useNavigate } from 'react-router-dom';
import { Headphones } from 'lucide-react';

export default function HelpSupportCard() {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-[380px] shrink-0 bg-[var(--soft-teal)] border border-[var(--border)] rounded-[22px] p-6 md:p-8 flex flex-col items-center text-center shadow-sm h-fit">
      {/* أيقونة سماعات الرأس */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--primary)] mb-4">
        <Headphones className="w-8 h-8" />
      </div>

      {/* العنوان */}
      <h3 className="text-xl font-bold text-[var(--text)] mb-3">
        بحاجة لمساعدة؟
      </h3>

      {/* النص التوضيحي */}
      <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed mb-6">
        هاد الموقع نموذج واجهات تعليمية، وممكن تطورو لاحقاً لتضيفوا نظام دعم حقيقي.
      </p>

      {/* زر العودة للرئيسية */}
      <button
        onClick={() => navigate('/')}
        className="w-full py-3 px-6 rounded-[16px] bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white font-bold text-sm transition-colors duration-200 shadow-md"
      >
        رجوع للرئيسية
      </button>
    </div>
  );
}