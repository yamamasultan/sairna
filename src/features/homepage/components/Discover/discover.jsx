import { ArrowLeft } from 'lucide-react'; 
import { discoverCards } from './discover-data.js';

export default function DiscoverSection() {
    const handleCardClick = () => {
        console.log("الانتقال إلى نفس صفحة الرحلات");
    };

    return (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
                <span className="inline-block text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full mb-3">
                اكتشف سوريا ✨
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                على وين حابب تسافر؟
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                وجهات مختلفة، ونفس الشعور الحلو لما تكون بالطريق.
                </p>
            </div>

            <button 
                onClick={handleCardClick}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors mt-4 md:mt-0 group cursor-pointer"
            >
                <span>استكشف الرحلات</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverCards.map((card) => (
                <div
                key={card.id}
                onClick={handleCardClick}
                className="relative h-96 rounded-2xl overflow-hidden shadow-md cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
                >
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.image})`, backgroundColor: '#e5e7eb' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="self-end w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-110">
                    <ArrowLeft className="w-5 h-5" />
                    </div>

                    <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                    <p className="text-gray-200 text-sm font-medium">{card.subtitle}</p>
                    </div>
                </div>

                </div>
            ))}
            </div>

        </div>
        </section>
    );
}