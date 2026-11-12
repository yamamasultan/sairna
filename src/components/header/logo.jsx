
import { BusFront } from "lucide-react";

function Logo() {
    return (
        <div
        dir="rtl"
        className="flex shrink-0 items-center gap-3 whitespace-nowrap"
        >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0DB5A5]">
            <BusFront size={34} className="text-white" />
        </div>

        <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold leading-tight text-[#0C3042] dark:text-white">
            سيرنا<span className="text-[#0DB5A5]">.</span>
            </h1>

            <p className="mt-1 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
            رحلتك بتبلّش من هون
            </p>
        </div>
        </div>
    );
}

export default Logo;
