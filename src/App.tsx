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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
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
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'vehicles' && <VehicleScreen onNavigate={setCurrentPage} />}
      {currentPage === 'details' && <VehicleDetails onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
      <ScrollToTop />
    </div>
  );
}

export default App;