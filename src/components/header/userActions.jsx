import { Moon , Sun, ArrowLeft}from"lucide-react"


function userActions({isDarkMode,toggleDarkMode}) {
    return (
        <div className="flex shrink-0 items-center gap-4" dir="rtl gap-10">
        <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-[#0C3042] dark:border-gray-700 dark:text-white gap-20"
        >
            { isDarkMode ? (
            <Sun size={22}/>
            ) : (
            <Moon size={22}/>

            )
            }
        </button>

        <button type="button"
                className="font-bold text-[#0C3042] dark:text-white"
                > 
                    دخول
        </button>

        <button  type="button"
            className="flex items-center gap-3 rounded-xl bg-[#0C3042] px-5 py-3 font-bold text-white
            hover:bg-[#16465B]hover:-translate-y-1 transition-transform duration-200
            hover:shadow-lg hover:-translate-y-1 hover-shadow lg cursor-pointer"
            
            >
            انشاء حساب
            <ArrowLeft size={18}/>
            </button>
        
        </div>
    );
}

export default userActions;