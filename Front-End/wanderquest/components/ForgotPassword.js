"use client";
import React, { useState } from 'react';
import styles from '../styles/ForgotPassword.module.css';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Tracks the current step
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:4000/authentication/requestForgetPasswordEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setStep(2); // Move to OTP verification step
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while sending the OTP.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:4000/authentication/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, username, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setStep(3); // Move to success step
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <form onSubmit={handleSendOTP} className={styles.formContainer}>
          <h2>Forgot Password</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className={styles.formContainer}>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
      {step === 3 && (
        <div className={styles.formContainer}>
          <h2>{message}</h2>
          <a href="/signin">Go to Sign In</a>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
