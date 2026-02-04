import { useState, useEffect } from 'react';
import './About.css';
import carsImage from '../assets/inovaCar.avif';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About = ({ onNavigate }: AboutProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="about-screen">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content fade-in-down">
          <h1 className="about-hero-title">About Us</h1>
          <div className="breadcrumb">
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">About Us</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="about-features-container">
          <div className="features-left fade-in-left">
            <h2 className="features-main-title">
              Where every<br />
              drive feels<br />
              extraordinary
            </h2>
          </div>

          <div className="features-right fade-in-right">
            <div className="features-grid">
              <div className="feature-box scale-in">
                <h3 className="feature-title">Variety Brands</h3>
                <p className="feature-description">
                  Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit quam natoque ornare cursus viverra odio
                </p>
              </div>

              <div className="feature-box scale-in delay-100">
                <h3 className="feature-title">Awesome Suport</h3>
                <p className="feature-description">
                  Eget adipiscing augue sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies velit
                </p>
              </div>

              <div className="feature-box scale-in delay-200">
                <h3 className="feature-title">Maximum Freedom</h3>
                <p className="feature-description">
                  Diam quam gravida ultricies velit duis consequat integer. Est aliquam posuere vel rhoncus massa volutpat in
                </p>
              </div>

              <div className="feature-box scale-in delay-300">
                <h3 className="feature-title">Flexibility On The Go</h3>
                <p className="feature-description">
                  Vitae pretium nulla sed quam id nisl semper. Vel non in proin egestas dis.faucibus rhoncus. Iaculis dignissim aenean pellentesque nisl
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="about-video">
        <div className="about-video-container">
          <div className="video-wrapper">
            <div className="video-background"></div>
            <button className="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="about-stats">
        <div className="about-stats-container">
          <div className="stat-item">
            <div className="stat-number">20k+</div>
            <div className="stat-label">Happy customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">540+</div>
            <div className="stat-label">Count of cars</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">25+</div>
            <div className="stat-label">Years of experience</div>
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section className="about-memories">
        <div className="about-memories-container">
          <div className="memories-left">
            <h2 className="memories-title">
              Unlock unforgettable<br />
              memories on the road
            </h2>
            <p className="memories-description">
              Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique at gravida. Quis nunc interdum gravida ullamcorper
            </p>
            <div className="memories-features">
              <div className="memory-feature">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <span className="feature-text">
                  Non semper morbi. Purus non eu cursus porttitor tristique et gravida
                </span>
              </div>
              <div className="memory-feature">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <span className="feature-text">
                  Purus non eu cursus porttitor tristique at gravida. Quis nunc
                </span>
              </div>
              <div className="memory-feature">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <span className="feature-text">
                  Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor
                </span>
              </div>
              <div className="memory-feature">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <span className="feature-text">
                  Quis nunc interdum gravida ullamcorper
                </span>
              </div>
            </div>
          </div>

          <div className="memories-right">
            <div className="memories-image"></div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="about-download-app">
        <div className="about-download-container">
          <div className="download-left">
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen"></div>
              </div>
            </div>
          </div>

          <div className="download-right">
            <div className="download-label">DOWNLOAD OUR APP</div>
            <h2 className="download-title">Download our app</h2>
            <p className="download-description">
              Turpis morbi enim nisl pulvinar leo dui tellus. Faucibus egestas semper diam rutrum dictumst ut donec. Nisi nisi morbi velit in vulputate. Nulla nam eget urna fusce vulputate at risus
            </p>
            <div className="download-buttons">
              <a href="#appstore" className="download-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="download-btn-text">
                  <div className="download-btn-small">Download on the</div>
                  <div className="download-btn-large">App Store</div>
                </div>
              </a>
              <a href="#googleplay" className="download-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="download-btn-text">
                  <div className="download-btn-small">GET IT ON</div>
                  <div className="download-btn-large">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="about-reviews">
        <div className="about-reviews-container">
          <h2 className="reviews-title">Reviews from our customers</h2>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="quote-icon">"</div>
              <p className="review-text">
                Et aliquet netuus ut sapien pellentesque mattis nec dignissim magna. Amet erat volutpat quisque ante purus. Pellgoit in gravida metus
              </p>
              <div className="reviewer-avatar"></div>
              <div className="reviewer-info">
                <div className="reviewer-company">Kendall LLC</div>
                <div className="reviewer-name">Emanuel Boyle</div>
              </div>
            </div>

            <div className="review-card">
              <div className="quote-icon">"</div>
              <p className="review-text">
                Purus consectetur varius quis urna phasellus enim mattis. Sem tincidunt tortor nunc egestas amet adipiscing ligula
              </p>
              <div className="reviewer-avatar"></div>
              <div className="reviewer-info">
                <div className="reviewer-company">Glover - Orn</div>
                <div className="reviewer-name">River Graves</div>
              </div>
            </div>

            <div className="review-card">
              <div className="quote-icon">"</div>
              <p className="review-text">
                Quam neque odio urna euismod felis. Sit egestas magna in quisque famesedeibus quis sapien magna. Nisi non eget pellentesque tristique et
              </p>
              <div className="reviewer-avatar"></div>
              <div className="reviewer-info">
                <div className="reviewer-company">Hane LLC</div>
                <div className="reviewer-name">Ryder Malone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-faq">
        <div className="about-faq-container">
          <h2 className="faq-title">Top Car Rental Questions</h2>

          <div className="faq-list">
            <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(0)}>
                <span>How does it works?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              {openFaq === 0 && (
                <div className="faq-answer">
                  Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at ee in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla
                </div>
              )}
            </div>

            <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                <span>Can I rent a car without a credit card?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="faq-answer">
                  Yes, some locations accept debit cards with certain restrictions. A credit check and additional documentation may be required. Contact your local branch for specific requirements.
                </div>
              )}
            </div>

            <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                <span>What are the requirements for renting a car?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="faq-answer">
                  You must be at least 21 years old (age may vary by location), have a valid driver's license, and a credit card in your name. International renters may need additional documentation.
                </div>
              )}
            </div>

            <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                <span>Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="faq-answer">
                  No, towing or attaching a hitch to rental vehicles is strictly prohibited and may result in additional charges and termination of your rental agreement.
                </div>
              )}
            </div>

            <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(4)}>
                <span>Does Car Rental offer coverage products for purchase with my rental?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="faq-answer">
                  Yes, we offer various protection plans including collision damage waiver, liability insurance, and personal accident insurance. These can be added at the time of booking or pickup.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta">
        <div className="about-cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Looking for a car?</h2>
            <div className="cta-phone">+537 547-6401</div>
            <p className="cta-description">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in...
            </p>
            <button className="cta-button">Book now</button>
          </div>
          <div className="cta-image">
            <img src={carsImage} alt="Car" className="cta-car-img" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
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
                <div className="circle-label">Address</div>
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
                <div className="circle-value">nwijger@yahoo.com</div>
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
                <div className="circle-value">+537 547-6401</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-columns">
            <div className="footer-column">
              <h4 className="footer-column-title">Useful links</h4>
              <ul className="footer-links">
                <li><a href="#about">About us</a></li>
                <li><a href="#contact">Contact us</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#faq">F.A.Q</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Vehicles</h4>
              <ul className="footer-links">
                <li><a href="#sedan">Sedan</a></li>
                <li><a href="#cabriolet">Cabriolet</a></li>
                <li><a href="#pickup">Pickup</a></li>
                <li><a href="#minivan">Minivan</a></li>
                <li><a href="#suv">SUV</a></li>
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
            © Copyright Car Rental, 2024. Design by Figma_guru
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
