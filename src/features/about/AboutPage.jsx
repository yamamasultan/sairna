import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
import AboutImageCard from "./AboutImageCard";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 py-10 px-4 sm:px-6 md:px-10" dir="rtl">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
            
            {/* قسم رأس الصفحة والعنوان */}
            <AboutHero />

            {/* قسم المحتوى والصورة بتخطيط متجاوب */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AboutContent />
            <AboutImageCard />
            
            </div>

        </div>
        </div>
    );
};

export default AboutPage;