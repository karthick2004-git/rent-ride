import './Home.css';
import car22 from './assets/car22.avif';
import honda from './assets/honda.avif';
import inovaCar from './assets/inovaCar.avif';
import audi from './assets/audi.webp';
import { useState, useEffect } from 'react';
import type { Vehicle } from './App';

interface HomeProps {
  onNavigate: (page: string) => void;
  onViewDetails: (vehicle: Vehicle) => void;
}

const Home = ({ onNavigate, onViewDetails }: HomeProps) => {
  const [carType, setCarType] = useState('');
  const [rentalPlace, setRentalPlace] = useState('');
  const [returnPlace, setReturnPlace] = useState('');
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [errors, setErrors] = useState({
    carType: false,
    rentalPlace: false,
    returnPlace: false,
    rentalDate: false,
    returnDate: false
  });

  // Home page vehicles
  const vehicles: Vehicle[] = [
    { id: 1, name: 'Mercedes', type: 'Sedan', price: 25, image: car22, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 2, name: 'Mercedes', type: 'Sport', price: 50, image: honda, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 3, name: 'Mercedes', type: 'Sedan', price: 45, image: inovaCar, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 5 },
    { id: 4, name: 'Porsche', type: 'SUV', price: 40, image: car22, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
    { id: 5, name: 'Toyota', type: 'Sedan', price: 35, image: honda, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
    { id: 6, name: 'Porsche', type: 'SUV', price: 50, image: inovaCar, features: ['Automat', 'PB 95', 'Air Conditioner'], seats: 7 },
  ];

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
  }, []);

  const handleBookNow = () => {
    const newErrors = {
      carType: !carType,
      rentalPlace: !rentalPlace,
      returnPlace: !returnPlace,
      rentalDate: !rentalDate,
      returnDate: !returnDate
    };

    setErrors(newErrors);

    // Check if any field has an error
    const hasErrors = Object.values(newErrors).some(error => error);

    if (!hasErrors) {
      // All fields are filled, navigate to vehicles page
      onNavigate('vehicles');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left fade-in-left">
            <h1 className="hero-title">
              Experience the road<br />like never before 
            </h1>
            <p className="hero-description">
              Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper
            </p>
            <button className="view-cars-btn" onClick={() => onNavigate('vehicles')}>View all cars</button>
          </div>

          {/* Booking Form Card */}
          <div className="booking-card fade-in-right delay-200">
            <h2 className="booking-title">Book your car</h2>
            <div className="booking-form">
              <div className="form-group">
                <select 
                  className={`form-select ${errors.carType ? 'error' : ''}`}
                  value={carType}
                  onChange={(e) => {
                    setCarType(e.target.value);
                    setErrors({...errors, carType: false});
                  }}
                >
                  <option value="">Car type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                </select>
                {errors.carType && <span className="error-message">Please select a car type</span>}
              </div>

              <div className="form-group">
                <select 
                  className={`form-select ${errors.rentalPlace ? 'error' : ''}`}
                  value={rentalPlace}
                  onChange={(e) => {
                    setRentalPlace(e.target.value);
                    setErrors({...errors, rentalPlace: false});
                  }}
                >
                  <option value="">Place of rental</option>
                  <option value="City Center">City Center</option>
                  <option value="Airport">Airport</option>
                  <option value="Train Station">Train Station</option>
                </select>
                {errors.rentalPlace && <span className="error-message">Please select rental place</span>}
              </div>

              <div className="form-group">
                <select 
                  className={`form-select ${errors.returnPlace ? 'error' : ''}`}
                  value={returnPlace}
                  onChange={(e) => {
                    setReturnPlace(e.target.value);
                    setErrors({...errors, returnPlace: false});
                  }}
                >
                  <option value="">Place of return</option>
                  <option value="City Center">City Center</option>
                  <option value="Airport">Airport</option>
                  <option value="Train Station">Train Station</option>
                </select>
                {errors.returnPlace && <span className="error-message">Please select return place</span>}
              </div>

              <div className="form-group">
                <div className="date-input-wrapper">
                  <input 
                    type="date" 
                    className={`form-input date-input ${errors.rentalDate ? 'error' : ''}`}
                    placeholder="Rental date"
                    value={rentalDate}
                    onChange={(e) => {
                      setRentalDate(e.target.value);
                      setErrors({...errors, rentalDate: false});
                    }}
                  />
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7z"/>
                  </svg>
                </div>
                {errors.rentalDate && <span className="error-message">Please select rental date</span>}
              </div>

              <div className="form-group">
                <div className="date-input-wrapper">
                  <input 
                    type="date" 
                    className={`form-input date-input ${errors.returnDate ? 'error' : ''}`}
                    placeholder="Return date"
                    value={returnDate}
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                      setErrors({...errors, returnDate: false});
                    }}
                  />
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7z"/>
                  </svg>
                </div>
                {errors.returnDate && <span className="error-message">Please select return date</span>}
              </div>

              <button className="book-now-btn" onClick={handleBookNow}>Book now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3 className="feature-title">Availability</h3>
            <p className="feature-description">
              Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
            </p>
          </div>

          <div className="feature-card fade-in-up delay-200">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <h3 className="feature-title">Comfort</h3>
            <p className="feature-description">
              Gravida auctor fermentum morbi vulputate ac egestas orcitellum convallis
            </p>
          </div>

          <div className="feature-card fade-in-up delay-400">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <h3 className="feature-title">Savings</h3>
            <p className="feature-description">
              Pretium convallis id diam sed commodo vestibulum lobortis volutpat
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="steps-container">
          <div className="steps-image fade-in-left">
            <img src={audi} alt="Audi Car" className="steps-car-image" />
          </div>

          <div className="steps-content fade-in-right">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-text">
                <h4 className="step-title">Erat at semper</h4>
                <p className="step-description">
                  Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-text">
                <h4 className="step-title">Urna nec vivamus risus duis arcu</h4>
                <p className="step-description">
                  Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-text">
                <h4 className="step-title">Lobortis euismod imperdiet tempus</h4>
                <p className="step-description">
                  Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc luctus viverra nisl
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-text">
                <h4 className="step-title">Cras nulla aliquet nam eleifend amet et</h4>
                <p className="step-description">
                  Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper sed integer. Quisque eleifend tincidunt vulputate libero
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="cars-section">
        <div className="cars-header fade-in-up">
          <h2 className="cars-title">Choose the car that suits you</h2>
          <a href="#all" className="view-all-link">
            View All
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        </div>

        <div className="cars-grid">
          {/* Car Card 1 */}
          <div className="car-card scale-in">
            <div className="car-image-placeholder">
              <img src={car22} alt="Mercedes" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Mercedes</h3>
                    <p className="car-type">Sedan</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$25</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[0])}>View Details</button>
            </div>
          </div>

          {/* Car Card 2 */}
          <div className="car-card scale-in delay-100">
            <div className="car-image-placeholder">
              <img src={honda} alt="Mercedes Sport" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Mercedes</h3>
                    <p className="car-type">Sport</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$50</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[1])}>View Details</button>
            </div>
          </div>

          {/* Car Card 3 */}
          <div className="car-card scale-in delay-200">
            <div className="car-image-placeholder">
              <img src={inovaCar} alt="Mercedes Sedan" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Mercedes</h3>
                    <p className="car-type">Sedan</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$45</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[2])}>View Details</button>
            </div>
          </div>

          {/* Car Card 4 */}
          <div className="car-card scale-in delay-300">
            <div className="car-image-placeholder">
              <img src={car22} alt="Porsche SUV" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Porsche</h3>
                    <p className="car-type">SUV</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$40</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[3])}>View Details</button>
            </div>
          </div>

          {/* Car Card 5 */}
          <div className="car-card scale-in delay-400">
            <div className="car-image-placeholder">
              <img src={honda} alt="Toyota Sedan" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Toyota</h3>
                    <p className="car-type">Sedan</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$35</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[4])}>View Details</button>
            </div>
          </div>

          {/* Car Card 6 */}
          <div className="car-card scale-in delay-500">
            <div className="car-image-placeholder">
              <img src={inovaCar} alt="Porsche SUV" className="car-image-home" />
            </div>
            <div className="car-info">
              <div className="car-details">
                <div className="car-name-price">
                  <div>
                    <h3 className="car-name">Porsche</h3>
                    <p className="car-type">SUV</p>
                  </div>
                  <div className="car-price-wrapper">
                    <span className="car-price">$50</span>
                    <span className="price-period">per day</span>
                  </div>
                </div>
                <div className="car-features">
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                    </svg>
                    <span>Automat</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>PB 95</span>
                  </div>
                  <div className="feature-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
                    </svg>
                    <span>Air Conditioner</span>
                  </div>
                </div>
              </div>
              <button className="view-details-btn" onClick={() => onViewDetails(vehicles[5])}>View Details</button>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="facts-section">
        <div className="facts-container">
          <div className="facts-header fade-in-up">
            <h2 className="facts-title">Facts In Numbers</h2>
            <p className="facts-description">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper fermentum
            </p>
          </div>

          <div className="facts-grid">
            <div className="fact-card scale-in">
              <div className="fact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div className="fact-content">
                <h3 className="fact-number">540+</h3>
                <p className="fact-label">Cars</p>
              </div>
            </div>

            <div className="fact-card scale-in delay-200">
              <div className="fact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div className="fact-content">
                <h3 className="fact-number">20k+</h3>
                <p className="fact-label">Customers</p>
              </div>
            </div>

            <div className="fact-card scale-in delay-300">
              <div className="fact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
              </div>
              <div className="fact-content">
                <h3 className="fact-number">25+</h3>
                <p className="fact-label">Years</p>
              </div>
            </div>

            <div className="fact-card scale-in delay-400">
              <div className="fact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="fact-content">
                <h3 className="fact-number">20m+</h3>
                <p className="fact-label">Miles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="mobile-app-section">
        <div className="mobile-app-container">
          <div className="mobile-app-content fade-in-left">
            <h2 className="mobile-app-title">Download mobile app</h2>
            <p className="mobile-app-description">
              Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet erat hendrerit enim condimentum. Condimentum interdum risus bibendum urna...
            </p>
            <div className="app-store-buttons">
              <a href="#" className="store-button">
                <svg className="apple-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="store-text">
                  <span className="store-small">Download on the</span>
                  <span className="store-large">App Store</span>
                </div>
              </a>
              <a href="#" className="store-button">
                <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35.14-.06.28-.09.43-.09.26 0 .5.09.7.26l13.29 8.5c.41.26.65.72.65 1.18s-.24.92-.65 1.18l-13.29 8.5c-.2.17-.44.26-.7.26-.15 0-.29-.03-.43-.09-.5-.24-.84-.76-.84-1.35z"/>
                </svg>
                <div className="store-text">
                  <span className="store-small">GET IT ON</span>
                  <span className="store-large">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mobile-app-phones fade-in-right delay-200">
            <div className="phone-mockup phone-back">
              <div className="phone-screen"></div>
            </div>
            <div className="phone-mockup phone-front">
              <div className="phone-screen"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner-section">
        <div className="cta-banner-container">
          <div className="cta-banner-content fade-in-up">
            <h2 className="cta-banner-title">
              Enjoy every mile with adorable companionship.
            </h2>
            <p className="cta-banner-description">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in. Diam tincidunt tincidunt erat
            </p>
            <div className="cta-search-bar">
              <input type="text" className="cta-search-input" placeholder="City" />
              <button className="cta-search-button">Search</button>
            </div>
          </div>
          <div className="cta-car-graphic">
            <svg viewBox="0 0 400 300" fill="none">
              <ellipse cx="200" cy="220" rx="180" ry="60" fill="rgba(91, 75, 201, 0.3)" />
              <path d="M100 180 Q90 150 110 130 L150 130 L170 110 L230 110 L250 130 L290 130 Q310 150 300 180 L280 200 L120 200 Z" fill="rgba(91, 75, 201, 0.6)" />
              <circle cx="140" cy="200" r="20" fill="rgba(91, 75, 201, 0.8)" />
              <circle cx="260" cy="200" r="20" fill="rgba(91, 75, 201, 0.8)" />
              <rect x="160" y="140" width="80" height="35" rx="5" fill="rgba(91, 75, 201, 0.5)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        {/* Top Row: Logo and Contact Info */}
        <div className="footer-top-row">
          <div className="footer-brand-left">
            <div className="footer-logo">
              <svg className="footer-car-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
              <span className="footer-logo-text">Car Rental</span>
            </div>
          </div>

          <div className="footer-contact-circles">
            <div className="contact-circle-item">
              <div className="circle-icon-orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="circle-text">
                <p className="circle-label">Address</p>
                <p className="circle-value">Oxford Ave. Cary, NC 27511</p>
              </div>
            </div>

            <div className="contact-circle-item">
              <div className="circle-icon-orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="circle-text">
                <p className="circle-label">Email</p>
                <p className="circle-value">nwiger@yahoo.com</p>
              </div>
            </div>

            <div className="contact-circle-item">
              <div className="circle-icon-orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div className="circle-text">
                <p className="circle-label">Phone</p>
                <p className="circle-value">+537 547-6401</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Brand Info with Social + Links */}
        <div className="footer-bottom-row">
          <div className="footer-brand-section-new">
            <p className="footer-description-new">
              Faucibus faucibus pellentesque dictum turpis. Id pellentesque turpis massa a id iaculis lorem t...
            </p>
            <div className="footer-social-icons-new">
              <a href="#" className="social-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-columns">
            <div className="footer-column-new">
              <h3 className="footer-column-title-new">Useful links</h3>
              <ul className="footer-links-new">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact us</a></li>
                <li><a href="#gallery" onClick={(e) => e.preventDefault()}>Gallery</a></li>
                <li><a href="#blog" onClick={(e) => e.preventDefault()}>Blog</a></li>
                <li><a href="#faq" onClick={(e) => e.preventDefault()}>F.A.Q</a></li>
              </ul>
            </div>

            <div className="footer-column-new">
              <h3 className="footer-column-title-new">Vehicles</h3>
              <ul className="footer-links-new">
                <li><a href="#sedan" onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}>Sedan</a></li>
                <li><a href="#cabriolet" onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}>Cabriolet</a></li>
                <li><a href="#pickup" onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}>Pickup</a></li>
                <li><a href="#minivan" onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}>Minivan</a></li>
                <li><a href="#suv" onClick={(e) => { e.preventDefault(); onNavigate('vehicles'); }}>SUV</a></li>
              </ul>
            </div>

            <div className="footer-column-new">
              <h3 className="footer-column-title-new">Download App</h3>
              <div className="footer-app-buttons-new">
                <a href="#" className="footer-store-button-new">
                  <svg className="footer-apple-icon-new" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="store-text-new">
                    <span className="store-small-new">Download on the</span>
                    <span className="store-large-new">App Store</span>
                  </div>
                </a>
                <a href="#" className="footer-store-button-new">
                  <svg className="footer-play-icon-new" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35.14-.06.28-.09.43-.09.26 0 .5.09.7.26l13.29 8.5c.41.26.65.72.65 1.18s-.24.92-.65 1.18l-13.29 8.5c-.2.17-.44.26-.7.26-.15 0-.29-.03-.43-.09-.5-.24-.84-.76-.84-1.35z"/>
                  </svg>
                  <div className="store-text-new">
                    <span className="store-small-new">GET IT ON</span>
                    <span className="store-large-new">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;