import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { authAPI } from './api';
import './OtpVerification.css';

interface OtpVerificationProps {
  email: string;
  purpose: 'signup' | 'login';
  devOtp?: string;
  onVerified: (token: string, user: { id: number; name: string; email: string }) => void;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email, purpose, devOtp, onVerified, onBack }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [btnAnimating, setBtnAnimating] = useState(false);
  const [btnDone, setBtnDone] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setError('');
    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setBtnAnimating(true);
    setBtnDone(false);
    setError('');

    try {
      const data = await authAPI.verifySignup(email, otpValue);

      setBtnDone(true);
      setSuccess(data.message);

      // Wait for checkmark animation then navigate
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.token && data.user) {
        onVerified(data.token, data.user);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed. Please try again.';
      setError(message);
      setBtnAnimating(false);
      setBtnDone(false);
      // Clear OTP inputs on error
      setOtp(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || resending) return;

    setResending(true);
    setError('');

    try {
      const data = await authAPI.resendOtp(email, purpose);
      setSuccess(data.message);
      setCountdown(60);
      setCanResend(false);
      setOtp(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to resend OTP.';
      setError(message);
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-container">
      {/* Left Side — Brand */}
      <div className="otp-left">
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
          <p className="brand-tagline">Verify your identity to continue<br/>your premium road trip experience.</p>
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

      {/* Right Side - OTP Form */}
      <div className="otp-right">
        <div className="otp-card">
          <button className="otp-back-btn" onClick={onBack} type="button" aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="otp-header">
            <div className="otp-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 4L12 13L2 4"/>
              </svg>
            </div>
            <h1>Verify Your Email</h1>
            <p>We've sent a 6-digit code to</p>
            <p className="otp-email">{email}</p>
          </div>

          {devOtp && (
            <div className="dev-otp-badge">
              <span className="dev-label">DEV OTP:</span>
              <span className="dev-code">{devOtp}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className={`otp-digit ${digit ? 'filled' : ''} ${error ? 'shake' : ''}`}
                  disabled={isVerifying}
                  autoComplete="one-time-code"
                  id={`otp-input-${index}`}
                />
              ))}
            </div>

            {error && (
              <div className="otp-message error-msg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {error}
              </div>
            )}
            {success && (
              <div className="otp-message success-msg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {success}
              </div>
            )}

            <button
              type="submit"
              className={`submit-button noselect${btnAnimating ? ' animating' : ''}${btnDone ? ' done' : ''}`}
              disabled={isVerifying}
            >
              <span className="submit-label">{isVerifying && !btnDone ? '' : 'Verify OTP'}</span>
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

          <div className="otp-resend">
            {canResend ? (
              <button
                className="resend-btn"
                onClick={handleResend}
                disabled={resending}
                type="button"
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            ) : (
              <p className="resend-timer">
                Resend code in <span className="timer-count">{formatTime(countdown)}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
