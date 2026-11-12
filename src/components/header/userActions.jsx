import { Moon, Sun, ArrowLeft } from "lucide-react";

function UserActions({ isDarkMode, toggleDarkMode }) {
    return (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3" dir="rtl">
            {/* زر الوضع الليلي: يظهر دائماً على كل الشاشات */}
            <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="تبديل المظهر"
                title="تبديل المظهر"
                className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]"
            >
                {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* رابط الدخول: مخفي على الموبايل والتابلت الصغير، ويظهر على الشاشات الكبيرة */}
            <a
                href="#login"
                className="hidden whitespace-nowrap text-xs font-extrabold text-[var(--text)] hover:text-[var(--primary)] xl:inline-block"
            >
                دخول
            </a>

            {/* زر إنشاء حساب: مخفي على الموبايل (حتى لا يزاحم زر القائمة)، ويظهر من التابلت فما فوق */}
            <a
                href="#register"
                className="hidden min-h-[40px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[12px] bg-[var(--dark)] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] md:inline-flex"
            >
                إنشاء حساب
                <ArrowLeft size={16} />
            </a>
        </div>
    );
}

export default UserActions;