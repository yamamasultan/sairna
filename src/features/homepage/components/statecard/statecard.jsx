import { statsData } from './statecard-data';

export default function StateCard() {
    return (
        <section style={{ padding: '40px 20px', backgroundColor: '#fff', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
                
                {statsData.map((stat, index) => (
                    <div 
                        key={stat.id} 
                        style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        flex: '1 1 200px',
                        padding: '10px',
                        borderRight: index !== statsData.length - 1 ? '1px solid #e5e7eb' : 'none'
                        }}
                    >
                        <span style={{ fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                        {stat.number}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>
                        {stat.title}
                        </span>
                    </div>
                ))}

            </div>
        </section>
    );
}