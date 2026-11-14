import TransportCompanyCard from './TransportCompanyCard';

export default function TransportCompaniesGrid({ companies, loading, error, onRetry, onSelectCompany }) {
    if (loading) {
        return (
        <div className="container mx-auto px-4 py-8">
            {/* أضفنا items-stretch لضمان تساوي الارتفاعات */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-[var(--surface)] border border-[var(--border)] rounded-[24px] p-6 h-[420px] animate-pulse flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
                    <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                </div>
                <div className="space-y-3">
                    <div className="w-32 h-6 bg-slate-200 rounded-lg"></div>
                    <div className="w-full h-4 bg-slate-200 rounded-lg"></div>
                </div>
                <div className="flex gap-2">
                    <div className="w-16 h-8 bg-slate-200 rounded-xl"></div>
                    <div className="w-16 h-8 bg-slate-200 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-14 bg-slate-200 rounded-2xl"></div>
                    <div className="h-14 bg-slate-200 rounded-2xl"></div>
                </div>
                <div className="w-full h-12 bg-slate-200 rounded-2xl"></div>
                </div>
            ))}
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-[#008a98] text-white rounded-xl font-bold text-xs hover:bg-[#006f7b] transition-colors"
            >
            إعادة المحاولة
            </button>
        </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        {/* أضفنا items-stretch هنا أيضاً */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {companies.map((company) => (
            <TransportCompanyCard
                key={company.id}
                company={company}
                onSelectCompany={onSelectCompany}
            />
            ))}
        </div>
        
        {/* ملاحظة أسفل الصفحة مطابقة للمرجع */}
        <div className="text-center mt-12 text-[#94a3b8] text-[11px] font-medium">
            ملاحظة: أسماء الشركات وتقييماتها وأوقات الرحلات المعروضة بيانات توضيحية ضمن مشروع التدريب.
        </div>
        </div>
    );
}