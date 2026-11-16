
import { Download,  } from "lucide-react";

import { Card, PageHeader } from "../components/ui";
import {
  useOverview,
  useTrips,
} from "../hooks/useDashboardQueries";

const getList = (response, key) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data?.[key])) return response.data[key];
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export function ReportsPage() {
  const overviewQuery = useOverview();
  const tripsQuery = useTrips();

  const overview =
    overviewQuery.data?.data ?? overviewQuery.data ?? {};

  const trips = getList(tripsQuery.data, "trips");

  const weeklyRevenue = Array.isArray(overview.weeklyRevenue)
    ? overview.weeklyRevenue
    : [];

  const routePerformance = Array.isArray(overview.routePerformance)
    ? overview.routePerformance
    : [];

  const driverPerformance = Array.isArray(overview.driverPerformance)
    ? [...overview.driverPerformance]
        .sort((a, b) => (b.trips ?? 0) - (a.trips ?? 0))
        .slice(0, 5)
    : [];

  const completedTrips = trips.filter(
    (trip) => trip.status === "completed"
  ).length;

  const totalRevenue = weeklyRevenue.reduce(
    (sum, day) => sum + Number(day.value ?? 0),
    0
  );

  const activeDrivers =
    overview.activeDrivers ?? overview.stats?.activeDrivers;

  const totalDrivers =
    overview.totalDrivers ?? overview.stats?.totalDrivers;

  const activeVehicles =
    overview.activeVehicles ?? overview.stats?.activeVehicles;

  const maxRouteRevenue = Math.max(
    1,
    ...routePerformance.map((route) => Number(route.revenue ?? 0))
  );

  const maxWeeklyRevenue = Math.max(
    1,
    ...weeklyRevenue.map((day) => Number(day.value ?? 0))
  );

  const isLoading = overviewQuery.isLoading || tripsQuery.isLoading;
  const isError = overviewQuery.isError || tripsQuery.isError;

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="التقارير"
          subtitle="تحليلات الأداء والمؤشرات الرئيسية"
        />
        <Card className="p-8 text-center text-gray-400">
          جاري تحميل التقارير...
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <PageHeader
          title="التقارير"
          subtitle="تحليلات الأداء والمؤشرات الرئيسية"
        />
        <Card className="p-8 text-center text-red-500">
          تعذر تحميل بيانات التقارير.
          <p className="text-sm mt-2">
            {overviewQuery.error?.message ?? tripsQuery.error?.message}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="التقارير"
        subtitle="تحليلات الأداء والمؤشرات الرئيسية"
        action={
          <button className="btn-ghost border border-gray-100 dark:border-navy-400/30">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            إجمالي الإيرادات (أسبوع)
          </p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">
            {totalRevenue.toLocaleString("ar-SY")} ل.س
          </p>
          <p className="text-xs text-gray-400 mt-1">
            حسب بيانات الإيرادات المتاحة
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            رحلات مكتملة
          </p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">
            {completedTrips}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            من الرحلات المسترجعة
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            سائقون نشطون
          </p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">
            {activeDrivers ?? "—"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {totalDrivers != null
              ? `من أصل ${totalDrivers}`
              : "لا تتوفر بيانات العدد الكلي"}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            مركبات نشطة
          </p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">
            {activeVehicles ?? "—"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            حسب بيانات لوحة التحكم
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Route performance */}
        <Card className="p-5">
          <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">
            أداء الخطوط
          </h2>

          {routePerformance.length > 0 ? (
            <div className="space-y-4">
              {routePerformance.map((route, index) => (
                <div key={route.id ?? route.route ?? index}>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {route.route ?? route.name ?? "—"}
                    </span>
                    <span className="text-sm font-medium text-navy-500 dark:text-white">
                      {Number(route.revenue ?? 0).toLocaleString("ar-SY")} ل.س
                    </span>
                  </div>

                  <div className="h-2 bg-gray-100 dark:bg-navy-400/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (Number(route.revenue ?? 0) / maxRouteRevenue) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-1 text-xs text-gray-400 dark:text-gray-500">
                    <span>{route.trips ?? 0} رحلة</span>
                    <span>
                      {route.utilization != null
                        ? `نسبة الإشغال: ${route.utilization}٪`
                        : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-sm text-gray-400">
              لا تتوفر بيانات أداء الخطوط حالياً
            </p>
          )}
        </Card>

        {/* Driver performance */}
        <Card className="p-5">
          <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">
            أفضل السائقين
          </h2>

          {driverPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30">
                    <th className="pb-2 font-medium">السائق</th>
                    <th className="pb-2 font-medium">الرحلات</th>
                    <th className="pb-2 font-medium">التقييم</th>
                  </tr>
                </thead>

                <tbody>
                  {driverPerformance.map((driver, index) => (
                    <tr key={driver.id ?? index} className="table-row-base">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index < 3
                                ? "bg-teal-400 text-white"
                                : "bg-gray-100 dark:bg-navy-400/20 text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {index + 1}
                          </span>

                          <span className="text-gray-600 dark:text-gray-300">
                            {driver.name ?? "—"}
                          </span>
                        </div>
                      </td>

                      <td className="py-2.5 text-gray-600 dark:text-gray-300">
                        {driver.trips ?? "—"}
                      </td>

                      <td className="py-2.5 text-gray-600 dark:text-gray-300">
                        {driver.rating ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-12 text-sm text-gray-400">
              لا تتوفر بيانات أداء السائقين حالياً
            </p>
          )}
        </Card>
      </div>

      {/* Weekly revenue chart */}
      <Card className="p-5">
        <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">
          الإيرادات الأسبوعية
        </h2>

        {weeklyRevenue.length > 0 ? (
          <div className="flex items-end justify-between gap-2 sm:gap-4 h-44">
            {weeklyRevenue.map((item, index) => (
              <div
                key={item.day ?? index}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full flex flex-col justify-end h-32">
                  <div
                    className="w-full bg-teal-400/80 dark:bg-teal-400/60 rounded-t-md hover:bg-teal-400 transition-colors"
                    style={{
                      height: `${(Number(item.value ?? 0) / maxWeeklyRevenue) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.day ?? "—"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-12 text-sm text-gray-400">
            لا تتوفر بيانات الإيرادات الأسبوعية حالياً
          </p>
        )}
      </Card>
    </div>
  );
}
