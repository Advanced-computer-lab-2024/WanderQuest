"use client";
import React, { useState } from "react";
import Navbar from '../../../../components/Navbar';
import styles from '/Styles/Bookings.module.css';
import {motion} from 'framer-motion';
function BookingsPage() {
  const [activeButton, setActiveButton] = useState(null);

  const handleChangeColor = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className={styles.all}>
      <Navbar />
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.navbtns}>
            <button
              onClick={() => { handleChangeColor(1);  }}
              className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ''}`}
            >
              Hotels
            </button>
            <button
              onClick={() => { handleChangeColor(2);  }}
              className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ''}`}
            >
              Flights
            </button>
            <button
              onClick={() => { handleChangeColor(3); }}
              className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ''}`}
            >
              Transportation
            </button>
          </div>
        </div>
        <h2 className={styles.welcome}> Where to next, Tourist?</h2>
        <div className={styles.welcome}> Wander freely, quest deeply – WanderQuest brings your travel dreams to life.</div>

      </div>
      <motion.div className={styles.searchbar}
      initial={{y:-20}}
      // animate={{y:-20}}
      transition={{duration:1}}
      >
            <input className={styles.input} style={{ marginLeft: "0" }} placeholder='type your destination' type="text" />
            <input  className={styles.input}  placeholder='type your destination' type="date" name="" id="" />
            <input className={styles.input} type="date" name="" id="" placeholder="Check-out Date"/>
            <button className={styles.search} >Search</button>
      </motion.div>
      <form className={styles.form} action="">
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
        <div className={styles.card}>
            <div className={styles.cardtop}>
            </div>
            <div className={styles.cardbottom}>
            <p>novotel hotel</p>
            <div className={styles.cardplace}>hurghada,Egypt</div>
            <div className={styles.cardrating}>9.5 waonderful</div>
            </div>

        </div>
      </form>
    </div>
  );
}

export default BookingsPage;
