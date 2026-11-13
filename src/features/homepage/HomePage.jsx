import Hero from './components/hero/hero';
import StateCard from './components/statecard/statecard';
import Discover from './components/Discover/discover';
// import RouteMap from './components/routemap';
import Steps from './components/steps/steps';

export default function HomePage() {
        return (
        <div className="flex flex-col min-h-screen">

        <Hero />
        <StateCard />
        <Discover />
        <Steps />
        {/* <RouteMap /> */}
        </div>
        );
}