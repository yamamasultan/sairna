import { Sparkles } from "lucide-react";
import { stepsData } from "./stepsdata";

const StepsSection = () => {
    return (
        <section className="w-full bg-[#FAFAFA] py-16 px-4 md:px-8" dir="rtl">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F7F5] text-[#0D9488] font-semibold text-xs md:text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>السفر صار أبسط</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F3A3E] text-center mb-3">
            3 خطوات... <span className="text-[#0D9488]">وتكون بالطريق</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base text-center mb-12">
            ما في داعي للتعقيد. كل شي مرتب بواجهة وحدة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {stepsData.map((step) => {
                const IconComponent = step.icon;

                return (
                <div
                    key={step.number}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-64"
                >
                    
                    <div className="flex items-start justify-between w-full">
                    <div
                        className={`w-12 h-12 rounded-2xl ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0`}
                    >
                        <IconComponent className="w-6 h-10" />
                    </div>
                    <span className="text-4xl md:text-5xl font-black text-gray-200 tracking-wider">
                        {step.number}
                    </span>
                    
                    </div>

                    {/* Bottom Row: Title & Description */}
                    <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#0F3A3E]">
                        {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
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