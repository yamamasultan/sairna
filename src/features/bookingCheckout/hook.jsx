
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTripById,
  getTripSeats,
  createBooking,
} from "./api";

// جلب تفاصيل الرحلة
export const useTripDetails = (tripId) => {
  return useQuery({
    queryKey: ["tripDetails", tripId],
    queryFn: () => getTripById(tripId),
    enabled: !!tripId,
  });
};

// جلب المقاعد
export const useTripSeats = (tripId) => {
  return useQuery({
    queryKey: ["tripSeats", tripId],
    queryFn: () => getTripSeats(tripId),
    enabled: !!tripId,
  });
};

// إنشاء الحجز
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tripSeats"],
      });
    },
  });
};
