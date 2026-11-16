
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/header/header";

import TripBooking from "./features/tripBooking/tripBooking";
import BookingCheckout from "./features/bookingCheckout/BookingCheckout";

import AdminLogin from "./features/dashboard/pages/AdminLogin";

import { useAuth } from "./features/dashboard/auth/useAuth";
import { Layout } from "./features/dashboard/components/layout";

import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { TripsPage } from "./features/dashboard/pages/tripsPage";
import { DriversPage } from "./features/dashboard/pages/driversPage";
import { VehiclesPage } from "./features/dashboard/pages/vehiclesPage";
import  {BookingsPage } from "./features/dashboard/pages/bookingPage";
import { CustomersPage } from "./features/dashboard/pages/customersPage";
import { ReportsPage } from "./features/dashboard/pages/reportsPage";
import { SettingsPage } from "./features/dashboard/pages/settingsPage";

function ProtectedDashboard() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        جاري تحميل لوحة التحكم...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<TripBooking />} />

        <Route
          path="/seat-selection/:tripId"
          element={<BookingCheckout />}
        />

        <Route path="/login" element={<AdminLogin />} />

        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route index element={<DashboardPage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
