export const footerNavigation = {
    discover: {
        title: "استكشف",
        links: [
        { name: "الرئيسية", path: "/" },
        { name: "احجز رحلتك", path: "/booking" }, // <-- تم تصحيح المسار ليتطابق مع App.jsx
        { name: "شركات النقل", path: "/transport-companies" },
        { name: "تتبع رحلتك", path: "/tracking" },
        ],
    },
    account: {
        title: "حسابك",
        links: [
        { name: "تسجيل الدخول", path: "/login" },
        { name: "إنشاء حساب", path: "/register" },
        { name: "حجوزاتي", path: "/my-bookings" },
        { name: "الملف الشخصي", path: "/profile" },
        ],
    },
    support: {
    title: "نحن هون لمساعدتك",
    links: [
        { name: "عن سيرنا", path: "/about" },
        { name: "مركز المساعدة", path: "/help-center" },
    ],
},
};