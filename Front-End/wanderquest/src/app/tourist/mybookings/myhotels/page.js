'use client'
import React, { useState, useEffect } from "react";
import Navbar from '../../../../../components/Navbar';
import styles from "/Styles/Bookings.module.css";  // Changed from Activities.module.css to Bookings.module.css
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Foot from "../../../../../components/foot";

function myhotels() {
    const [hotels, sethotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState(5); // Set to 5 for hotels
    const router = useRouter();

    const [multiplier, setMultiplier] = useState(1);
    const [preferredCurrency, setPreferredCurrency] = useState('USD');

    useEffect(() => {
        const fetchPaymentMultiplier = async () => {
            try {
                const response = await fetch('http://localhost:4000/payment/getPaymentMultiplier', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Automatically include credentials (user session)
                });

                if (response.ok) {
                    const result = await response.json();
                    setMultiplier(result.multiplier);
                    setPreferredCurrency(result.currency);
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchPaymentMultiplier();
    }, []);

    // Navigation functions
    const handleRedirect = (path, buttonId) => {
        setActiveButton(buttonId);
        router.push(`/tourist/mybookings/${path}`);
    };

    useEffect(() => {
        fetch(`http://localhost:4000/booking/hotels`, {
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                sethotels(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching hotels:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.all}>
            <Navbar />
            <div className={styles.top}>
                <div className={styles.container}>
                    <div className={styles.navbtns}>
                        <button
                            onClick={() => handleRedirect('flights', 1)}
                            className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ""}`}
                        >
                            Flights
                        </button>
                        <button
                            onClick={() => handleRedirect('transport', 2)}
                            className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
                        >
                            Transportation
                        </button>
                        <button
                            onClick={() => handleRedirect('activities', 3)}
                            className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
                        >
                            Activities
                        </button>
                        <button
                            onClick={() => handleRedirect('itiniraries', 4)}
                            className={`${styles.navbtn} ${activeButton === 4 ? styles.active : ""}`}
                        >
                            Itineraries
                        </button>
                        <button
                            onClick={() => handleRedirect('myhotels', 5)}
                            className={`${styles.navbtn} ${activeButton === 5 ? styles.active : ""}`}
                        >
                            Hotels
                        </button>
                        <button
                            onClick={() => handleRedirect('orders', 6)}
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

            <motion.div
                className={styles.bookingsContainer}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.bookingsList}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : hotels.length === 0 ? (
                        <p>No hotel bookings found</p>
                    ) : (
                        hotels.map((hotel) => (
                            <div key={hotel._id} className={styles.bookingCard}>
                                <h3>{hotel.details.hotelName}</h3>
                                <p><strong>Rating:</strong> {hotel.details.rating}</p>
                                <p><strong>Description:</strong> {hotel.details.description}</p>
                                <p><strong>Price:</strong> {`${hotel.details.price * multiplier} ${preferredCurrency}` || 'N/A'}</p>
                                <p><strong>Stars:</strong> {hotel.details.stars}</p>
                                <p><strong>Check In:</strong> {hotel.details.checkIn}</p>
                                <p><strong>Check Out:</strong> {hotel.details.checkOut}</p>

                            </div>
                        ))
                    )}
                </div>
            </motion.div>
            <Foot />
        </div>
    );
}

export default myhotels;