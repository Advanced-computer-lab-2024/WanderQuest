"use client";
import React, { useState } from 'react';
import styles from '../styles/ForgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Track the current step
  const [message, setMessage] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    // Mock API call to send OTP
    console.log(`Sending OTP to ${email}`);
    setStep(2); // Move to OTP verification step
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    // Mock OTP verification and password reset
    console.log(`Verifying OTP: ${otp}`);
    setStep(3); // Move to password reset step
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Mock password reset
    console.log(`Resetting password for ${email}`);
    setMessage('Password reset successfully!');
    window.location.href = "/signin";
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <form onSubmit={handleSendOTP} className={styles.formContainer}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
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
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.formContainer}>
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          <p>{message}</p>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
