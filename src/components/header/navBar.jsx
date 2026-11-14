import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    const navItems = [
        { name: "الرئيسية", path: "/" },
        { name: "احجز رحلة", path: "/booking" },
        { name: "شركات النقل", path: "/transport-companies" },
        { name: "حجوزاتي", path: "/my-bookings" },
        { name: "تتبّع الرحلة", path: "/tracking" },
    ];

    return (
        <nav dir="rtl" className="mx-auto hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            <ul className="flex items-center gap-7">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={item.name} className="relative flex flex-col items-center group">
                            <Link
                                to={item.path}
                                className={`cursor-pointer whitespace-nowrap py-8 text-xs font-extrabold transition-colors ${
                                    isActive
                                        ? "text-[var(--text)]"
                                        : "text-[var(--muted)] hover:text-[var(--text)]"
                                }`}
                            >
                                {item.name}
                            </Link>
                            {/* الخط الأخضر الذي يظهر عند المرور أو الثبات عند الاختيار */}
                            <span
                                className={`absolute bottom-[17px] h-[3px] rounded-[5px] bg-[var(--primary)] transition-all duration-200 ${
                                    isActive
                                        ? "w-[23px] opacity-100"
                                        : "w-0 opacity-0 group-hover:w-[23px] group-hover:opacity-100"
                                }`}
                            />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default NavBar;