import HeroContent from "./heroContent";
import HeroImage from "./heroImage";
import BookingSearch from "./bookingSearch";

export default function Hero() {
    return (
        <section
            dir="rtl"
            className="relative z-20 overflow-visible bg-[var(--bg)] px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-16 lg:pb-20 lg:pt-16"
        >
            <div className="container mx-auto max-w-7xl">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 mb-10 sm:mb-14">
                    <HeroContent />
                    <HeroImage />
                </div>

                <BookingSearch />
            </div>
        </section>
    );
}