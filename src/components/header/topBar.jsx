import { Sparkles } from "lucide-react";

function topBar() {
    return (
        <div dir="rtl"
        className="flex h-10 items-center justify-center gap-2 bg-[#042131] px-4 text-sm font-medium text-white"
        >
            <span className="h-2 w-2 rounded-full bg-[#42D6B8] flex items-center justify-between"/>
        
        <span>
            رحلة بين المدن السورية,بخطوات بسيطة وواضحة
        </span>
            <Sparkles size={16} className="text-amber-400"/>
        </div>
    );
}
export default topBar;