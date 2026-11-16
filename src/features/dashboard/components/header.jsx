
import { Menu, Moon, Sun, Bell, Search } from "lucide-react";
import { useTheme } from "../context/useTheme";

export function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-navy-600 border-b border-gray-100 dark:border-navy-400/30 h-16 flex items-center gap-3 px-4 lg:px-6">

      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
      >
        <Menu className="w-5 h-5 text-navy-500 dark:text-gray-300" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="بحث..."
          className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm text-navy-500 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
        />
      </div>

      <div className="flex items-center gap-2 mr-auto">

        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20">
          <Bell className="w-5 h-5 text-navy-500 dark:text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-navy-500" />
          ) : (
            <Sun className="w-5 h-5 text-gray-300" />
          )}
        </button>

        <div className="flex items-center gap-2 pr-2 border-r border-gray-100 dark:border-navy-400/30 mr-1">
          <div className="w-9 h-9 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold text-sm">
            ع
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-navy-500 dark:text-white">
              عمر السالم
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              مدير النظام
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
