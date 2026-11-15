
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

import HomePage from './features/homepage/HomePage';
import TripsSearchPage from './features/tripBooking/tripBooking';
import TransportCompanies from './features/companies/TransportCompanies';
import BookingsPage from './features/bookings/BookingsPage';
import TripTrackingPage from './features/trip-tracking/TripTrackingPage';
import TripBooking from './features/tripBooking/tripBooking';
import Login from './features/login/login';
import Register from './features/register/register';
import ProfilePage from './features/profile/profile';

import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState(null);

  // استقبال إشعارات التنقل
  useEffect(() => {
    const message = location.state?.toastMessage;

    if (message) {

      // حذف الإشعار من حالة التنقل لمنع تكراره
      navigate(location.pathname, {
        replace: true,
        state: {}
      });
    }
  }, [location, navigate]);

  // إخفاء الإشعار تلقائياً
  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4500);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="min-h-screen bg-[var(--bg)] font-[var(--font)] text-[var(--text)] transition-colors duration-300 relative">

      <Header />

      {/* إشعار التنقل */}
      {toastMessage && (
        <div
          dir="rtl"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3.5 rounded-[18px] bg-[#0a2c3e] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-300"
        >
          <span className="text-[#58d7bb] flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </span>

          <span>{toastMessage}</span>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/trips" element={<TripsSearchPage />} />

        <Route path="/booking" element={<TripBooking />} />
        <Route path="/booking/:tripId" element={<TripBooking />} />

        <Route
          path="/transport-companies"
          element={<TransportCompanies />}
        />

        <Route path="/my-bookings" element={<BookingsPage />} />

        {/* تتبع الرحلات */}
        <Route path="/tracking" element={<TripTrackingPage />} />
        <Route path="/tracking/:tripId" element={<TripTrackingPage />} />
        <Route
          path="/bookings/:tripId/track"
          element={<TripTrackingPage />}
        />

        {/* تسجيل الدخول وإنشاء الحساب */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* الملف الشخصي */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
