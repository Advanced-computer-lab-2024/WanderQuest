'use client'
import React, { useState, useEffect } from "react";
import styles from "/Styles/Bookings.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";
import Foot from "../../../../../components/foot";

function TransportPage() {
  const [transportation, setTransportation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(2); // Set to 2 for transportation
  const router = useRouter();

  const [multiplier, setMultiplier] = useState(1);
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  useEffect(() => {
    const storedMultiplier = localStorage.getItem('multiplier');
    let multiplier = 1;
    console.log('Stored Multiplier:', storedMultiplier);
    if (storedMultiplier) {
      console.log('Setting Multiplier:', storedMultiplier);
      setMultiplier(storedMultiplier);
    }

    const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    console.log('Preferred Currency:', preferredCurrency);
    if (preferredCurrency) {
      setPreferredCurrency(preferredCurrency);
    }
  }, []);

  // Navigation functions
  const handleRedirect = (path, buttonId) => {
    setActiveButton(buttonId);
    router.push(`/tourist/mybookings/${path}`);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/booking/transportations`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTransportation(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transportation:', error);
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
          ) : transportation.length === 0 ? (
            <p>No transportation bookings found</p>
          ) : (
            transportation.map((transport) => (
              <div key={transport._id} className={styles.bookingCard}>
                <h3>{transport.details.company}</h3>
                <p><strong>Type:</strong> {transport.details.type}</p>
                <p><strong>Price:</strong> {transport.details.price * multiplier} {preferredCurrency}</p>
                <p><strong>Departure:</strong> {transport.details.departure}</p>
                <p><strong>Arrival:</strong> {transport.details.arrival}</p>
                <p><strong>Date:</strong> {transport.details.transportationDate}</p>
                <p><strong>Pick Up Location:</strong> {transport.details.pickUpLocation}</p>
                <p><strong>Drop Off Location:</strong> {transport.details.dropOffLocation}</p>
                <p><strong>Status:</strong> {transport.status}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
      <Foot />
    </div>
  );
}

export default TransportPage;