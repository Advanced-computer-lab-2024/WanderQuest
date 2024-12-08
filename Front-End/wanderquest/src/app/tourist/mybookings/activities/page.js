"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Activities.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";

function activitypage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id1, setid] = useState('67310bdba3280f11a947c86d');

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
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/activities`, {
      credentials: 'include', // Include credentials in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  };

  const handlecancel = async (actid) => {
    const bookingId = actid;
    // `id1` is no longer needed, the backend will use the credentials from the request.
    const cancel = { bookingId };

    try {
      const response = await fetch('http://localhost:4000/booking/cancel', {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cancel),
        credentials: 'include', // Include credentials in the request
      });
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      alert('Cancel was Successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('Cancel failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  // You don't need `id1` to be a dependency anymore



  return (<>
    <Navbar></Navbar>
    <h1>My Activities</h1>
    {activities.map((activity) => (
      <div key={activity._id} className={styles.activity}>
        <h3>{activity.details.category}</h3>
        <p>
          <strong>Price:</strong> {activity.details.price * multiplier} {preferredCurrency}<br />
          <strong>Time:</strong> {activity.details.time}<br />
          <label><strong>Location:</strong> {activity.details.location}</label><br />
          <strong>Start Date:</strong> {activity.startDate}<br />
          <strong>Special Discounts:</strong> {activity.details.specialDiscounts}<br />
          <strong>status:</strong> {activity.status}<br />
        </p>
        {activity.status === "cancelled" ? (<></>) : (<button onClick={() => handlecancel(activity._id)}>Cancel Booking</button>)}
      </div>

    ))}
    {activities.length === 0 ? (<>YOU have no activities</>) : (null)}
  </>)
}

export default activitypage