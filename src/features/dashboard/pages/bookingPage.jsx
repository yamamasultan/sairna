
import { useMemo, useState } from "react";
import { Plus, Search, Download } from "lucide-react";

import { Card, PageHeader, StatusBadge } from "../components/ui";
import { useBookings } from "../hooks/useDashboardQueries";

const bookingStatusLabels = {
  confirmed: {
    text: "مؤكد",
    className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300",
  },
  pending: {
    text: "قيد الانتظار",
    className: "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300",
  },
  cancelled: {
    text: "ملغي",
    className: "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-300",
  },
  completed: {
    text: "مكتمل",
    className: "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400",
  },
};

const paymentLabels = {
  paid: {
    text: "مدفوع",
    className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300",
  },
  unpaid: {
    text: "غير مدفوع",
    className: "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-300",
  },
  refunded: {
    text: "مسترجع",
    className: "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400",
  },
};

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.bookings)) return response.bookings;
  if (Array.isArray(response?.data?.bookings)) return response.data.bookings;
  if (Array.isArray(response?.items)) return response.items;
  return [];
};

const getName = (value) => {
  if (!value) return "—";
  if (typeof value === "string" || typeof value === "number") return value;
  return value.name ?? value.fullName ?? "—";
};

export function BookingsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isError, error } = useBookings();

  const bookings = useMemo(() => getList(data), [data]);

  const filtered = bookings.filter((booking) => {
    const customer = getName(booking.customer ?? booking.user);
    const route = booking.route ?? booking.trip?.route ?? "";

    const matchesQuery =
      String(booking.id ?? "").includes(query) ||
      String(customer).toLowerCase().includes(query.toLowerCase()) ||
      String(route).toLowerCase().includes(query.toLowerCase());

    const matchesFilter =
      filter === "all" || booking.status === filter;

    return matchesQuery && matchesFilter;
  });

  const filterButtons = [
    { value: "all", label: "الكل" },
    { value: "confirmed", label: "مؤكد" },
    { value: "pending", label: "قيد الانتظار" },
    { value: "cancelled", label: "ملغي" },
    { value: "completed", label: "مكتمل" },
  ];

  return (
    <div>
      <PageHeader
        title="الحجوزات"
        subtitle="إدارة حجوزات الركاب ومتابعة المدفوعات"
        action={
          <div className="flex gap-2">
            <button className="btn-ghost border border-gray-100 dark:border-navy-400/30">
              <Download className="w-4 h-4" />
              تصدير
            </button>

            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              حجز جديد
            </button>
          </div>
        }
      />

      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث برقم الحجز، العميل، أو الخط..."
              className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === btn.value
                  ? "bg-teal-400 text-white"
                  : "bg-gray-50 dark:bg-navy-700/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-400/20"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {isLoading ? (
          <p className="text-center py-12 text-gray-400">
            جاري تحميل الحجوزات...
          </p>
        ) : isError ? (
          <p className="text-center py-12 text-red-500">
            تعذر تحميل الحجوزات: {error?.message}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">رقم الحجز</th>
                  <th className="py-3 px-4 font-medium">العميل</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">الخط</th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">المقاعد</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">التاريخ</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">المبلغ</th>
                  <th className="py-3 px-4 font-medium hidden xl:table-cell">الدفع</th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((booking, index) => (
                  <tr
                    key={booking.id ?? index}
                    className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10"
                  >
                    <td className="py-3 px-4 font-medium text-navy-500 dark:text-white">
                      {booking.id ?? "—"}
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {getName(booking.customer ?? booking.user)}
                      </p>
                      <p className="text-xs text-gray-400" dir="ltr">
                        {booking.phone ?? booking.customer?.phone ?? "—"}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      {booking.route ?? booking.trip?.route ?? "—"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                      {booking.seats ?? booking.seatNumber ?? "—"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                      {booking.date ?? booking.createdAt ?? "—"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                      {booking.amount ?? booking.totalPrice ?? "—"} ل.س
                    </td>

                    <td className="py-3 px-4 hidden xl:table-cell">
                      <StatusBadge status={booking.payment} labels={paymentLabels} />
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={booking.status} labels={bookingStatusLabels} />
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8">
                      <p className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
                        لا توجد حجوزات مطابقة للبحث
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
