import HelpHero from './HelpHero';
import FaqAccordion from './FaqAccordion';
import HelpSupportCard from './HelpSupportCard';

export default function HelpCenterPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg)] pb-16 transition-colors duration-300">
      {/* القسم العلوي (فوق الخط) */}
      <HelpHero />

      {/* القسم السفلي (تحت الخط) */}
      <div className="container pt-10 md:pt-14">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* قائمة الأسئلة الشائعة على اليمين */}
          <FaqAccordion />

          {/* البطاقة الجانبية على اليسار */}
          <HelpSupportCard />
        </div>
      </div>
    </div>
  );
}