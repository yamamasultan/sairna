import { Sparkles, ShieldCheck, Ticket } from 'lucide-react';
import Image from '../../login/imag/Syria,_Damascus,_The_Umayyad_Mosque.jpg';

export default function RegisterBanner() {
  return (
    <div className="lg:col-span-6 bg-gradient-to-br from-[#0a2c3e] via-[#103a4e] to-[#0f4c5c] p-7 sm:p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden order-1 lg:order-2">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-dashed border-white/15 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full border border-dashed border-white/10 pointer-events-none" />

      <div className="relative z-10 text-right">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-white/95 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#0aa99b]" />
          <span>عالم جديد بانتظارك</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.25] tracking-tight mb-3">
          كل الطرق
          <br />
          بتوّصل لذكريات.
        </h2>
        <p className="text-sm sm:text-base text-white/75 font-medium">
          ومن أول محطة رح نكون معك.
        </p>
      </div>

      <div className="relative z-10 my-8 flex justify-center">
        <div className="w-full max-w-[420px] rounded-[22px] overflow-hidden shadow-2xl border-4 border-white/15 transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-[#0a2c3e]">
          <img
            src={Image}
            alt="الجامع الأموي في دمشق - سيرنا للنقل"
            className="w-full h-52 sm:h-64 object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 hidden sm:flex items-center justify-center gap-6 pt-2 text-xs sm:text-sm text-white/85 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0aa99b]" />
          <span>سهل وواضح</span>
        </div>
        <span className="text-white/25">|</span>
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-[#0aa99b]" />
          <span>حجز بخطوات بسيطة</span>
        </div>
      </div>
    </div>
  );
}