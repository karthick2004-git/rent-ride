import './Navbar.css';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ onNavigate, activePage, isLoggedIn, onLogout }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <svg className="car-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
          <span className="logo-text">Rent Ride</span>
        </div>
      </div>
      <div className="nav-center">
        <a 
          href="#home" 
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          Home
        </a>
        <a 
          href="#vehicles" 
          className={`nav-link ${activePage === 'vehicles' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}
        >
          Vehicles
        </a>
        <a 
          href="#details" 
          className={`nav-link ${activePage === 'details' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); onNavigate('details'); }}
        >
          Details
        </a>
        <a 
          href="#about" 
          className={`nav-link ${activePage === 'about' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
        >
          About Us
        </a>
        <a 
          href="#contact" 
          className={`nav-link ${activePage === 'contact' ? 'active' : ''}`} 
          onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
        >
          Contact Us
        </a>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={onLogout}>
            <svg className="logout-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </button>
        ) : (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => onNavigate('login')}>
              <svg className="login-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
              </svg>
              Login
            </button>
            <button className="signup-btn" onClick={() => onNavigate('signup')}>
              <svg className="signup-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
