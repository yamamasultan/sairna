import { statsData } from './statecard-data';

export default function StateCard() {
    return (
        <section className="border-y border-[var(--border)] bg-[var(--surface)] py-6 sm:py-7">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-center md:grid-cols-4 md:items-center md:gap-0">
                    
                    {statsData.map((stat, index) => (
                        <div 
                            key={stat.id} 
                            className={`flex min-w-0 flex-col items-center justify-center px-2 py-1 md:min-w-0 md:flex-1 md:px-3 md:py-1.5 ${
                                index !== statsData.length - 1 ? 'md:border-l md:border-[var(--border)]' : ''
                            }`}
                        >
                            <span className="mb-1 text-2xl font-extrabold leading-tight text-[var(--text)] md:mb-1.5">
                                {stat.number}
                            </span>
                            <span className="text-xs font-medium leading-5 text-[var(--muted)]">
                                {stat.title}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}