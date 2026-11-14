const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

// بيانات توضيحية مطابقة للتصميم في حال عدم وجود حجوزات فعلية أو للمعاينة
export const DEMO_BOOKING = {
    id: 'demo-1',
    bookingCode: 'SR-24081',
    isDemo: true,
    originCity: 'حلب',
    destinationCity: 'دمشق',
    departureDate: 'الأحد، ١٥ تشرين الثاني ٢٠٢٦',
    departureTime: '07:30',
    arrivalTime: '13:10',
    companyName: 'الشام للنقل',
    companyInitial: 'ش',
    seatNumber: '12',
    price: 135000,
    currency: 'ل.س',
    };

    /**
     * توحيد شكل البيانات القادمة من الباك إند (Data Mapper)
     */
    const normalizeBooking = (item) => {
    const companyName = item.company?.name || item.trip?.company?.name || item.company_name || 'شركة نقل';
    return {
        id: item.id,
        bookingCode: item.booking_code || item.code || `SR-${item.id}`,
        isDemo: Boolean(item.is_demo),
        originCity: item.origin?.name || item.trip?.from_city?.name || item.from_city || 'غير محدد',
        destinationCity: item.destination?.name || item.trip?.to_city?.name || item.to_city || 'غير محدد',
        departureDate: item.departure_date || item.trip?.date_formatted || item.date || '',
        departureTime: (item.departure_time || item.trip?.departure_time || '00:00').slice(0, 5),
        arrivalTime: (item.arrival_time || item.trip?.arrival_time || '00:00').slice(0, 5),
        companyName,
        companyInitial: companyName.trim().charAt(0),
        seatNumber: String(item.seat_number || item.seat || '-'),
        price: Number(item.total_price || item.price || 0),
        currency: item.currency || 'ل.س',
    };
    };

    export const bookingsService = {
    /**
     * جلب حجوزات المستخدم المسجل
     */
    async getMyBookings(token) {
        if (!token) {
        return { bookings: [DEMO_BOOKING], isDemoMode: true };
        }

        const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            'Authorization': `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error(`فشل جلب الحجوزات (${response.status})`);
        }

        const payload = await response.json();
        const rawList = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.data?.bookings)
        ? payload.data.bookings
        : [];

        if (rawList.length === 0) {
        return { bookings: [DEMO_BOOKING], isDemoMode: true };
        }

        return {
        bookings: rawList.map(normalizeBooking),
        isDemoMode: false,
        };
    },
};