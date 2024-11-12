"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Activities.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";

function activitypage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id1, setid] = useState('');
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/activities/${id1}}`)
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

  const fetchid = () => {
    fetch(`http://localhost:4000/tourist/touristId`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching itineraries: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            setid(data);
            setLoading(false);


        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
};
  useEffect(() => {
    fetchid();
}, []);
  const handlecancel = async (actid) => {
    const bookingId=actid;
    const userId=id1
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
    <h1>My Activities</h1>
    {activities.map((activity) => (
        <div key={activity._id} className={styles.activity}>
            <h3>{activity.details.category}</h3>
            <p>
                <strong>Price:</strong> {activity.details.price}<br />
                <strong>Time:</strong> {activity.details.time}<br />
                <label><strong>Location:</strong> {activity.details.location}</label><br />
                <strong>Start Date:</strong> {activity.startDate}<br />
                <strong>Special Discounts:</strong> {activity.details.specialDiscounts}<br />
                <strong>status:</strong> {activity.status}<br />
            </p>
            {activity.status === "cancelled" ?(<></>):(<button onClick={() => handlecancel(activity._id)}>Cancel Booking</button>)}
        </div>

))}
{activities.length === 0?(<>YOU have no activities</>):(null)}
    </>)
}

export default activitypage