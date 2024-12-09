"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Bookings.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";
import Foot from "../../../../../components/foot";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(3); // Set to 3 for activities
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
    fetch(`http://localhost:4000/booking/activities`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (activityId) => {
    try {
      const response = await fetch('http://localhost:4000/booking/cancel', {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: activityId }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Cancel failed');
      }

      alert('Cancel was Successful!');
      // Refresh activities after cancellation
      const updatedActivities = activities.map(activity =>
        activity._id === activityId
          ? { ...activity, status: "cancelled" }
          : activity
      );
      setActivities(updatedActivities);
    } catch (error) {
      console.error('Error canceling activity:', error);
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
          ) : activities.length === 0 ? (
            <p>No activities found</p>
          ) : (
            activities.map((activity) => (
              <div key={activity._id} className={styles.bookingCard}>
                <h3>{activity.details.category}</h3>
                <p><strong>Price:</strong> {activity.details.price * multiplier} {preferredCurrency}</p>
                <p><strong>Time:</strong> {activity.details.time}</p>
                <p><strong>Location:</strong> {activity.details.location}</p>
                <p><strong>Start Date:</strong> {activity.startDate}</p>
                <p><strong>Special Discounts:</strong> {activity.details.specialDiscounts}</p>
                <p><strong>Status:</strong> {activity.status}</p>
                {activity.status !== "cancelled" && (
                  <button
                    className={styles.button}
                    onClick={() => handleCancel(activity._id)}
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

export default ActivityPage;