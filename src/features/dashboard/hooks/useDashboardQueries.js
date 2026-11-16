
import { useQuery } from "@tanstack/react-query";
import dashboardAxios from "../../../api/dashboardAxios";

const getData = async (url) => {
  const response = await dashboardAxios.get(url);
  return response.data;
};

export const useOverview = () =>
  useQuery({
    queryKey: ["overview"],
    queryFn: () => getData("/overview"),
  });

export const useTrips = () =>
  useQuery({
    queryKey: ["trips"],
    queryFn: () => getData("/trips"),
  });

export const useBookings = () =>
  useQuery({
    queryKey: ["bookings"],
    queryFn: () => getData("/bookings"),
  });

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => getData("/users"),
  });

export const useCompanies = () =>
  useQuery({
    queryKey: ["companies"],
    queryFn: () => getData("/companies"),
  });

export const useCities = () =>
  useQuery({
    queryKey: ["cities"],
    queryFn: () => getData("/cities"),
  });
