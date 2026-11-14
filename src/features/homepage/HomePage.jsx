import StateCard from './components/statecard/statecard';
import Hero from './components/hero/hero';
import Discover from './components/Discover/discover'; 
import Journey from './components/journey/JourneySection';
import Steps from './components/steps/steps';

export default function HomePage() {
        return (
        <div className="flex flex-col min-h-screen">

        <Hero />
        <StateCard />
        <Discover />
        <Steps />
        <Journey />
        </div>
        );
}