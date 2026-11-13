import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Globe, Bus } from "lucide-react";
import { footerNavigation } from "./footer-data";

const Footer = () => {
    const [copied, setCopied] = useState(false);

    // دالة نسخ البريد وإظهار الإشعار التفاعلي
    const handleCopyEmail = () => {
        navigator.clipboard.writeText("hello@sairna.example");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="w-full bg-[#071c26] text-[#b0bec5] pt-12 pb-8 px-6 sm:px-10" dir="rtl">
        {/* 
            حاوية رئيسية بتخطيط عمودين متناسقين تماماً كما في الصورة
        */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-10 border-b border-white/10">
            
            {/* القسم الأول: الشعار، الوصف، وأيقونات التواصل */}
            <div className="flex flex-col items-start text-right gap-4">
            
            {/* الشعار */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00cec9] rounded-2xl flex items-center justify-center text-white shadow-md shrink-0">
                <Bus className="w-6 h-6" />
                </div>
                
                <div className="flex flex-col items-start">
                <div className="flex items-baseline">
                    <span className="text-3xl font-black text-white tracking-tight">سيرنا</span>
                    <span className="w-1.5 h-1.5 bg-[#00cec9] rounded-xs mr-1 inline-block"></span>
                </div>
                <span className="text-xs text-[#90a4ae] tracking-wide mt-0.5">رحلتك بتّبلش من هون</span>
                </div>
            </div>

            <p className="text-[#90a4ae] text-sm leading-relaxed text-right max-w-sm">
                طريقة أجمل وأسهل للسفر بين المحافظات السورية. ابحث، اختر، واحجز بكل راحة.
            </p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-3 mt-1">
                <a href="#phone" className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center hover:bg-[#00cec9] hover:border-transparent transition-all duration-300">
                <Phone className="w-4 h-4 text-white" />
                </a>
                <a href="#email" className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center hover:bg-[#00cec9] hover:border-transparent transition-all duration-300">
                <Mail className="w-4 h-4 text-white" />
                </a>
                <a href="#globe" className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center hover:bg-[#00cec9] hover:border-transparent transition-all duration-300">
                <Globe className="w-4 h-4 text-white" />
                </a>
            </div>
            </div>

            {/* القسم الثاني: أعمدة وروابط القوائم (تظهر بجانب بعضها ضمن العمود الثاني أو مقسمة بشكل مرتب) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-right">
            {Object.entries(footerNavigation).map(([key, section], index) => (
                <div key={index} className="flex flex-col gap-4">
                    <h3 className="text-base font-bold text-white tracking-wide">
                    {section.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                    {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                        <Link
                            to={link.path}
                            className="text-sm text-[#b0bec5] hover:text-[#00cec9] transition-colors duration-200 block py-0.5"
                        >
                            {link.name}
                        </Link>
                        </li>
                    ))}

                    {/* البريد الإلكتروني التفاعلي تحت قسم المساعدة */}
                    {key === "support" && (
                        <li className="pt-2 relative">
                        <button
                            onClick={handleCopyEmail}
                            className="group flex items-center gap-2 text-sm text-[#b0bec5] hover:text-[#00cec9] transition-all duration-200 cursor-pointer"
                            title="انقر لنسخ البريد"
                        >
                            <Mail className="w-4 h-4 text-[#b0bec5] group-hover:text-[#00cec9] shrink-0" />
                            <span dir="ltr" className="font-mono text-xs sm:text-sm">hello@sairna.example</span>
                        </button>

                        {/* إشعار تم النسخ */}
                        {copied && (
                            <span className="absolute -bottom-6 right-0 bg-[#00cec9] text-white text-[10px] px-2 py-0.5 rounded shadow-lg animate-fade-in">
                            تم نسخ البريد!
                            </span>
                        )}
                        </li>
                    )}
                    </ul>
                </div>
            ))}
            </div>

        </div>

        {/* قسم حقوق النشر ومصادر الصور مطابق للصورة */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col gap-2 text-[#78909c] text-[11px] text-right">
            <p>© 2026 سيرنا. جميع الحقوق محفوظة.</p>
            
        </div>
        </footer>
    );
};

Footer.displayName = "Footer";

export default Footer;