
const steps = [
  "اختيار المقاعد",
  "بيانات المسافرين",
  "المراجعة والتأكيد",
];

export default function BookingStepper({ currentStep }) {
  return (
    <nav
      className="mx-auto flex w-full max-w-3xl items-center justify-center gap-2 sm:gap-3"
      aria-label="مراحل إتمام الحجز"
      dir="rtl"
      style={{
        fontFamily: "var(--font)",
        fontVariantNumeric: "lining-nums",
      }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const completed = currentStep > stepNumber;
        const active = currentStep === stepNumber;

        return (
          <div
            key={step}
            className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
          >
            {/* رقم المرحلة واسمها */}
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`
                  flex h-7 w-7 shrink-0 items-center justify-center
                  rounded-full border text-[11px] font-bold
                  transition-all duration-300
                  ${
                    active || completed
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] bg-transparent text-[var(--muted)]"
                  }
                `}
                aria-current={active ? "step" : undefined}
              >
                {completed ? "✓" : stepNumber}
              </span>

              <span
                className={`
                  whitespace-nowrap text-[10px] font-semibold
                  transition-colors duration-300 sm:text-xs
                  ${
                    active || completed
                      ? "text-[var(--primary-deep)]"
                      : "text-[var(--muted)]"
                  }
                `}
              >
                {step}
              </span>
            </div>

            {/* الخط الواصل بين المراحل */}
            {index < steps.length - 1 && (
              <span
                className={`
                  h-px min-w-2 flex-1 self-center rounded-full
                  transition-colors duration-500
                  ${
                    completed
                      ? "bg-[var(--primary)]"
                      : "bg-[var(--border)]"
                  }
                `}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
