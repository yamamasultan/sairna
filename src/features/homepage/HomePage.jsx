import StateCard from './components/statecard/statecard';
import Hero from './components/hero/hero';
// import Discover from './components/Discover';
// import RouteMap from './components/routemap';
// import Steps from './components/steps';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            
            <Hero />
            
            <StateCard />

            {/* باقي الأقسام رح تتفتح لما تجهزها */}
            {/* <Discover /> */}
            {/* <Steps /> */}
            {/* <RouteMap /> */}
            
        </div>
    );
}