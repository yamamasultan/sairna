
import { useState, useEffect, useCallback } from 'react';
import { bookingsService, DEMO_BOOKING } from '../services/bookingsService';

export function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
        const token =
            localStorage.getItem('token') ||
            localStorage.getItem('access_token');

        const result = await bookingsService.getMyBookings(token);

        setBookings(
            result.bookings.length > 0
            ? result.bookings
            : [DEMO_BOOKING]
        );

        setIsDemoMode(
            result.isDemoMode || result.bookings.length === 0
        );

        } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل الحجوزات');

        setBookings([DEMO_BOOKING]);
        setIsDemoMode(true);

        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return {
        bookings,
        isDemoMode,
        loading,
        error,
        refetch: fetchBookings,
    };
}
