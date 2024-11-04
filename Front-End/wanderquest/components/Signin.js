import React from 'react';
import styles from '../styles/Signin.module.css';
import {motion} from 'framer-motion';
function Signin() {
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
      <div className={styles.bottom}>
        <p className={styles.signin}>Sign in</p>
        <div className={styles.username}>
          <label className={styles.label} htmlFor="">Username</label>
          <br />
          <input className={styles.input} type="text" name="" id="" />
        </div>
        <div className={styles.password}>
          <label className={styles.label} htmlFor="">Password</label>
          <br />
          <input required className={styles.input} type="password" name="" id="" />
        </div>
      </div>
      <div className={styles.createaccount}>
        <button className={styles.btn}>Sign in</button>
      </div>
      <a className={styles.link} href="">Create Account</a>
    </motion.div>
    </>);
}

export default Signin;
