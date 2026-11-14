import JourneySection from './components/journey/JourneySection';
import JourneyCTA from './components/journey/JourneyCTA';

function App() {
  // دالة الانتقال لصفحة البحث الموجودة فعلياً في مشروعك
    const handleNavigateToSearch = () => {
        // استبدلي هذا المسار بالـ Route أو دالة التنقل الحالية في مشروعك (مثل navigate('/search'))
        window.location.href = '/search'; 
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-[var(--font)] transition-colors duration-300">
        {/* الهيدر أو المكونات الأخرى الموجودة لديك */}
        
        {/* القسم الأول: تتبع الرحلة */}
        <JourneySection />

        {/* القسم الثاني: CTA الرحلات */}
        <JourneyCTA onNavigateSearch={handleNavigateToSearch} />

        {/* الفوتر أو بقية الأقسام */}
        </div>
    );
}

export default App;