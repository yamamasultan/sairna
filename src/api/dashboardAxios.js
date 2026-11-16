
import axios from "axios";

const dashboardAxios = axios.create({
  baseURL: "https://sairna.abdulrahman-hares.com/api/v1/dashboard",
  headers: {
    "Content-Type": "application/json",
  },
});

dashboardAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("sairna_admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default dashboardAxios;
