import { statsData } from './statecard-data';

export default function StateCard() {
    return (
        <section className="border-y border-[var(--border)] bg-[var(--surface)] py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-around items-center text-center gap-5">
                    
                    {statsData.map((stat, index) => (
                        <div 
                            key={stat.id} 
                            className={`flex flex-col items-center flex-1 min-w-[200px] p-2.5 ${
                                index !== statsData.length - 1 ? 'md:border-l md:border-[var(--border)]' : ''
                            }`}
                        >
                            <span className="text-3xl font-extrabold text-[var(--text)] mb-2">
                                {stat.number}
                            </span>
                            <span className="text-sm font-medium text-[var(--muted)]">
                                {stat.title}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}