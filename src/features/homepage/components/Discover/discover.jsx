import { discoverData } from "./discover-data";
import { ArrowLeft, Sparkles } from "lucide-react";

const Discover = () => {
    return (
        <section className="w-full bg-[#FAFAFA] py-12 px-4 md:px-8" dir="rtl">
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="flex flex-col items-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F7F5] text-[#0D9488] font-semibold text-xs md:text-sm">
                <Sparkles className="w-4 h-4" />
                <span>اكتشف سوريا</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F3A3E]">
                على وين حابب <span className="text-[#0aa99b]">تسافر؟</span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-normal">
                وجهات مختلفة، ونفس الشعور الحلو لما تكون بالطريق.
                </p>
            </div>
            
            {/* رابط استكشف الرحلات مع حركة السهم اللطيفة */}
            <div>
                <a
                href="#explore"
                className="group/link inline-flex items-center gap-2 text-[#0D9488] hover:text-[#0B7A70] font-bold text-sm md:text-base transition-colors duration-200 cursor-pointer"
                >
                <span>استكشف الرحلات</span>
                <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover/link:-translate-x-2" />
                </a>
            </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {discoverData.map((item) => (
                <div
                key={item.id}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer"
                >
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-2xl font-bold tracking-wide">
                        {item.title}
                        </h3>
                        <span className="text-sm text-gray-200 font-light">
                        {item.subtitle}
                        </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-[#0D9488] group-hover:shadow-lg transition-colors duration-300 flex items-center justify-center shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default Discover;