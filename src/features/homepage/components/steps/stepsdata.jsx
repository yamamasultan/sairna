import { Search, Bus, Ticket } from "lucide-react";

export const stepsData = [
    {
        number: "01",
        title: "اختار وجهتك",
        description: "حدد من وين لوين وتاريخ الرحلة المناسب إلك.",
        icon: Search,
        iconBg: "bg-teal-500/20 dark:bg-teal-500/20", 
        iconColor: "text-teal-700 dark:text-teal-400",
    },
    {
        number: "02",
        title: "لافي رحلتك",
        description: "قارن الشركات والمواعيد والأسعار واختر الأفضل.",
        icon: Bus,
        iconBg: "bg-orange-500/20 dark:bg-orange-500/20",
        iconColor: "text-orange-700 dark:text-orange-400",
    },
    {
        number: "03",
        title: "احجز مقعدك",
        description: "اختار مقعدك وأكد الحجز، وتذكرتك بتصير جاهزة.",
        icon: Ticket,
        iconBg: "bg-indigo-500/20 dark:bg-indigo-500/20",
        iconColor: "text-indigo-700 dark:text-indigo-400",
    },
];