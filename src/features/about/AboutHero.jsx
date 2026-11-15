import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <div className="flex flex-col items-start gap-4 text-right pb-10 border-b border-[var(--border)]">
      {/* شارة قصتنا */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--soft-teal)] text-[var(--primary)] text-xs font-bold shadow-xs">
        <Sparkles className="w-3.5 h-3.5" />
        <span>قصتنا</span>
      </div>

      {/* العنوان الرئيسي */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
        سيرنا. <span className="text-[var(--primary)]">رحلة أبسط لكل حدا.</span>
      </h1>

      {/* الوصف المختصر */}
      <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed max-w-2xl">
        فكرة موقع لحجز الرحلات البرية بين المحافظات السورية، ابنت كنموذج لتعليم تصميم وتطوير الويب.
      </p>
    </div>
  );
};

export default AboutHero;