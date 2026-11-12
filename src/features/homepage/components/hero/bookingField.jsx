import { useState } from "react";

export default function BookingField({ label, value, options, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative min-w-0 flex-1">
            <label className="mb-2 block text-xs font-bold text-[var(--muted)] text-right">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between gap-2 rounded-2xl border bg-[var(--surface)] px-4 py-3 text-sm font-bold transition outline-none ${
                    open ? "border-[var(--primary)]" : "border-[var(--border)] hover:border-gray-300"
                }`}
            >
                {/* الأيقونة أولاً، ثم النص */}
                <span className="flex items-center gap-2 text-[var(--text)]">
                    <svg className="h-4 w-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {value}
                </span>
                {/* السهم */}
                <span className={`text-[var(--primary)] text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
                    <div className="absolute top-full right-0 z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setOpen(false);
                                }}
                                className={`block w-full rounded-xl px-4 py-2.5 text-right text-sm font-bold transition hover:bg-[var(--bg)] ${
                                    value === option ? "bg-[var(--soft-teal)] text-[var(--primary)]" : "text-[var(--text)]"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}