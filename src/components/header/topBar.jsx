import { Sparkles } from "lucide-react";

function TopBar() {
    return (
        <div
            dir="rtl"
            className="flex min-h-[32px] items-center justify-center gap-2.5 bg-[var(--dark-deep)] px-4 text-[10px] font-bold text-[#d4f2ec] tracking-[0.1px]"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-[#58d7bb] shadow-[0_0_0_4px_rgba(88,215,187,0.12)]" />
            <span>رحلة بين المدن السورية، بخطوات بسيطة وواضحة</span>
            <span className="inline-flex items-center justify-center text-[#ffce87]">
                <Sparkles size={13} />
            </span>
        </div>
    );
}
export default TopBar;