"use client";
import { useEffect, useState } from 'react';
import Navbar from '../../../../../components/Navbar';
import styles from "/Styles/Bookings.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Foot from "../../../../../components/foot";


function FlightPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(1); // Set to 1 for flights
  const router = useRouter();

  // Navigation functions
  const handleRedirect = (path, buttonId) => {
    setActiveButton(buttonId);
    router.push(`/tourist/mybookings/${path}`);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/booking/flights`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flights:', error);
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
          ) : flights.length === 0 ? (
            <p>No flights found</p>
          ) : (
            flights.map((flight) => (
              <div className={styles.bookingCard} key={flight._id}>
                <div className={styles.flightDetails}>
                  <h3>Flight Booking</h3>
                  <p>
                    <strong>Date of departure:</strong> {flight.details.from}
                  </p>
                  <p>
                    <strong>Airport of departure:</strong> {flight.details.fromAir}
                  </p>
                  <p>
                    <strong>Airport of arrival:</strong> {flight.details.toAir}
                  </p>
                  <p>
                    <strong>Price:</strong> ${flight.details.price}
                  </p>
                  <p>
                    <strong>Company Name:</strong> {flight.details.companyName}
                  </p>
                  <p>
                    <strong>Status:</strong> {flight.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
      <Foot />
    </div>
  );
}

// Add the cancel handler function


export default FlightPage;
