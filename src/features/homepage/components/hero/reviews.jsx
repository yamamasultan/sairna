export default function Reviews() {
    const users = [
        { letter: "م", bg: "bg-[#FDE6C7]" },
        { letter: "س", bg: "bg-[#D1E3E0]" },
        { letter: "ع", bg: "bg-[#F2D7E2]" },
        { letter: "ل", bg: "bg-[#D0E2F2]" },
    ];

    return (
        <div className="mt-8 flex flex-wrap items-center gap-6" dir="rtl">
            <div className="flex items-center -space-x-3 space-x-reverse">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[var(--bg)] text-sm font-bold text-[#245C45] ${user.bg}`}
                    >
                        {user.letter}
                    </div>
                ))}
            </div>

            <div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--text)]">4.9/5</span>
                    <span className="text-lg tracking-wider text-[#C89539]">★★★★★</span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1 text-right">
                    تجربة سفر بتستاهل تجريبها
                </p>
            </div>
        </div>
    );
}