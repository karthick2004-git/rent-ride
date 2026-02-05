import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './Home';
import VehicleScreen from './vehicle/vehicle-screen';
import VehicleDetails from './details/vehicle-details';
import About from './About/About';
import Contact from './contact/Contact';
import Login from './Login';
import Signup from './Signup';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

export interface Vehicle {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  features: string[];
  seats: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('details');
  };

  return (
    <div className="App">
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <Navbar 
          onNavigate={setCurrentPage} 
          activePage={currentPage}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'login' && (
        <Login 
          onSwitchToSignup={() => setCurrentPage('signup')} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === 'signup' && (
        <Signup onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} onViewDetails={handleViewDetails} />}
      {currentPage === 'vehicles' && <VehicleScreen onNavigate={setCurrentPage} onViewDetails={handleViewDetails} />}
      {currentPage === 'details' && <VehicleDetails onNavigate={setCurrentPage} vehicle={selectedVehicle} onViewDetails={handleViewDetails} />}
      {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
      <ScrollToTop />
    </div>
  );
}

export default App;