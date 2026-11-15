
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BusCompaniesBar from "./components/busCompaniesBar/busCompaniesBar";
import FilterSideBar from "./components/filterSideBar/filterSideBar";
import TripList from "./components/tripList/tripList";

import useTrips from "./hook";

// تحويل التاريخ إلى وقت قابل للعرض
function formatTime(date) {
  if (!date) return "--:--";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "--:--";
  }

  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Damascus",
  });
}

// حساب مدة الرحلة بالدقائق
function calculateDuration(departure, arrival) {
  if (!departure || !arrival) return 0;

  const start = new Date(departure).getTime();
  const end = new Date(arrival).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) return 0;

  return Math.max(0, Math.round((end - start) / 60000));
}

// تحويل بيانات API إلى شكل مناسب للكارد
function normalizeTrip(raw) {
  const company = raw.company || {};
  const origin = raw.origin || {};
  const destination = raw.destination || {};

  const departure = raw.departureAt || raw.departure_time;
  const arrival = raw.arrivalAt || raw.arrival_time;

  const durationMinutes = calculateDuration(
    departure,
    arrival
  );

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return {
    id: raw.id || raw.trip_id,
    code: raw.code,

    companyId: String(raw.companyId || company.id || ""),
    companyName: company.name || "شركة النقل",
    companyLogo: company.logoUrl || "",

    rating: raw.rating || company.rating || 0,

    from: origin.name || raw.from_city || "مدينة الانطلاق",
    to: destination.name || raw.to_city || "مدينة الوصول",

    departureTime: formatTime(departure),
    arrivalTime: formatTime(arrival),

    duration: `${hours} ساعة و ${minutes} دقيقة`,
    durationMinutes,

    price: Number(raw.price || raw.ticket_price || 0),

    availableSeats:
      raw.availableSeats ?? raw.available_seats ?? 0,

    totalSeats: raw.totalSeats || 0,

    amenities: raw.amenities || [],

    status: raw.status,
    raw,
  };
}

// تحديد فترة الانطلاق
function getTimePeriod(time) {
  if (!time || !time.includes(":")) return "all";

  const hour = Number(time.split(":")[0]);

  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";

  return "evening";
}

export default function TripBooking() {
  const navigate = useNavigate();

  const [searchParams] = useState({
    from: "حلب",
    to: "دمشق",
    date: "2026-11-14",
    passengers: 1,
  });

  const [selectedCompanyId, setSelectedCompanyId] =
    useState("all");

  const [departurePeriod, setDeparturePeriod] =
    useState("all");

  const [sortBy, setSortBy] = useState("departure");

  // جلب الرحلات من API
  const {
    trips: rawTrips,
    loading,
    error,
  } = useTrips(searchParams);

  // تجهيز بيانات الرحلات
  const trips = useMemo(() => {
    return rawTrips.map(normalizeTrip);
  }, [rawTrips]);

  // استخراج شركات النقل من الرحلات
  const companies = useMemo(() => {
    const result = new Map();

    trips.forEach((trip) => {
      const current = result.get(trip.companyId);

      if (current) {
        current.count += 1;
      } else {
        result.set(trip.companyId, {
          id: trip.companyId,
          name: trip.companyName,
          count: 1,
        });
      }
    });

    return Array.from(result.values());
  }, [trips]);

  // تطبيق الفلاتر والترتيب
  const filteredTrips = useMemo(() => {
    let result = [...trips];

    if (selectedCompanyId !== "all") {
      result = result.filter(
        (trip) => trip.companyId === selectedCompanyId
      );
    }

    if (departurePeriod !== "all") {
      result = result.filter(
        (trip) =>
          getTimePeriod(trip.departureTime) === departurePeriod
      );
    }

    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "duration") {
      result.sort(
        (a, b) => a.durationMinutes - b.durationMinutes
      );
    } else {
      result.sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime)
      );
    }

    return result;
  }, [trips, selectedCompanyId, departurePeriod, sortBy]);

  // إعادة ضبط الفلاتر
  const handleReset = () => {
    setSelectedCompanyId("all");
    setDeparturePeriod("all");
    setSortBy("departure");
  };

  // الانتقال لاختيار المقاعد
  const handleChooseSeats = (trip) => {
    navigate(`/seat-selection/${trip.id}`, {
      state: { trip },
    });
  };

  return (
    <main
      className="min-h-screen bg-[var(--bg)] pb-16 text-[var(--text)] transition-colors duration-300"
      dir="rtl"
      style={{ fontFamily: "var(--font)" }}
    >
      <div className="container">

        {/* عنوان الصفحة */}
        <section className="py-8 text-right">
          <div className="mb-5 text-sm text-[var(--muted)]">
            الرئيسية <span className="mx-2">‹</span> نتائج البحث
          </div>

          <span className="inline-flex rounded-full bg-[var(--soft-teal)] px-4 py-2 text-sm font-bold text-[var(--primary)]">
            ✧ لنكمل الطريق
          </span>

          <h1 className="mt-4 text-2xl font-extrabold text-[var(--text)] sm:text-3xl md:text-4xl">
            اختر الرحلة اللي بتشبهك.
          </h1>

          <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
            قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة.
          </p>
        </section>

        {/* شركات النقل */}
        <BusCompaniesBar
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onCompanyChange={setSelectedCompanyId}
        />

        {/* النتائج والفلاتر */}
        <section className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-12 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* القائمة الجانبية */}
          <FilterSideBar
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onCompanyChange={setSelectedCompanyId}
            departurePeriod={departurePeriod}
            onDeparturePeriodChange={setDeparturePeriod}
            onReset={handleReset}
          />

          {/* الرحلات */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

              <div>
                <h2 className="text-xl font-extrabold text-[var(--text)] sm:text-2xl">
                  {filteredTrips.length} رحلات متاحة
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {searchParams.from} ← {searchParams.to}
                </p>
              </div>

              {/* الترتيب */}
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="trip-sort"
                  className="text-sm text-[var(--muted)]"
                >
                  ترتيب حسب
                </label>

                <select
                  id="trip-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-semibold text-[var(--text)] outline-none transition-colors focus:border-[var(--primary)]"
                >
                  <option value="departure">وقت الانطلاق</option>
                  <option value="price">الأقل سعر</option>
                  <option value="duration">أقصر مدة</option>
                </select>
              </div>
            </div>

            <TripList
              trips={filteredTrips}
              loading={loading}
              error={error}
              onChooseSeats={handleChooseSeats}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
