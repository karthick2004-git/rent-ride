import { useState, useEffect } from 'react';
import './vehicle-screen.css';
import car22 from '../assets/car22.avif';
import honda from '../assets/honda.avif';
import inovaCar from '../assets/inovaCar.avif';

interface VehicleScreenProps {
  onNavigate: (page: string) => void;
}

const VehicleScreen = ({ onNavigate }: VehicleScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All vehicles');

  // Scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -10px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .fade-in, .fade-in-down');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .fade-in, .fade-in-down');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [selectedCategory]); // Re-run when category changes

  const vehicles = [
    { id: 1, name: 'Mercedes', type: 'Sedan', price: 25, image: car22, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 2, name: 'Mercedes', type: 'Sport', price: 50, image: honda, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 3, name: 'Mercedes', type: 'Sedan', price: 45, image: inovaCar, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 4, name: 'Porsche', type: 'SUV', price: 40, image: car22, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
    { id: 5, name: 'Toyota', type: 'Sedan', price: 35, image: honda, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
    { id: 6, name: 'Porsche', type: 'SUV', price: 50, image: inovaCar, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
    { id: 7, name: 'Mercedes', type: 'Van', price: 50, image: car22, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 8 },
    { id: 8, name: 'Toyota', type: 'Sport', price: 60, image: honda, features: ['Manual', 'PB 95', 'Air Conditioner'], seats: 4 },
    { id: 9, name: 'Maybach', type: 'Sedan', price: 70, image: inovaCar, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
  ];

  const categories = ['All vehicles', 'Sedan', 'Cabriolet', 'Pickup', 'Suv', 'Minivan'];

  const filteredVehicles = vehicles.filter(vehicle => {
    const categoryMatch = selectedCategory === 'All vehicles' || vehicle.type === selectedCategory;
    return categoryMatch;
  });

  return (
    <div className="vehicle-screen">
      {/* Main Content */}
      <div className="vehicle-content-wrapper">
        <div className="vehicle-page-container">
          {/* Page Title */}
          <h1 className="vehicle-page-title fade-in-down">Select a vehicle group</h1>

          {/* Category Filter Pills */}
          <div className="category-pills fade-in-up">           {categories.map(category => (
              <button
                key={category}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <svg className="category-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
                {category}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          <div className="vehicles-grid">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <div key={vehicle.id} className={`vehicle-card-new scale-in delay-${Math.min(index * 100, 500)}`}>
                  <div className="vehicle-image-new">
                    <img src={vehicle.image} alt={vehicle.name} className="car-image" />
                  </div>
                  <div className="vehicle-info-new">
                    <div className="vehicle-header-new">
                      <div className="vehicle-name-type">
                        <h3 className="vehicle-name-new">{vehicle.name}</h3>
                        <p className="vehicle-type-new">{vehicle.type}</p>
                      </div>
                      <div className="vehicle-price-new">
                        <span className="price-amount-new">${vehicle.price}</span>
                        <span className="price-period-new">per day</span>
                      </div>
                    </div>
                    <div className="vehicle-features-new">
                      <div className="feature-item-new">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                        </svg>
                        <span>Automat</span>
                      </div>
                      <div className="feature-item-new">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                        </svg>
                        <span>PB 95</span>
                      </div>
                      <div className="feature-item-new">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                        </svg>
                        <span>Air Conditioner</span>
                      </div>
                    </div>
                    <button className="view-details-btn-new" onClick={() => onNavigate('details')}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-cars-message">
                <svg className="no-cars-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3>No Cars Available</h3>
                <p>Sorry, there are no vehicles available in this category at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="brand-logos-section">
        <div className="brand-logos-container">
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <ellipse cx="40" cy="15" rx="12" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
              <ellipse cx="40" cy="15" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M40 7 L40 23 M32 15 L48 15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <path d="M20 8 H45 L50 15 H20 Z M20 15 H50 L45 22 H20 Z"/>
            </svg>
          </div>
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <circle cx="25" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M25 8 L30 15 L25 22 L20 15 Z" fill="currentColor"/>
              <circle cx="55" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M55 8 L60 15 L55 22 L50 15 Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <rect x="15" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="30" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="45" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="22.5" y="10" width="5" height="10" fill="white"/>
              <rect x="37.5" y="10" width="5" height="10" fill="white"/>
            </svg>
          </div>
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <circle cx="40" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="32" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="48" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="brand-logo">
            <svg viewBox="0 0 80 30" fill="currentColor">
              <ellipse cx="40" cy="15" rx="25" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
              <ellipse cx="40" cy="15" rx="20" ry="9" fill="none" stroke="currentColor" strokeWidth="2"/>
              <ellipse cx="40" cy="15" rx="15" ry="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <ellipse cx="40" cy="15" rx="10" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="vehicle-footer">
        <div className="footer-top">
          <div className="footer-brand-section">
            <div className="footer-logo">
              <svg className="footer-car-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
              <span className="footer-logo-text">Car Rental</span>
            </div>
            <p className="footer-description">
              FauciBus faucibus pellentesque dictum turpis. 
              Id pellentesque turpis massa a id iaculis lorem t...
            </p>
            <div className="footer-social">
              <a href="#facebook" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="#instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#youtube" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.582 7.186c-.252-1.158-.995-2.067-2.049-2.372C17.73 4.28 12 4.28 12 4.28s-5.73 0-7.533.534c-1.054.305-1.797 1.214-2.049 2.372C2 8.99 2 12 2 12s0 3.01.418 4.814c.252 1.158.995 2.067 2.049 2.372C6.27 19.72 12 19.72 12 19.72s5.73 0 7.533-.534c1.054-.305 1.797-1.214 2.049-2.372C22 15.01 22 12 22 12s0-3.01-.418-4.814zM10 15V9l5.5 3-5.5 3z"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-info-circles">
            <div className="info-circle">
              <div className="circle-icon orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="circle-content">
                <div className="circle-label">ADDRESS</div>
                <div className="circle-value">Oxford Ave, Cary, NC 27511</div>
              </div>
            </div>

            <div className="info-circle">
              <div className="circle-icon orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="circle-content">
                <div className="circle-label">Email</div>
                <div className="circle-value">margin@yahoo.com</div>
              </div>
            </div>

            <div className="info-circle">
              <div className="circle-icon orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div className="circle-content">
                <div className="circle-label">Phone</div>
                <div className="circle-value">+837 657-4301</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-columns">
            <div className="footer-column">
              <h4 className="footer-column-title">Useful links</h4>
              <ul className="footer-links">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact us</a></li>
                <li><a href="#gallery" onClick={(e) => e.preventDefault()}>Gallery</a></li>
                <li><a href="#blog" onClick={(e) => e.preventDefault()}>Blog</a></li>
                <li><a href="#faq" onClick={(e) => e.preventDefault()}>F.A.Q</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Vehicles</h4>
              <ul className="footer-links">
                <li><a href="#sedan" onClick={(e) => e.preventDefault()}>Sedan</a></li>
                <li><a href="#cabriolet" onClick={(e) => e.preventDefault()}>Cabriolet</a></li>
                <li><a href="#pickup" onClick={(e) => e.preventDefault()}>Pickup</a></li>
                <li><a href="#minivan" onClick={(e) => e.preventDefault()}>Minivan</a></li>
                <li><a href="#suv" onClick={(e) => e.preventDefault()}>SUV</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Download App</h4>
              <div className="app-buttons">
                <a href="#appstore" className="app-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="app-button-text">
                    <div className="app-button-small">Download on the</div>
                    <div className="app-button-large">App Store</div>
                  </div>
                </a>
                <a href="#googleplay" className="app-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="app-button-text">
                    <div className="app-button-small">GET IT ON</div>
                    <div className="app-button-large">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            © Copyright Car Rental, 2024. Design by Figma Jango
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VehicleScreen;