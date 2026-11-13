import Footer from './components/footer/footer'; 
import HomePage from './features/homepage/HomePage';
import Header from './components/header/Header';

function App() {
  return (
    <div className="bg-white text-gray-900">

      <Header /> 

      <HomePage />
      
      <Footer />
    </div>
  );
}

export default App;