
import TripCard from "./tripCard";

export default function TripList({
  trips,
  loading,
  error,
  onChooseSeats,
}) {
  if (loading) {
    return (
      <div
        className="
          rounded-[var(--radius)]
          border border-[var(--border)]
          bg-[var(--surface)]
          p-10 text-center text-[var(--muted)]
          transition-colors duration-300
        "
      >
        جارٍ تحميل الرحلات...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-[var(--radius)]
          border border-red-300
          bg-[var(--surface)]
          p-6 text-center text-red-600
        "
      >
        {error}
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div
        className="
          rounded-[var(--radius)]
          border border-[var(--border)]
          bg-[var(--surface)]
          p-10 text-center
          transition-colors duration-300
        "
      >
        <p className="text-lg font-bold text-[var(--text)]">
          لا توجد رحلات مطابقة
        </p>

        <p className="mt-2 text-sm text-[var(--muted)]">
          جربي تغيير خيارات البحث أو الفلاتر.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onChooseSeats={onChooseSeats}
        />
      ))}
    </div>
  );
}
