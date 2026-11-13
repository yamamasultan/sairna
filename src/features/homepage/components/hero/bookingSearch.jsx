import { useState } from "react";
import { useCities, useTrips } from "../../hooks"; // استدعاء الهوكس
import BookingField from "./bookingField";

export default function BookingSearch() {
    const [fromCity, setFromCity] = useState(null);
    const [toCity, setToCity] = useState(null);
    const [date, setDate] = useState("2026-11-13");
    const [passengers, setPassengers] = useState(1);
    const [isPassengerOpen, setIsPassengerOpen] = useState(false);
    const [searchParams, setSearchParams] = useState(null);

    // 1. جلب المدن
    const { data: citiesData, isLoading } = useCities();

    // تعيين المدن الافتراضية أول ما توصل
    if (citiesData && citiesData.length > 1 && !fromCity && !toCity) {
        const aleppo = citiesData.find(c => c.name.includes("حلب")) || citiesData[1];
        const damascus = citiesData.find(c => c.name.includes("دمشق")) || citiesData[0];
        setFromCity(aleppo);
        setToCity(damascus);
    }

    // 2. البحث عن الرحلات
    useTrips(searchParams); // بنستدعي الهوك بس عشان يشتغل بالخلفية

    const swapCities = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    };

    const handleSearch = () => {
        if (!fromCity || !toCity) return;
        setSearchParams({ originId: fromCity.id, destinationId: toCity.id, date: date });
    };

    const getCityName = (cityObj) => cityObj ? cityObj.name : "اختر مدينة";
    const cityNames = citiesData ? citiesData.map(c => c.name) : [];

    if (isLoading) return <div className="p-6 text-center text-[var(--text)]">جاري التحميل...</div>;

    return (
        <div className="w-full rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm relative z-10">
            {/* الهيدر */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]"></span>
                    <h2 className="text-lg font-bold text-[var(--text)]">وين رحلتك الجاية؟</h2>
                    <span className="text-xs text-[var(--muted)] hidden sm:block">اختار وجهتك وباقي التفاصيل علينا</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)]">
                    <span>الحجز بـ 3 خطوات</span>
                    <span>✦</span>
                </div>
            </div>

            {/* الحقول */}
            <div className="flex flex-col lg:flex-row items-end gap-3 relative z-20">
                
                <BookingField
                    label="من وين؟"
                    value={getCityName(fromCity)}
                    options={cityNames}
                    onChange={(selectedName) => {
                        const selectedCity = citiesData.find(c => c.name === selectedName);
                        setFromCity(selectedCity);
                    }}
                />

                <button
                    type="button"
                    onClick={swapCities}
                    className="mb-1 flex h-11 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--soft-teal)] text-lg font-bold text-[var(--primary)] transition duration-300 hover:rotate-180"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </button>

                <BookingField
                    label="لوين؟"
                    value={getCityName(toCity)}
                    options={cityNames}
                    onChange={(selectedName) => {
                        const selectedCity = citiesData.find(c => c.name === selectedName);
                        setToCity(selectedCity);
                    }}
                />

                {/* التاريخ */}
                <div className="w-full lg:w-48 shrink-0">
                    <label className="mb-2 block text-xs font-bold text-[var(--muted)] text-right">تاريخ الرحلة</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-4 pr-10 py-3 text-sm font-bold text-[var(--text)] outline-none transition hover:border-gray-300 focus:border-[var(--primary)] text-left"
                            dir="ltr"
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--primary)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>

                {/* المسافرين */}
                <div className="relative w-full lg:w-40 shrink-0 z-30">
                    <label className="mb-2 block text-xs font-bold text-[var(--muted)] text-right">المسافرين</label>
                    <button
                        type="button"
                        onClick={() => setIsPassengerOpen(!isPassengerOpen)}
                        className={`flex w-full items-center justify-between rounded-2xl border bg-[var(--surface)] px-4 py-3 transition outline-none ${
                            isPassengerOpen ? "border-[var(--primary)]" : "border-[var(--border)] hover:border-gray-300"
                        }`}
                    >
                        <span className="flex items-center gap-2 text-sm font-bold text-[var(--text)]">
                            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            {passengers} مسافر
                        </span>
                    </button>

                    {isPassengerOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsPassengerOpen(false)}></div>
                            {/* ضفنا z-50 هون كمان */}
                            <div className="absolute top-full right-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
                                {[1, 2, 3, 4].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => {
                                            setPassengers(num);
                                            setIsPassengerOpen(false);
                                        }}
                                        className={`block w-full px-4 py-3 text-right text-sm font-bold transition hover:bg-[var(--bg)] ${
                                            passengers === num ? "bg-[var(--soft-teal)] text-[var(--primary)]" : "text-[var(--text)]"
                                        }`}
                                    >
                                        {num} مسافر
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* زر البحث */}
                <div className="w-full lg:w-auto mt-2 lg:mt-0 flex-1">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-8 py-3.5 font-bold text-white shadow-sm transition hover:bg-[var(--primary-deep)]"
                    >
                        <span>ابحث عن رحلات</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}