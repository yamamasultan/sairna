
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Route,
  Users,
  Truck,
  Ticket,
  UserCircle,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  X,
  Bus,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard, end: true },
  { to: "/dashboard/trips", label: "الرحلات", icon: Route },
  { to: "/dashboard/drivers", label: "السائقون", icon: Users },
  { to: "/dashboard/vehicles", label: "المركبات", icon: Truck },
  { to: "/dashboard/bookings", label: "الحجوزات", icon: Ticket },
  { to: "/dashboard/customers", label: "العملاء", icon: UserCircle },
  { to: "/dashboard/reports", label: "التقارير", icon: BarChart3 },
  { to: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 right-0 z-40 h-screen
          flex flex-col shrink-0
          border-l shadow-sm
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${
            mobileOpen
              ? "w-64 translate-x-0"
              : "w-64 translate-x-full lg:translate-x-0"
          }
        `}
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          borderColor: "var(--border)",
          minWidth: collapsed ? "80px" : "256px",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 shrink-0"
          style={{
            height: "72px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--primary)" }}
          >
            <Bus className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <span className="text-lg font-bold whitespace-nowrap">
              سايرنا
            </span>
          )}

          <button
            className="lg:hidden mr-auto p-2 rounded-lg"
            style={{ color: "var(--muted)" }}
            onClick={() => setMobileOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5 flex flex-col"
          style={{ gap: "8px" }}
        >
          {!collapsed && (
            <p
              className="text-xs font-semibold px-3 mb-2"
              style={{ color: "var(--muted)" }}
            >
              القائمة الرئيسية
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className="flex items-center rounded-xl transition-all duration-200"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: "12px",
                  minHeight: "48px",
                  padding: collapsed ? "12px" : "12px 14px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive
                    ? "var(--primary-deep)"
                    : "var(--muted)",
                  background: isActive
                    ? "var(--soft-teal)"
                    : "transparent",
                  borderRight: isActive
                    ? "3px solid var(--primary)"
                    : "3px solid transparent",
                })}
              >
                <Icon size={20} className="shrink-0" />

                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div
          className="hidden lg:flex items-center justify-center py-4 shrink-0"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 rounded-xl transition-all duration-200 hover:opacity-80"
            style={{
              color: "var(--muted)",
              background: "var(--surface-alt)",
            }}
            title={collapsed ? "توسيع القائمة" : "تصغير القائمة"}
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
