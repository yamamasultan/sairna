
import api from "../../api/axios";

// جلب تفاصيل الرحلة
export const getTripById = async (tripId) => {
  const response = await api.get(`/trips/${tripId}`);
  return response.data?.data ?? response.data;
};

// جلب المقاعد وحالتها
export const getTripSeats = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/seats`);
  return response.data?.data ?? response.data;
};

// إنشاء الحجز بعد تسجيل الدخول
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data?.data ?? response.data;
};
