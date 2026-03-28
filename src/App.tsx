import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './Home';
import VehicleScreen from './vehicle/vehicle-screen';
import VehicleDetails from './details/vehicle-details';
import About from './About/About';
import Contact from './contact/Contact';
import Login from './Login';
import Signup from './Signup';
import OtpVerification from './OtpVerification';
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
  // Check for existing token on load
  const [currentPage, setCurrentPage] = useState(() => {
    const token = localStorage.getItem('rent_ride_token');
    return token ? 'home' : 'login';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('rent_ride_token');
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // OTP flow state
  const [otpEmail, setOtpEmail] = useState('');
  const [otpPurpose, setOtpPurpose] = useState<'signup' | 'login'>('login');
  const [devOtp, setDevOtp] = useState<string | undefined>(undefined);

  // Sync login state with localStorage
  useEffect(() => {
    const token = localStorage.getItem('rent_ride_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOtpRequired = (email: string, purpose: 'signup' | 'login', otp?: string) => {
    setOtpEmail(email);
    setOtpPurpose(purpose);
    setDevOtp(otp);
    setCurrentPage('otp');
  };

  const handleOtpVerified = (token: string, user: { id: number; name: string; email: string }) => {
    localStorage.setItem('rent_ride_token', token);
    localStorage.setItem('rent_ride_user', JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLoginSuccess = (token: string, user: { id: number; name: string; email: string }) => {
    localStorage.setItem('rent_ride_token', token);
    localStorage.setItem('rent_ride_user', JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('rent_ride_token');
    localStorage.removeItem('rent_ride_user');
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('details');
  };

  return (
    <div className="App">
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'otp' && (
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
        <Signup 
          onSwitchToLogin={() => setCurrentPage('login')}
          onOtpRequired={handleOtpRequired}
        />
      )}
      {currentPage === 'otp' && (
        <OtpVerification
          email={otpEmail}
          purpose={otpPurpose}
          devOtp={devOtp}
          onVerified={handleOtpVerified}
          onBack={() => setCurrentPage(otpPurpose === 'signup' ? 'signup' : 'login')}
        />
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