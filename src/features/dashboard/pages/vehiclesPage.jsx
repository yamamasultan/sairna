
import { Plus, Search, Gauge } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, PageHeader, StatusBadge } from "../components/ui";

// رح نربط البيانات بالـ API بعد ما نحدد endpoint المركبات
const vehicles = [];

const vehicleStatusLabels = {
  active: {
    text: "نشطة",
    className:
      "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300",
  },
  maintenance: {
    text: "في الصيانة",
    className:
      "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300",
  },
  idle: {
    text: "متوقفة",
    className:
      "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400",
  },
};

export function VehiclesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return vehicles;

    return vehicles.filter((vehicle) => {
      const plate = String(vehicle.plate ?? "").toLowerCase();
      const model = String(vehicle.model ?? "").toLowerCase();
      const id = String(vehicle.id ?? "").toLowerCase();

      return (
        plate.includes(search) ||
        model.includes(search) ||
        id.includes(search)
      );
    });
  }, [query]);

  const activeCount = vehicles.filter(
    (vehicle) => vehicle.status === "active"
  ).length;

  const maintenanceCount = vehicles.filter(
    (vehicle) => vehicle.status === "maintenance"
  ).length;

  const idleCount = vehicles.filter(
    (vehicle) => vehicle.status === "idle"
  ).length;

  return (
    <div>
      <PageHeader
        title="المركبات"
        subtitle="إدارة أسطول المركبات وحالة الصيانة"
        action={
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            مركبة جديدة
          </button>
        }
      />

      {/* Vehicle statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">
            {activeCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            نشطة
          </p>
        </Card>

        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-300">
            {maintenanceCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            في الصيانة
          </p>
        </Card>

        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-500 dark:text-gray-400">
            {idleCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            متوقفة
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث باللوحة، الموديل، أو الرقم..."
            className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
          />
        </div>
      </Card>

      {/* Vehicles table */}
      <div className="overflow-x-auto">
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400 dark:text-gray-500">
              {query
                ? "لا توجد مركبات مطابقة لعملية البحث"
                : "لا توجد بيانات مركبات حالياً"}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">الرقم</th>
                  <th className="py-3 px-4 font-medium">اللوحة</th>
                  <th className="py-3 px-4 font-medium">الموديل</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">
                    السعة
                  </th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">
                    آخر صيانة
                  </th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">
                    المسافة (كم)
                  </th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10"
                  >
                    <td className="py-3 px-4 font-medium text-navy-500 dark:text-white">
                      {vehicle.id}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-gray-50 dark:bg-navy-700/40 border border-gray-200 dark:border-navy-400/30 rounded font-mono text-xs text-navy-500 dark:text-gray-200">
                        {vehicle.plate ?? "-"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {vehicle.model ?? "-"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      {vehicle.capacity != null
                        ? `${vehicle.capacity} راكب`
                        : "-"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                      {vehicle.lastService ?? "-"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-gray-400" />
                        {vehicle.mileage != null
                          ? Number(vehicle.mileage).toLocaleString("ar-SY")
                          : "-"}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge
                        status={vehicle.status}
                        labels={vehicleStatusLabels}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
