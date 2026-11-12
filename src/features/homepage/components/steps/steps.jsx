import { Sparkles } from "lucide-react";
import { stepsData } from "./stepsdata";

const StepsSection = () => {
    return (
        // غيرنا الخلفية من bg-[#FAFAFA] لـ var(--surface-alt)
        <section className="w-full py-16 px-4 md:px-8 transition-colors duration-300" style={{ backgroundColor: 'var(--surface-alt)' }} dir="rtl">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            
            {/* البادج */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-semibold text-xs md:text-sm mb-4" 
                 style={{ backgroundColor: 'var(--soft-teal)', color: 'var(--primary)' }}>
                <Sparkles className="w-4 h-4" />
                <span>السفر صار أبسط</span>
            </div>

            {/* العنوان */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-3" style={{ color: 'var(--text)' }}>
                3 خطوات... <span style={{ color: 'var(--primary)' }}>وتكون بالطريق</span>
            </h2>
            <p className="text-sm md:text-base text-center mb-12" style={{ color: 'var(--muted)' }}>
                ما في داعي للتعقيد. كل شي مرتب بواجهة وحدة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {stepsData.map((step) => {
                const IconComponent = step.icon;

                return (
                <div
                    key={step.number}
                    className="rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-64
                    max-md:h-auto max-md:py-5 max-md:px-4 max-md:flex-row max-md:items-center max-md:justify-between max-md:gap-4 max-md:rounded-2xl"
                    style={{ 
                        backgroundColor: 'var(--surface)', // لون الكرت
                        borderColor: 'var(--border)'
                    }}
                >
                    
                    <div className="flex items-start justify-between w-full max-md:order-2 max-md:w-auto max-md:shrink-0">
                    {/* الأيقونة */}
                    <div
                        className={`w-12 h-12 rounded-2xl ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0`}
                    >
                        <IconComponent className="w-6 h-10" />
                    </div>
                    {/* الرقم - لونه بياخد من النص مع شفافية */}
                    <span 
                        className="text-4xl md:text-5xl font-black tracking-wider max-md:hidden opacity-20"
                        style={{ color: 'var(--text)' }}
                    >
                        {step.number}
                    </span>
                    </div>

                    {/* العنوان والوصف */}
                    <div className="flex flex-col gap-2 max-md:order-1 max-md:flex-1 max-md:text-right">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                        {step.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {step.description}
                    </p>
                    </div>
                </div>
                );
            })}
            </div>

        </div>
        </section>
    );
};

export default StepsSection;