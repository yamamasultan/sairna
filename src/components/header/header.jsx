
import { useState, useEffect } from "react";

import TopBar from "./topBar";
import Logo from "./logo";
import NavBar from "./navBar";
import UserActions from "./userActions";

function Header() {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const [activeItem, setActiveItem] = useState("الرئيسية");

    useEffect(() => {
        document.documentElement.classList.toggle(
        "dark",
        isDarkMode
        );
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
    <header
        dir="rtl"
        className="w-full bg-white text-[#0C3042] dark:bg-[#0B1528] dark:text-white"
    >
        <TopBar />

        <div className="w-full">
        <div className="mx-auto grid max-w[1536px] grid-cols-[auto_1fr_auto] items-center gap-6 px-8 py-5">

            <Logo />

            <div className="flex justify-center">
            <NavBar
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            </div>

            <UserActions
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            />

        </div>
        </div>
    </header>
);

}

export default Header;
