import React, { useState } from 'react';
import styles from '../styles/Signin.module.css';
import { motion } from 'framer-motion';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials to set cookies
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login (e.g., redirect to another page)
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <>
      <motion.img
        initial={{ scale: 0.4, y: 0, opacity: 0.5 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.head} src="/image.png" alt=""
      />
      <motion.div
        initial={{ scale: 0.4, y: 0, opacity: 0.5 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.container}
      >
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
        <div className={styles.bottom}>
          <p className={styles.signin}>Sign in</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.username}>
              <label className={styles.label} htmlFor="username">Username</label>
              <br />
              <input
                className={styles.input}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
            <div className={styles.createaccount}>
              <button className={styles.btn} type="submit">Sign in</button>
            </div>
          </form>
          <a className={styles.link} href="">Create Account</a>
        </div>
      </motion.div>
    </>
  );
}

export default Signin;