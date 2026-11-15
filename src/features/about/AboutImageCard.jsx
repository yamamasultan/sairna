import Image from "./imag/Latakia.jpg"

const AboutImageCard = () => {
    return (
        <div className="w-full relative overflow-hidden rounded-[22px] shadow-lg border border-[var(--border)] group">
        <img
            src={Image}
            alt="مناظر طبيعية - سيرنا"
            className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* طبقة شفافة خفيفة لتحسين المظهر الجمالي */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
        </div>
    );
};

export default AboutImageCard;