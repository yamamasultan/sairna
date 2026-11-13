import HeroContent from "./heroContent";
import HeroImage from "./heroImage";
import BookingSearch from "./bookingSearch";

export default function Hero() {
    return (
        <section
            dir="rtl"
            className="relative overflow-visible bg-[var(--bg)] px-4 pb-16 pt-12 sm:px-8 lg:px-16 lg:pb-20 lg:pt-16"
        >
            <div className="container">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <HeroContent />
                    <HeroImage />
                </div>

                <BookingSearch />
            </div>
        </section>
    );
}