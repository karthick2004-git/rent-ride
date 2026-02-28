import React, { useState, type FormEvent } from 'react';
import './Login.css';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginProps {
  onSwitchToSignup?: () => void;
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [btnAnimating, setBtnAnimating] = useState(false);
  const [btnDone, setBtnDone] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setBtnAnimating(true);
    setBtnDone(false);

    try {
      // Simulate API call
      console.log('Login submitted:', formData);
      // Replace with actual API call:
      // await loginAPI(formData.email, formData.password);
      
      // Wait for spin animation (2.5s) then show checkmark
      await new Promise(resolve => setTimeout(resolve, 2500));
      setBtnDone(true);
      
      // Wait for checkmark to show, then navigate
      await new Promise(resolve => setTimeout(resolve, 800));
      onLoginSuccess?.();
    } catch (error) {
      console.error('Login failed:', error);
      setBtnAnimating(false);
      setBtnDone(false);
      alert('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side — Brand */}
      <div className="login-left">
        {/* Full-screen animated scene */}
        <div className="scene">
          <div className="cloud"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="scene-mtn"></div>
          <div className="scene-hill"></div>
          <div className="pine"></div>
          <div className="pine pine-2"></div>
          <div className="pine pine-3"></div>
          <div className="road-surface"></div>
          <div className="road-lines"></div>
          <div className="sedan">
            <div className="sedan-body"></div>
            <div className="sedan-roof"></div>
            <div className="sedan-window-front"></div>
            <div className="sedan-window-rear"></div>
            <div className="sedan-headlight"></div>
            <div className="sedan-taillight"></div>
            <div className="sedan-wheel sedan-wh-f"></div>
            <div className="sedan-wheel sedan-wh-r"></div>
            <div className="sedan-shadow"></div>
          </div>
        </div>
        {/* Brand content overlay */}
        <div className="brand-content">
          <h1 className="anim-title">
            <span>R</span><span>e</span><span>n</span><span>t</span>
            <span className="anim-title-space">&nbsp;</span>
            <span>R</span><span>i</span><span>d</span><span>e</span>
          </h1>
          <p className="brand-tagline">Your premium car rental experience.<br/>Book, drive, and enjoy the journey.</p>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="feature-text">Secure</div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="feature-text">24/7 Support</div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div className="feature-text">Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h1>Hello!</h1>
            <p>Sign In to Get Started</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 4L12 13L2 4"/>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="forgot-link">
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className={`submit-button noselect${btnAnimating ? ' animating' : ''}${btnDone ? ' done' : ''}`}
              disabled={isSubmitting}
            >
              <span className="submit-label">{isSubmitting && !btnDone ? '' : 'Login'}</span>
              <svg
                className="submit-check"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
              </svg>
            </button>
          </form>

          <div className="signup-prompt">
            Don't have an account? <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); onSwitchToSignup?.(); }}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
