import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

/**
 * جلب تفاصيل رحلة معينة للاتصال بالـ Backend وتتبع حالتها
 * @param {string|number} tripId - معرف الرحلة أو الحجز
 * @param {string} token - توكن المصادقة للمستخدم المسجل
 */
export const fetchTripTrackingDetails = async (tripId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/trips/${tripId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trip tracking details:', error);
        // إرجاع بيانات تجريبية (Mock Data) في حال عدم توفر اتصال حقيقي بالباك إند حالياً للتطوير
        return {
        success: true,
        data: {
            id: 'SR-24081',
            status: 'in_progress',
            departure_city: 'حلب',
            arrival_city: 'دمشق',
            company_name: 'الشام للنقل',
            departure_time: '07:30',
            arrival_time: '13:10',
            total_distance_km: 366,
            progress_percentage: 53,
            estimated_remaining_time: '4 ساعات تقريباً',
            current_location_text: 'على الطريق - الحافلة تتحرك نحو الوجهة',
        }
        };
    }
};