
import TripCard from "./tripCard";

export default function TripList({
  trips,
  loading,
  error,
  onChooseSeats,
}) {
  if (loading) {
    return (
      <div className="rounded-[22px] bg-white p-10 text-center text-[#718493]">
        جارٍ تحميل الرحلات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[22px] border border-red-200 bg-white p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div className="rounded-[22px] border border-[#e4ecef] bg-white p-10 text-center">
        <p className="text-lg font-bold text-[#112F41]">
          لا توجد رحلات مطابقة
        </p>
        <p className="mt-2 text-sm text-[#718493]">
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
