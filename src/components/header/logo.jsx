function Logo() {
    return (
        <a
            href="#home"
            dir="rtl"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="سيرنا - الرئيسية"
        >
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[12px] bg-[var(--soft-teal)]">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjMjBjNGFlIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA4YTk4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMiIgeT0iMyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjU4IiByeD0iMjAiIGZpbGw9InVybCgjYSkiLz48cGF0aCBkPSJNMTEgMzlWMjNjMC02IDUtMTAgMTEtMTBoMjBjNyAwIDEyIDUgMTIgMTJ2MTVIMTFaIiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMTciIHk9IjIwIiB3aWR0aD0iMjkiIGhlaWdodD0iMTMiIHJ4PSI0IiBmaWxsPSIjYjhlYWYwIi8+PHBhdGggZD0ibTI5IDIwIDcgMTMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iMTAiIHk9IjM2IiB3aWR0aD0iNDUiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSIjZjJmYWZiIi8+PGNpcmNsZSBjeD0iMjIiIGN5PSI0NSIgcj0iNS4yIiBmaWxsPSIjMTAzZDUxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDUiIHI9IjUuMiIgZmlsbD0iIzEwM2Q1MSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTIgMjhoNU00OCAyOGg1IiBzdHJva2U9IiMwZDc4OTMiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg=="
                    alt="شعار سيرنا"
                    className="h-full w-full object-contain"
                />
            </span>

            <span className="flex flex-col leading-tight">
                <strong className="text-[30px] font-black tracking-[-1.5px] text-[var(--text)]">
                    سيرنا<span className="text-[var(--primary)]">.</span>
                </strong>
                <small className="mt-[7px] whitespace-nowrap text-[9px] font-bold text-[var(--muted)]">
                    رحلتك بتبلّش من هون
                </small>
            </span>
        </a>
    );
}
export default Logo;