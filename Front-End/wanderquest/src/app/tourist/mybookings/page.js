'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from "/Styles/Bookings.module.css";
import Navbar from "../../../../components/Navbar";
import { motion } from "framer-motion";
import Foot from "../../../../components/foot";

function mybookingspage() {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState(1);

    const handleRedirectiti = () => {
        router.push('/tourist/mybookings/itiniraries');
    };
    const handleRedirecttrans = () => {
        router.push('/tourist/mybookings/transport');
    };
    const handleRedirectactivit = () => {
        router.push('/tourist/mybookings/activities');
    };
    const handleRedirectflight = () => {
        router.push('/tourist/mybookings/flights');
    };
    const handleRedirecthotel = () => {
        router.push('/tourist/mybookings/myhotels');
    };
    const handleRedirectOrders = () => {
        router.push('/tourist/mybookings/orders');
    }

    return (
        <div className={styles.all}>
            <Navbar />
            <div className={styles.top}>
                <div className={styles.container}>
                    <div className={styles.navbtns}>
                        <button
                            onClick={handleRedirectflight}
                            className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ""}`}
                        >
                            Flights
                        </button>
                        <button
                            onClick={handleRedirecttrans}
                            className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
                        >
                            Transportation
                        </button>
                        <button
                            onClick={handleRedirectactivit}
                            className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
                        >
                            Activities
                        </button>
                        <button
                            onClick={handleRedirectiti}
                            className={`${styles.navbtn} ${activeButton === 4 ? styles.active : ""}`}
                        >
                            Itineraries
                        </button>
                        <button
                            onClick={handleRedirecthotel}
                            className={`${styles.navbtn} ${activeButton === 5 ? styles.active : ""}`}
                        >
                            Hotels
                        </button>
                        <button
                            onClick={handleRedirectOrders}
                            className={`${styles.navbtn} ${activeButton === 6 ? styles.active : ""}`}
                        >
                            Orders
                        </button>
                    </div>
                </div>
                <h2 className={styles.welcome}>My Bookings</h2>
                <div className={styles.welcomeq}>
                    Track and manage all your travel arrangements in one place.
                </div>
            </div>
            <Foot />
        </div>
    )
}

export default mybookingspage;