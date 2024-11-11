"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Activities.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";

function activitypage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const id ='672fce1b259054c6c4871c33'
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/activities/67310bdba3280f11a947c86d`)
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
    const bookingId=actid;
    const userId="67310bdba3280f11a947c86d"
    const cancel = { userId, bookingId }
    
    try {
      const response = await fetch('http://localhost:4000/booking/cancel', {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cancel),
      });
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('cancel failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  


  
  return (<>
    <Navbar></Navbar>
    {activities.map((activity) => (
    activity.status === "cancelled" ? (
        <></>
    ) : (
        <div key={activity.id} className={styles.activity}>
            <h3>{activity.details.category}</h3>
            <p>
                <strong>Price:</strong> {activity.details.price}<br />
                <strong>Time:</strong> {activity.details.time}<br />
                <label><strong>Location:</strong> {activity.details.location}</label><br />
                <strong>Start Date:</strong> {activity.startDate}<br />
                <strong>Special Discounts:</strong> {activity.details.specialDiscounts}<br />
            </p>
            <button onClick={() => handlecancel(activity._id)}>Cancel Booking</button>
        </div>
    )
))}

    </>)
}

export default activitypage