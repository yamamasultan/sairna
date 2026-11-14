import { useState, useEffect } from 'react';
import { transportCompaniesService } from '../services/transportCompanies.service';

export function useTransportCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
        try {
            setLoading(true);
            const data = await transportCompaniesService.getTransportCompanies();
            if (isMounted) {
            setCompanies(Array.isArray(data) ? data : []);
            setError(null);
            }
        } catch (err) {
            if (isMounted) {
            setError(err.message || 'حدث خطأ أثناء الاتصال بالخادم');
            }
        } finally {
            if (isMounted) {
            setLoading(false);
            }
        }
        }

        loadData();

        return () => {
        isMounted = false;
        };
    }, []);

    return { companies, loading, error };
}