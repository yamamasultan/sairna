
import {
  Users,
  Building2,
  Route,
  Ticket,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card, PageHeader } from "../components/ui";
import { useOverview, useTrips } from "../hooks/useDashboardQueries";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  return Number(value).toLocaleString("ar-SY");
};

const tripStatusLabels = {
  COMPLETED: "مكتملة",
  "IN-PROGRESS": "قيد التنفيذ",
  SCHEDULED: "مجدولة",
  CANCELLED: "ملغاة",
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكدة",
};

const statusStyles = {
  COMPLETED:
    "bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300",
  "IN-PROGRESS":
    "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
  SCHEDULED:
    "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
  CANCELLED:
    "bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300",
  PENDING:
    "bg-gray-100 text-gray-600 dark:bg-gray-400/10 dark:text-gray-300",
  CONFIRMED:
    "bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleString("ar-SY", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const statistics = [
  { key: "customers", label: "إجمالي العملاء", icon: Users },
  { key: "companies", label: "شركات النقل", icon: Building2 },
  { key: "upcomingTrips", label: "الرحلات القادمة", icon: Route },
  { key: "totalBookings", label: "إجمالي الحجوزات", icon: Ticket },
  { key: "confirmedBookings", label: "الحجوزات المؤكدة", icon: CheckCircle },
];

export function DashboardPage() {
  const overviewQuery = useOverview();
  const tripsQuery = useTrips();

  const overview = overviewQuery.data?.data ?? overviewQuery.data ?? {};
  const tripsResponse = tripsQuery.data?.data ?? tripsQuery.data ?? {};

  const trips = Array.isArray(tripsResponse)
    ? tripsResponse
    : Array.isArray(tripsResponse.trips)
      ? tripsResponse.trips
      : [];

  const totalBookings = Number(overview.totalBookings) || 0;
  const confirmedBookings = Number(overview.confirmedBookings) || 0;

  const confirmationRate =
    totalBookings > 0
      ? Math.round((confirmedBookings / totalBookings) * 100)
      : 0;

  const isLoading = overviewQuery.isLoading || tripsQuery.isLoading;
  const overviewError = overviewQuery.isError;
  const tripsError = tripsQuery.isError;

  return (
    <div dir="rtl">
      <PageHeader
        title="لوحة التحكم"
        subtitle="نظرة عامة على أداء شركة سايرنا للنقل"
      />

      {overviewError && (
        <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-400/10 dark:text-red-300">
          تعذر تحميل الإحصائيات. تأكدي من تسجيل الدخول وصلاحية التوكن.
        </div>
      )}

      {isLoading && (
        <div className="mb-5 text-sm text-gray-500">
          جاري تحميل البيانات...
        </div>
      )}

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.key} className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-400/10">
                  <Icon className="h-5 w-5 text-teal-500" />
                </div>

                <span className="text-xs text-gray-400">
                  إحصائيات عامة
                </span>
              </div>

              <p className="mb-1 text-2xl font-bold text-navy-500 dark:text-white">
                {overviewError ? "—" : formatValue(overview[stat.key])}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Booking Confirmation */}
      <Card className="mb-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-500 dark:text-white">
              الحجوزات المؤكدة
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              نسبة الحجوزات المؤكدة من إجمالي الحجوزات
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-400/10">
            <CheckCircle className="h-5 w-5 text-teal-500" />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatValue(confirmedBookings)} من {formatValue(totalBookings)}
          </span>

          <span className="text-lg font-bold text-teal-600 dark:text-teal-300">
            {overviewError ? "—" : `${confirmationRate}%`}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{
              width: `${overviewError ? 0 : confirmationRate}%`,
            }}
          />
        </div>
      </Card>

      {/* Recent Trips */}
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-500 dark:text-white">
              أحدث الرحلات
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              الرحلات المسجلة في النظام
            </p>
          </div>

          <Link
            to="/dashboard/trips"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 transition-all hover:gap-2 dark:text-teal-300"
          >
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {tripsError && (
          <p className="py-6 text-center text-sm text-red-500">
            تعذر تحميل الرحلات.
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-right text-xs text-gray-400 dark:border-gray-700">
                <th className="px-2 pb-3 font-medium">رقم الرحلة</th>
                <th className="px-2 pb-3 font-medium">شركة النقل</th>
                <th className="px-2 pb-3 font-medium">خط الرحلة</th>
                <th className="hidden px-2 pb-3 font-medium sm:table-cell">
                  موعد الانطلاق
                </th>
                <th className="hidden px-2 pb-3 font-medium md:table-cell">
                  السعر
                </th>
                <th className="hidden px-2 pb-3 font-medium lg:table-cell">
                  المقاعد
                </th>
                <th className="px-2 pb-3 font-medium">الحالة</th>
              </tr>
            </thead>

            <tbody>
              {trips.slice(0, 5).map((trip, index) => {
                const status = String(trip.status ?? "").toUpperCase();

                return (
                  <tr
                    key={trip.id ?? index}
                    className="table-row-base border-b border-gray-50 transition-colors hover:bg-gray-50 dark:border-gray-700/40 dark:hover:bg-gray-700/20"
                  >
                    <td className="px-2 py-4 font-medium text-navy-500 dark:text-white">
                      {trip.code || `#${trip.id}`}
                    </td>

                    <td className="px-2 py-4 text-gray-600 dark:text-gray-300">
                      {trip.company?.name || "—"}
                    </td>

                    <td className="px-2 py-4 text-gray-600 dark:text-gray-300">
                      <span>{trip.origin?.name || "—"}</span>
                      <span className="mx-1 text-teal-500">←</span>
                      <span>{trip.destination?.name || "—"}</span>
                    </td>

                    <td className="hidden px-2 py-4 text-gray-600 dark:text-gray-300 sm:table-cell">
                      {formatDate(trip.departureAt)}
                    </td>

                    <td className="hidden px-2 py-4 text-gray-600 dark:text-gray-300 md:table-cell">
                      {formatValue(trip.price)}
                    </td>

                    <td className="hidden px-2 py-4 text-gray-600 dark:text-gray-300 lg:table-cell">
                      {formatValue(trip.totalSeats)}
                    </td>

                    <td className="px-2 py-4">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${
                          statusStyles[status] ??
                          "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {tripStatusLabels[status] ?? trip.status ?? "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {!isLoading && !tripsError && trips.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-400">
                    لا توجد رحلات متاحة حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
