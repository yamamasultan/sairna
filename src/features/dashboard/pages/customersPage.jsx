
import { useMemo, useState } from "react";
import { Plus, Search, Mail, Phone } from "lucide-react";

import {
  Card,
  PageHeader,
  StatusBadge,
} from "../components/ui";

import { useUsers } from "../hooks/useDashboardQueries";

const customerStatusLabels = {
  active: {
    text: "نشط",
    className:
      "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300",
  },
  inactive: {
    text: "غير نشط",
    className:
      "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400",
  },
};

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.users)) return response.users;
  if (Array.isArray(response?.data?.users)) return response.data.users;
  if (Array.isArray(response?.items)) return response.items;
  return [];
};

export function CustomersPage() {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, error } = useUsers();

  const customers = useMemo(() => getList(data), [data]);

  const filtered = customers.filter((customer) => {
    const name = customer.name ?? customer.fullName ?? "";
    const phone = customer.phone ?? customer.phoneNumber ?? "";
    const email = customer.email ?? "";

    return (
      String(name).toLowerCase().includes(query.toLowerCase()) ||
      String(phone).includes(query) ||
      String(email).toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div>
      <PageHeader
        title="العملاء"
        subtitle="قائمة عملاء سايرنا وسجل رحلاتهم"
        action={
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            عميل جديد
          </button>
        }
      />

      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث بالاسم، الهاتف، أو البريد..."
            className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {isLoading ? (
          <p className="text-center py-12 text-gray-400">
            جاري تحميل العملاء...
          </p>
        ) : isError ? (
          <p className="text-center py-12 text-red-500">
            تعذر تحميل العملاء: {error?.message}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">العميل</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">
                    التواصل
                  </th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">
                    عدد الرحلات
                  </th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">
                    إجمالي الإنفاق
                  </th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">
                    آخر رحلة
                  </th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((customer, index) => {
                  const name =
                    customer.name ?? customer.fullName ?? "—";
                  const phone =
                    customer.phone ?? customer.phoneNumber ?? "—";
                  const email = customer.email ?? "—";

                  return (
                    <tr
                      key={customer.id ?? index}
                      className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0">
                            <span className="text-teal-400 font-bold text-sm">
                              {String(name).charAt(0)}
                            </span>
                          </div>

                          <div>
                            <p className="font-medium text-navy-500 dark:text-white">
                              {name}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {customer.id ?? "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span dir="ltr">{phone}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span dir="ltr">{email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                        {customer.tripsCount ?? customer.trips ?? "—"}
                      </td>

                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                        {customer.totalSpent != null
                          ? Number(customer.totalSpent).toLocaleString()
                          : "—"}{" "}
                        ل.س
                      </td>

                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                        {customer.lastTrip ?? "—"}
                      </td>

                      <td className="py-3 px-4">
                        <StatusBadge
                          status={customer.status ?? "inactive"}
                          labels={customerStatusLabels}
                        />
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      <p className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
                        لا يوجد عملاء مطابقون للبحث
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
