import { Moon, Sun, ArrowLeft } from "lucide-react";

function UserActions({ isDarkMode, toggleDarkMode }) {
    return (
        <div className="flex shrink-0 items-center gap-3" dir="rtl">
            <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="تبديل المظهر"
                title="تبديل المظهر"
                className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]"
            >
                {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <a
                href="#login"
                className="hidden whitespace-nowrap text-xs font-extrabold text-[var(--text)] hover:text-[var(--primary)] sm:inline-block"
            >
                دخول
            </a>

            <a
                href="#register"
                className="inline-flex min-h-[40px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[12px] bg-[var(--dark)] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-deep)]"
            >
                إنشاء حساب
                <ArrowLeft size={16} />
            </a>
        </div>
    );
}
export default UserActions;