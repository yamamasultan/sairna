import { useTransportCompanies } from './hooks/useTransportCompanies';
import TransportCompaniesHero from './components/transport-companies/TransportCompaniesHero';
import TransportCompaniesGrid from './components/transport-companies/TransportCompaniesGrid';

export default function TransportCompanies() {
    const { companies, loading, error, refetch } = useTransportCompanies();

    const handleSelectCompany = (companyId) => {
        if (companyId) {
        window.location.href = `/trips?company_id=${companyId}`;
        } else {
        window.location.href = '/trips';
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-[var(--font)] transition-colors duration-300 pb-16">
        <TransportCompaniesHero />
        <TransportCompaniesGrid
            companies={companies}
            loading={loading}
            error={error}
            onRetry={refetch}
            onSelectCompany={handleSelectCompany}
        />
        </div>
    );
}