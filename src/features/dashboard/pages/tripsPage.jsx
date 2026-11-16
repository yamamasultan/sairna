
import { Plus, Search, Filter, Download } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, PageHeader, StatusBadge } from "../components/ui";
import { useTrips } from "../hooks/useDashboardQueries";

const tripStatusLabels = {
  completed: {
    text: "مكتملة",
    style: {
      background: "color-mix(in srgb, #16a34a 12%, var(--surface))",
      color: "#16a34a",
    },
  },
  "in-progress": {
    text: "قيد التنفيذ",
    style: {
      background: "color-mix(in srgb, #3b82f6 12%, var(--surface))",
      color: "#3b82f6",
    },
  },
  scheduled: {
    text: "مجدولة",
    style: {
      background: "color-mix(in srgb, #d97706 12%, var(--surface))",
      color: "#d97706",
    },
  },
  cancelled: {
    text: "ملغاة",
    style: {
      background: "color-mix(in srgb, #dc2626 12%, var(--surface))",
      color: "#dc2626",
    },
  },
};

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.trips)) return response.trips;
  if (Array.isArray(response?.data?.trips)) return response.data.trips;
  if (Array.isArray(response?.items)) return response.items;
  return [];
};

const getName = (value) => {
  if (!value) return "—";
  if (typeof value === "string" || typeof value === "number") return value;
  return value.name ?? value.fullName ?? value.title ?? "—";
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  return value;
};

const secondaryButtonStyle = {
  background: "var(--surface)",
  color: "var(--text)",
  border: "1px solid var(--border)",
};

export function TripsPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, error } = useTrips();

  const trips = useMemo(() => getList(data), [data]);

  const filtered = trips.filter((trip) => {
    const searchText = query.trim().toLowerCase();

    return (
      String(trip.id ?? "").toLowerCase().includes(searchText) ||
      String(trip.route ?? trip.name ?? "").toLowerCase().includes(searchText) ||
      String(getName(trip.driver)).toLowerCase().includes(searchText)
    );
  });

  return (
    <div style={{ color: "var(--text)" }}>
      <PageHeader
        title="الرحلات"
        subtitle="إدارة ومتابعة جميع رحلات الأسطول"
        action={
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            رحلة جديدة
          </button>
        }
      />

      {/* Search and filters */}
      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--muted)" }}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث برقم الرحلة، الخط، أو السائق..."
              className="w-full rounded-lg pr-10 pl-4 py-2 text-sm outline-none transition-colors"
              style={{
                background: "var(--surface-alt)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            />
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
            style={secondaryButtonStyle}
          >
            <Filter className="w-4 h-4" />
            تصفية
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
            style={secondaryButtonStyle}
          >
            <Download className="w-4 h-4" />
            تصدير
          </button>
        </div>
      </Card>

      {/* Trips table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div
            className="p-8 text-center text-sm"
            style={{ color: "var(--muted)" }}
          >
            جاري تحميل الرحلات...
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-sm text-red-500">
            تعذر تحميل الرحلات: {error?.message}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="p-8 text-center text-sm"
            style={{ color: "var(--muted)" }}
          >
            لا توجد رحلات مطابقة لعملية البحث
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="text-right text-xs border-b"
                  style={{
                    background: "var(--surface-alt)",
                    color: "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  <th className="py-3 px-4 font-medium">رقم الرحلة</th>
                  <th className="py-3 px-4 font-medium">الخط</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">
                    السائق
                  </th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">
                    المركبة
                  </th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">
                    الركاب
                  </th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">
                    التاريخ
                  </th>
                  <th className="py-3 px-4 font-medium hidden xl:table-cell">
                    الإيراد
                  </th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((trip, index) => (
                  <tr
                    key={trip.id ?? index}
                    className="border-b transition-colors hover:bg-[var(--surface-alt)]"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="py-3 px-4 font-medium">
                      {formatValue(trip.id)}
                    </td>

                    <td className="py-3 px-4">
                      {formatValue(trip.route ?? trip.name)}
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell">
                      {getName(trip.driver)}
                    </td>

                    <td className="py-3 px-4 hidden md:table-cell">
                      {getName(trip.vehicle)}
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell">
                      {formatValue(trip.passengers ?? trip.passengerCount)}
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell">
                      {formatValue(trip.date ?? trip.departureDate)}
                    </td>

                    <td className="py-3 px-4 hidden xl:table-cell">
                      {trip.revenue != null
                        ? `${Number(trip.revenue).toLocaleString("ar-SY")} ل.س`
                        : "—"}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge
                        status={trip.status}
                        labels={tripStatusLabels}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
