import { useState, useEffect } from 'react';

export const useTripSimulation = (initialProgress = 53, isRunning = true) => {
    const [progress, setProgress] = useState(initialProgress);
    const [activeSimulation, setActiveSimulation] = useState(isRunning);

    useEffect(() => {
        let interval = null;
        if (activeSimulation) {
        interval = setInterval(() => {
            setProgress((prev) => {
            if (prev >= 100) {
                return 0; // إعادة المحاكاة دورياً أو إيقافها
            }
            return prev + 1;
            });
        }, 3000); // تحديث النسبة كل 3 ثواني لمحاكاة الحركة
        } else {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [activeSimulation]);

    const toggleSimulation = () => setActiveSimulation(!activeSimulation);
    const resetSimulation = () => setProgress(initialProgress);

    return {
        progress,
        activeSimulation,
        toggleSimulation,
        resetSimulation,
    };
};