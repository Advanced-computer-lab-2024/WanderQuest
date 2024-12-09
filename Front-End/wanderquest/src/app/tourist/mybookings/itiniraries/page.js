"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Bookings.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";
import Foot from "../../../../../components/foot";


function ItinerariesPage() {
  const [allItineraries, setAllItineraries] = useState([]);
  const [activityDetails, setActivityDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(4); // Set to 4 for itineraries
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

  const fetchActivityDetails = (activityId) => {
    if (activityDetails[activityId]) return;

    fetch(`http://localhost:4000/advertiser/activity/${activityId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching activity ${activityId}`);
        }
        return res.json();
      })
      .then(data => {
        setActivityDetails(prevDetails => ({
          ...prevDetails,
          [activityId]: data,
        }));
      })
      .catch(error => {
        console.error('Error fetching activity details:', error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/booking/itineraries`, {
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllItineraries(data);
        setLoading(false);

        // Fetch details for all activities
        data.forEach(itinerary => {
          itinerary.details.activities.forEach(activityId => {
            fetchActivityDetails(activityId);
          });
        });
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (itineraryId) => {
    try {
      const response = await fetch('http://localhost:4000/booking/cancel', {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: itineraryId }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Cancel failed');
      }

      alert('Cancel successful!');
      // Update the UI to reflect the cancellation
      setAllItineraries(prevItineraries =>
        prevItineraries.map(itinerary =>
          itinerary._id === itineraryId
            ? { ...itinerary, status: "cancelled" }
            : itinerary
        )
      );
    } catch (error) {
      console.error('Error canceling itinerary:', error);
      alert('Cancel failed');
    }
  };

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
          ) : error ? (
            <p>Error: {error}</p>
          ) : allItineraries.length === 0 ? (
            <p>No itineraries found</p>
          ) : (
            allItineraries.map((itinerary) => (
              <div key={itinerary._id} className={styles.bookingCard}>
                <h3>{itinerary.details.title}</h3>
                <p><strong>Duration:</strong> {itinerary.details.duration}</p>
                <p><strong>Language:</strong> {itinerary.details.language}</p>
                <p><strong>Price:</strong> {itinerary.details.price * multiplier} {preferredCurrency}</p>
                <p><strong>Rating:</strong> {itinerary.details.rating}</p>
                <p><strong>Status:</strong> {itinerary.status}</p>

                <div className={styles.activities}>
                  <h4>Activities:</h4>
                  {itinerary.details.activities.map((activityId) => (
                    <div key={activityId}>
                      {activityDetails[activityId] ? (
                        <>
                          <p>{activityDetails[activityId].title}</p>
                          <p>Time: {activityDetails[activityId].time}</p>
                          <p>Location: {activityDetails[activityId].location}</p>
                        </>
                      ) : (
                        <p>Loading activity details...</p>
                      )}
                    </div>
                  ))}
                </div>

                {itinerary.status !== "cancelled" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancel(itinerary._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
      <Foot />
    </div>
  );
}

export default ItinerariesPage;