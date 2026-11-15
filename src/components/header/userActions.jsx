
import { useState, useEffect } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function UserActions({ isDarkMode, toggleDarkMode }) {
    const navigate = useNavigate();

    // قراءة المستخدم مباشرة عند تحميل المكون
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("sairna_user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    // تحديث بيانات المستخدم
    const checkAuthUser = () => {
        try {
            const storedUser = localStorage.getItem("sairna_user");
            const token = localStorage.getItem("sairna_token");

            if (storedUser && token) {
                setCurrentUser(JSON.parse(storedUser));
            } else {
                setCurrentUser(null);
            }
        } catch {
            setCurrentUser(null);
        }
    };

    useEffect(() => {

        // الاستماع لتسجيل الدخول والخروج
        window.addEventListener("sairna_auth_change", checkAuthUser);
        window.addEventListener("storage", checkAuthUser);

        return () => {
            window.removeEventListener("sairna_auth_change", checkAuthUser);
            window.removeEventListener("storage", checkAuthUser);
        };
    }, []);

    // الحرف الأول من اسم المستخدم
    const getInitial = () => {
        if (currentUser?.name) {
            return currentUser.name.trim().charAt(0).toUpperCase();
        }

        if (currentUser?.email) {
            return currentUser.email.trim().charAt(0).toUpperCase();
        }

        return "U";
    };

    // تسجيل الخروج
    const handleLogout = () => {
        localStorage.removeItem("sairna_token");
        localStorage.removeItem("sairna_user");

        sessionStorage.removeItem("sairna_token");

        setCurrentUser(null);

        window.dispatchEvent(new Event("sairna_auth_change"));

        navigate("/", {
            replace: true,
            state: {
                toastMessage: "تم تسجيل الخروج من النموذج."
            }
        });
    };

    return (
        <div
            className="flex shrink-0 items-center gap-2 sm:gap-3"
            dir="rtl"
        >
            {/* زر الوضع الليلي والنهاري */}
            <button
                type="button"
                onClick={toggleDarkMode}
                aria-label="تبديل المظهر"
                title="تبديل المظهر"
                className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]"
            >
                {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {currentUser ? (
                /* المستخدم مسجل الدخول */
                <div className="relative group">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2.5 rounded-[14px] px-2.5 py-1.5 transition-colors hover:bg-[var(--surface-alt)]"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-teal)] text-sm font-black text-[var(--primary)] shadow-sm">
                            {getInitial()}
                        </span>

                        <span className="hidden max-w-[100px] truncate text-xs font-extrabold text-[var(--text)] sm:inline-block">
                            {currentUser.name || currentUser.email}
                        </span>

                        <ChevronDown
                            size={15}
                            className="text-[var(--muted)]"
                        />
                    </Link>

                    {/* قائمة الحساب */}
                    <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 translate-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

                        <Link
                            to="/profile"
                            className="block rounded-lg px-3 py-2.5 text-xs font-bold text-[var(--text)] transition-colors hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]"
                        >
                            ملفي الشخصي
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full rounded-lg px-3 py-2.5 text-right text-xs font-bold text-red-500 transition-colors hover:bg-red-50"
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            ) : (
                /* المستخدم غير مسجل الدخول */
                <>
                    <Link
                        to="/login"
                        className="hidden whitespace-nowrap px-2 text-xs font-extrabold text-[var(--text)] hover:text-[var(--primary)] xl:inline-block"
                    >
                        دخول
                    </Link>

                    <Link
                        to="/register"
                        className="hidden min-h-[40px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[12px] bg-[var(--dark)] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] md:inline-flex"
                    >
                        إنشاء حساب
                    </Link>
                </>
            )}
        </div>
    );
}

export default UserActions;
