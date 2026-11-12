function NavBar({ activeItem, setActiveItem }) {
    const navItems = ["الرئيسية", "احجز رحلة", "شركات النقل", "حجوزاتي", "تتبّع الرحلة"];

    return (
        <nav dir="rtl" className="mx-auto hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            <ul className="flex items-center gap-7">
                {navItems.map((item) => {
                    const isActive = activeItem === item;
                    return (
                        <li key={item}>
                            <button
                                type="button"
                                onClick={() => setActiveItem(item)}
                                className={`group relative cursor-pointer whitespace-nowrap py-8 text-xs font-extrabold transition-colors ${
                                    isActive
                                        ? "text-[var(--text)]"
                                        : "text-[var(--muted)] hover:text-[var(--text)]"
                                }`}
                            >
                                {item}
                                <span
                                    className={`absolute bottom-[17px] left-1/2 h-[3px] -translate-x-1/2 rounded-[5px] bg-[var(--primary)] transition-all duration-200 ${
                                        isActive
                                            ? "w-[23px] opacity-100"
                                            : "w-0 opacity-0 group-hover:w-[23px] group-hover:opacity-100"
                                    }`}
                                />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
export default NavBar;