import { Routes, Route } from 'react-router-dom';
import HomePage from './features/homepage/HomePage';
import TripsSearchPage from './features/tripBooking/tripBooking';
import TransportCompanies from './features/companies/TransportCompanies';
import BookingsPage from './features/bookings/BookingsPage';
import TripTrackingPage from './features/trip-tracking/TripTrackingPage';
import TripBooking from './features/tripBooking/tripBooking'; 
import Login from './features/login/login';
import Register from './features/register/register';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] font-[var(--font)] text-[var(--text)] transition-colors duration-300">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripsSearchPage />} />
        <Route path="/booking" element={<TripBooking />} />
        <Route path="/booking/:tripId" element={<TripBooking />} />
        <Route path="/transport-companies" element={<TransportCompanies />} />
        <Route path="/my-bookings" element={<BookingsPage />} />
        
        {/* مسارات تتبع الرحلة */}
        <Route path="/tracking" element={<TripTrackingPage />} />
        <Route path="/tracking/:tripId" element={<TripTrackingPage />} />
        <Route path="/bookings/:tripId/track" element={<TripTrackingPage />} />
        
        {/* مسارات المصادقة */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;