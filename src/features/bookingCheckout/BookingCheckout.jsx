
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import BookingStepper from "./components/BookingStepper";
import BookingSummary from "./components/BookingSummary";
import SeatSelection from "./components/SeatSelection";
import PassengerForm from "./components/PassengerForm";
import BookingReview from "./components/BookingReview";
import { getTripSeats } from "./api";

const LOGIN_PATH = "/login";

export default function BookingCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const trip = location.state?.trip || {};
  const tripId = trip.id || params.tripId || location.state?.tripId;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [passenger, setPassenger] = useState({
    name: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("office");
  const [pageError, setPageError] = useState("");

  // جلب المقاعد من السيرفر
  const {
    data: seatData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tripSeats", tripId],
    queryFn: () => getTripSeats(tripId),
    enabled: Boolean(tripId),
    staleTime: 30 * 1000,
    retry: false,
  });

  const passengerCount = 1;

  // تجهيز بيانات الحجز لإرسالها بعد تسجيل الدخول
  const bookingDraft = useMemo(
    () => ({
      tripId: Number(tripId),
      seats: selectedSeat
        ? [
            {
              seatNumber: Number(selectedSeat),
              passengerName: passenger.name.trim(),
              passengerPhone: passenger.phone.trim(),
            },
          ]
        : [],
      paymentMethod,
    }),
    [tripId, selectedSeat, passenger, paymentMethod]
  );

  // تحديث بيانات المسافر
  const handlePassengerChange = (field, value) => {
    setPassenger((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // الانتقال من اختيار المقاعد
  const handleContinueFromSeats = () => {
    setPageError("");

    if (!selectedSeat) {
      setPageError("اختاري مقعداً واحداً للمتابعة.");
      return;
    }

    setCurrentStep(2);
  };

  // الانتقال من بيانات المسافر
  const handleContinueFromPassenger = () => {
    if (!passenger.name.trim() || !passenger.phone.trim()) {
      setPageError("يرجى إدخال اسم المسافر ورقم الموبايل.");
      return;
    }

    setPageError("");
    setCurrentStep(3);
  };

  // تأكيد الحجز والانتقال إلى تسجيل الدخول
  const handleConfirm = () => {
    if (
      !tripId ||
      !selectedSeat ||
      !passenger.name.trim() ||
      !passenger.phone.trim()
    ) {
      setPageError("تأكدي من اختيار المقعد وإدخال بيانات المسافر.");
      setCurrentStep(!selectedSeat ? 1 : 2);
      return;
    }

    navigate(LOGIN_PATH, {
      state: {
        bookingDraft,
        returnTo: `/seat-selection/${tripId}`,
        bookingFlow: true,
      },
    });
  };

  // في حال عدم وجود رقم الرحلة
  if (!tripId) {
    return (
      <main
        className="min-h-screen bg-[var(--bg)] px-4 py-8 text-[var(--text)] sm:py-12 md:px-[34px]"
        dir="rtl"
        style={{ fontFamily: "var(--font)" }}
      >
        <div className="mx-auto w-full max-w-[var(--container)]">
          <div
            className="mb-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-7 text-red-600 sm:p-5"
            role="alert"
          >
            لم يتم العثور على رقم الرحلة. ارجعي إلى صفحة الرحلات واضغطي
            «اختيار المقاعد» من بطاقة الرحلة.
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] sm:w-auto"
          >
            رجوع للرحلات
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[var(--bg)] px-4 py-7 text-[var(--text)] sm:py-10 md:px-[34px] lg:py-12"
      dir="rtl"
      style={{ fontFamily: "var(--font)" }}
    >
      <div className="mx-auto w-full max-w-[var(--container)]">

        {/* عنوان الصفحة */}
        <header className="mb-7 flex flex-col justify-between gap-5 sm:mb-8 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--soft-teal)] px-4 py-2 text-xs font-semibold text-[var(--primary-deep)]">
              ✧ باقي شوي وتوصل
            </span>

            <h1 className="mt-4 text-2xl font-extrabold text-[var(--text)] sm:text-3xl">
              كمّل حجز{" "}
              <span className="text-[var(--primary)]">
                رحلتك.
              </span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              خطوات بسيطة وبتكون رحلتك جاهزة.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] sm:w-auto"
          >
            ← تغيير الرحلة
          </button>
        </header>

        {/* مراحل الحجز */}
        <div className="mb-6 sm:mb-8">
          <BookingStepper currentStep={currentStep} />
        </div>

        {/* محتوى الحجز */}
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">

          {/* محتوى الخطوات */}
          <div className="min-w-0">

            {currentStep === 1 && (
              <>
                <SeatSelection
                  seatData={seatData}
                  loading={isLoading}
                  error={isError}
                  selectedSeat={selectedSeat}
                  onSelectSeat={(seat) => {
                    setSelectedSeat(seat);
                    setPageError("");
                  }}
                  onRetry={refetch}
                />

                {pageError && (
                  <p
                    className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6 text-red-600"
                    role="alert"
                  >
                    {pageError}
                  </p>
                )}

                <div className="mt-5 flex flex-col-reverse gap-3 sm:mt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-alt)] sm:w-auto"
                  >
                    رجوع للرحلات
                  </button>

                  <button
                    type="button"
                    disabled={!selectedSeat || isLoading || isError}
                    onClick={handleContinueFromSeats}
                    className="w-full rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-deep)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    متابعة الحجز <span className="mr-2">←</span>
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <PassengerForm
                  seatNumber={selectedSeat}
                  passenger={passenger}
                  onChange={handlePassengerChange}
                  onNext={handleContinueFromPassenger}
                  onBack={() => {
                    setPageError("");
                    setCurrentStep(1);
                  }}
                />

                {pageError && (
                  <p
                    className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6 text-red-600"
                    role="alert"
                  >
                    {pageError}
                  </p>
                )}
              </>
            )}

            {currentStep === 3 && (
              <BookingReview
                trip={trip}
                seatNumber={selectedSeat}
                passenger={passenger}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onConfirm={handleConfirm}
                onBack={() => {
                  setPageError("");
                  setCurrentStep(2);
                }}
              />
            )}
          </div>

          {/* ملخص الحجز */}
          <div className="min-w-0">
            <BookingSummary
              trip={trip}
              selectedSeat={selectedSeat}
              passengerCount={passengerCount}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
