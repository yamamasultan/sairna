import { useQuery } from "@tanstack/react-query";
import { getCities, getTrips } from "./api";

export const useCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
        staleTime: 1000 * 60 * 60, // بيخزن المدن لمدة ساعة
    });
};

export const useTrips = (searchParams) => {
    return useQuery({
        queryKey: ["trips", searchParams],
        queryFn: () => getTrips(searchParams),
        enabled: !!searchParams, // ما بيشتغل إلا لما يمررله باراميترز
    });
};