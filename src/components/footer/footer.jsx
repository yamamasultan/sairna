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
        <footer className="w-full bg-[#072227] text-white pt-16 pb-8 px-4 md:px-12" dir="rtl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* العمود الأول: الشعار، الوصف، وأيقونات التواصل */}
            <div className="flex flex-col items-start text-right gap-4 md:col-span-1">
            
            {/* الشعار */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0D9488] rounded-2xl flex items-center justify-center text-white shadow-md shrink-0">
                <Bus className="w-6 h-6" />
                </div>
                
                <div className="flex flex-col items-start">
                <div className="flex items-baseline">
                    <span className="text-3xl font-black text-white tracking-tight">سيرنا</span>
                    <span className="w-1.5 h-1.5 bg-[#0D9488] rounded-xs mr-1 inline-block"></span>
                </div>
                <span className="text-xs text-gray-300 tracking-wide mt-0.5">رحلتك بتّبلش من هون</span>
                </div>
            </div>

            <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-right">
                طريقة أجمل وأسهل للسفر بين المحافظات السورية. ابحث، اختر، واحتج بكل راحة.
            </p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-3 mt-2">
                <a href="#phone" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-[#0D9488] hover:border-transparent transition-all duration-300">
                <Phone className="w-4 h-4 text-white" />
                </a>
                <a href="#email" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-[#0D9488] hover:border-transparent transition-all duration-300">
                <Mail className="w-4 h-4 text-white" />
                </a>
                <a href="#globe" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-[#0D9488] hover:border-transparent transition-all duration-300">
                <Globe className="w-4 h-4 text-white" />
                </a>
            </div>
            </div>

            {/* أعمدة الروابط */}
            {Object.entries(footerNavigation).map(([key, section], index) => (
            <div key={index} className="flex flex-col gap-4 text-right">
                <h3 className="text-lg font-bold text-white tracking-wide">
                {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                    <Link
                        to={link.path}
                        className="text-sm text-gray-300 hover:text-[#0D9488] transition-colors duration-200 block"
                    >
                        {link.name}
                    </Link>
                    </li>
                ))}

                {/* البريد الإلكتروني التفاعلي بأسلوب الصورة المرفقة */}
                {key === "support" && (
                    <li className="pt-2 relative">
                    <button
                        onClick={handleCopyEmail}
                        className="group flex items-center gap-2.5 text-sm text-gray-300 hover:text-[#0D9488] active:scale-95 transition-all duration-200 cursor-pointer"
                        title="انقر لنسخ البريد"
                    >
                        <Mail className="w-4 h-4 text-gray-300 group-hover:text-[#0D9488] transition-colors duration-200 shrink-0" />
                        <span dir="ltr" className="font-mono text-xs md:text-sm">hello@sairna.example</span>
                    </button>

                    {/* إشعار تم النسخ عند النقر */}
                    {copied && (
                        <span className="absolute -bottom-6 right-0 bg-[#0D9488] text-white text-[10px] px-2 py-0.5 rounded shadow-lg animate-fade-in">
                        تم نسخ البريد!
                        </span>
                    )}
                    </li>
                )}
                </ul>
            </div>
            ))}
        </div>

        {/* حقوق النشر */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-[11px] gap-2">
            <p>جميع الحقوق محفوظة © 2026 سيرنا.</p>
            
        </div>
        </footer>
    );
};

export default Footer;