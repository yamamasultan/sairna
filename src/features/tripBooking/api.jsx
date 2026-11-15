import axiosInstance from '../../api/axios'; // تعديل المسار حسب مكان الملف

// جلب شركات الباصات
export const fetchBusCompanies = async () => {
  const response = await axiosInstance.get('/bus-companies'); // استبدلي المسار بالـ Endpoint الصحيح للشركات
  return response.data;
};
// جلب تفاصيل شركة واحدة
export const fetchBusCompanyById = async (id) => {
  const response = await axiosInstance.get(`/companies/${id}`);
  return response.data;
};
// جلب الرحلات
export const fetchTrips = async (params) => {
  const response = await axiosInstance.get("/trips", {
    params: {
      date: params.date,
    },
  });

  return response.data;
};