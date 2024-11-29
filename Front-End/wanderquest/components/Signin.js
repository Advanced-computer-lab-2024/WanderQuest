"use client"
import React,{ useState } from 'react';
import styles from '../styles/Signin.module.css';

import {motion} from 'framer-motion';
function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://localhost:4000/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for the JWT
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Login successful!");
        setError("");
        console.log("User data:", data);
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
            setError("Unknown role. Please contact support.")}
        

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
  return (<>
    <motion.img 
    initial={{scale:0.4,y:0,opacity:0.5}}
    animate={{scale:1,y:0,opacity:1}}
    transition={{duration:0.5}}
    className={styles.head} src="/image.png" alt="" />
    <motion.div 
    initial={{scale:0.4,y:0,opacity:0.5}}
    animate={{scale:1,y:0,opacity:1}}
    transition={{duration:1}}
    className={styles.container}>
      <div className={styles.top}>
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
        <dotlottie-player 
          src="https://lottie.host/d400beb3-6daa-4691-9259-d010c2d9dfe0/gNoniLxuhl.json" 
          background="transparent" 
          speed="1" 
          style={{ width: '300px', height: '300px' }} 
          direction="1" 
          playMode="normal" 
          loop 
          autoplay 
        />
      </div>
      <form onSubmit={handleLogin}>
      <div className={styles.bottom}>
        <p className={styles.signin}>Sign in</p>
        <div className={styles.username}>
  <label className={styles.label} htmlFor="username">Username</label>
  <br />
  <input 
    className={styles.input} 
    type="text" 
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
<div className={styles.password}>
  <label className={styles.label} htmlFor="password">Password</label>
  <br />
  <input 
    className={styles.input} 
    type="password" 
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required 
  />
</div>
      </div>
      <div className={styles.createaccount}>
        <button className={styles.btn}>Sign in</button>
      </div>
      </form>
      <div className={styles.createaccountInline}>
    <span className={styles.noAccount}>Don't have an account?</span>
    <a className={styles.link} href="/register">Create Account</a>
  </div>
    </motion.div>
    </>);
}

export default Signin;