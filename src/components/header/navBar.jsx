
function NavBar({ activeItem, setActiveItem }) {

    const navItems = [
        "الرئيسية",
        "احجز رحلة",
        "شركات النقل",
        "حجوزاتي",
        "تتبع الرحلة",
    ];

    return (
        <nav dir="rtl">
        <ul className="flex items-center gap-8">

            {navItems.map((item) => {

            const isActive = activeItem === item;

            return (
                <li key={item}>

                <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className={`relative whitespace-nowrap pb-4 pt-2 text-base font-bold ${
                    isActive
                        ? "text-[#0C3042] dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                >

                    {item}

                    <span
                    className={`absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#00A896] ${
                        isActive ? "opacity-100" : "opacity-0"
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
