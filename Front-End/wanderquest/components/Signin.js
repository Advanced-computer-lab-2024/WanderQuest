"use client";
import React, { useState } from 'react';
import styles from "../styles/Signin.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from 'next/image';
import wander from '../public/logo.png'

function Signin({ toggleForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Login successful!");
        setError("");

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data));

        try {
          const response = await fetch("http://localhost:4000/payment/getPaymentMultiplier", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("multiplier", data.multiplier);
            localStorage.setItem("preferredCurrency", data.currency);
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Failed to get user role. Please try again.");
            setSuccess("");
          }
        } catch (err) {
          console.error("Error during login:", err);
          setError("An error occurred during login. Please try again later.");
          setSuccess("");
        }

        switch (data.role) {
          case "tourist":
            window.location.href = "/tourist";
            break;
          case "tourGuide":
            window.location.href = "/tourguide";
            break;
          case "advertiser":
            window.location.href = "/advertiser";
            break;
          case "seller":
            window.location.href = "/seller";
            break;
          case "Admin":
            window.location.href = "/admin";
            break;
          case "Tourism Governor":
            window.location.href = "/governer";
            break;
          default:
            setError("Unknown role. Please contact support.")
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className={styles.SigninContainer}>
      <Image src={wander} alt="WanderQuest Logo" className={styles.logo} />
      <form className={styles.SigninForm} onSubmit={handleLogin}>
        <h1 className={styles.Title}>Sign in</h1>
        <div className={styles.InputWrapper}>
          <input
            type="text"
            placeholder="Username"
            className={styles.Input}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.PasswordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.Input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i onClick={toggleShowPassword} className={styles.TogglePassword}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </i>
        </div>
        {error && <p className={styles.Error}>{error}</p>}
        <button type="submit" className={styles.SigninButton}>Sign in</button>
      </form>
      <div className={styles.Redirect}>
        Don't have an account? &nbsp;
        <a onClick={toggleForm} style={{ cursor: 'pointer' }}>Register</a>
      </div>
    </div>
  );
}

export default Signin;
