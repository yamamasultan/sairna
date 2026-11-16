
import { useQuery } from "@tanstack/react-query";
import { fetchBusCompanies, fetchTrips } from "./api";

// جلب شركات النقل
export const useBusCompanies = () => {
  return useQuery({
    queryKey: ["busCompanies"],
    queryFn: fetchBusCompanies,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// جلب الرحلات
export default function useTrips(searchParams) {
  const query = useQuery({
    queryKey: ["trips", searchParams.date],
    queryFn: () => fetchTrips(searchParams),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    trips: Array.isArray(query.data)
      ? query.data
      : query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}
