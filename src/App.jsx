
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import TripBooking from "./features/tripBooking/tripBooking";
import BookingCheckout from "./features/bookingCheckout/BookingCheckout";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <Routes>
        <Route path="/" element={<TripBooking />} />

        <Route
          path="/seat-selection/:tripId"
          element={<BookingCheckout />}
        />
      </Routes>
    </div>
  );
}

export default App;
