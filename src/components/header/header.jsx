import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import TopBar from "./topBar";
import Logo from "./logo";
import NavBar from "./navBar";
import UserActions from "./userActions";

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeItem, setActiveItem] = useState("الرئيسية");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((p) => !p);

    const navItems = ["الرئيسية", "احجز رحلة", "شركات النقل", "حجوزاتي", "تتبّع الرحلة"];

    return (
        <header
            dir="rtl"
            className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)] text-[var(--text)] backdrop-blur-md transition-colors duration-200"
            style={{ backgroundColor: "color-mix(in srgb, var(--surface) 96%, transparent)" }}
        >
            <TopBar />

            <div className="container mx-auto px-4">
                <div className="flex h-[83px] items-center justify-between gap-4">
                    {/* اللوجو */}
                    <Logo />

                    {/* القائمة الرئيسية للشاشات الكبيرة (تم رفع نقطة التوقف إلى xl لضمان عدم التداخل) */}
                    <div className="hidden xl:block">
                        <NavBar activeItem={activeItem} setActiveItem={setActiveItem} />
                    </div>

                    {/* أزرار الإجراءات وزر القائمة للموبايل/التابلت */}
                    <div className="flex items-center gap-3">
                        <UserActions isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                        {/* زر قائمة الموبايل والتابلت (يظهر الآن حتى شاشات الـ xl لتجنب أي ازدحام) */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((p) => !p)}
                            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
                            className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)] xl:hidden"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* لوحة الموبايل والتابلت المنسدلة */}
            {mobileOpen && (
                <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 xl:hidden shadow-lg transition-all">
                    <ul className="flex flex-col gap-1.5">
                        {navItems.map((item) => {
                            const isActive = activeItem === item;
                            return (
                                <li key={item}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveItem(item);
                                            setMobileOpen(false);
                                        }}
                                        className={`flex w-full items-center justify-between rounded-[10px] px-3.5 py-3 text-xs font-extrabold transition-colors ${
                                            isActive
                                                ? "bg-[var(--soft-teal)] text-[var(--primary)]"
                                                : "text-[var(--muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
                                        }`}
                                    >
                                        <span>{item}</span>
                                        <span className={`text-[var(--primary)] transition-transform ${isActive ? "opacity-100" : "opacity-0"}`}>‹</span>
                                    </button>
                                </li>
                            );
                        })}
                        <hr className="my-2 border-[var(--border)]" />
                        <li className="grid grid-cols-2 gap-2 pt-1">
                            <a
                                href="#login"
                                className="flex items-center justify-center rounded-[10px] border border-[var(--border)] px-3 py-2.5 text-xs font-extrabold text-[var(--text)] hover:bg-[var(--surface-alt)]"
                            >
                                تسجيل الدخول
                            </a>
                            <a
                                href="#register"
                                className="flex items-center justify-center rounded-[10px] bg-[var(--dark)] px-3 py-2.5 text-xs font-extrabold text-white"
                            >
                                إنشاء حساب
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;