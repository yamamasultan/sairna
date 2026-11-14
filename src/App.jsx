import { Routes, Route } from 'react-router-dom';
import HomePage from './features/homepage/HomePage';
import TransportCompanies from './features/companies/TransportCompanies';
import BookingsPage from './features/bookings/BookingsPage';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)] font-[var(--font)] min-h-screen transition-colors duration-300">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transport-companies" element={<TransportCompanies />} />
        <Route path="/my-bookings" element={<BookingsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;