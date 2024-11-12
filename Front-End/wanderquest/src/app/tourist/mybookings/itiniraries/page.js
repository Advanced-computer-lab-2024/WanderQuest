"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/itineraries.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";

function ititpage() {
  const [activities, setActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState({});
  const [allItineraries, setAllItineraries] = useState([]);
  const [displayedItineraries, setDisplayedItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const id ='672fce1b259054c6c4871c33'


  const fetchActivityDetails = (activityId) => {
    if (activityDetails[activityId]) return; // Avoid refetching

    fetch(`http://localhost:4000/advertiser/activity/${activityId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching activity ${activityId}: ${res.statusText}`);
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
        setError(error.message);
      });
  };


  const fetchData = () => {
    fetch(`http://localhost:4000/booking/itineraries/67310bdba3280f11a947c86d`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllItineraries(data);
        setDisplayedItineraries(data);
        setTimeout(() => console.log("First"), 10000)
        setLoading(false);
        
        // Fetch details for all activities
        data.forEach(itinerary => {
          itinerary.details.activities.forEach(activityId => {
            fetchActivityDetails(activityId);
          });
        });
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
      alert('cancel successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('cancel failed,Cannot cancel a booking within 48 hours of the start date ');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  





  
  return (<>
    <Navbar></Navbar>

    {displayedItineraries.map((itinerary) => (
        <div id={itinerary.id} key={itinerary.details._id} className={styles.itinerary}>
          <h2 className={styles.itineraryTitle}>{itinerary.details.title}</h2>
          <div className={styles.activities}>
            {itinerary.details.activities.map((activityId) => (
              <div key={activityId} className={styles.activity}>
                {activityDetails[activityId] ? (
                  <>
                    <h3>Activity</h3>
                    <p><strong>Title:</strong> {activityDetails[activityId].title}</p>
                    <p><strong>Date:</strong> {activityDetails[activityId].date}</p>
                    <p><strong>Time:</strong> {activityDetails[activityId].time}</p>
                    <p><strong>Location:</strong> {activityDetails[activityId].location}</p>
                  </>
                ) : (
                  <p>Loading activity details...</p>
                )}
              </div>
            ))}
          </div>
          <div className={styles.locations}>
            {itinerary.details.locations.map((location, idx) => (
              <p key={idx}><strong>Location:</strong> {location}</p>
            ))}
          </div>
          <p><strong>Timeline:</strong> {itinerary.details.timeline}</p>
          <p><strong>Duration:</strong> {itinerary.details.duration}</p>
          <p><strong>Language:</strong> {itinerary.details.language}</p>
          <p><strong>Price:</strong> ${itinerary.details.price}</p>
          <p><strong>Rating:</strong> {itinerary.details.rating}</p>
          <div className={styles.dates}>
            {itinerary.details.availableDates.map((date, idx) => (
              <p key={idx}><strong>Date:</strong> {date}</p>
            ))}
          </div>
          <div className={styles.times}>
            {itinerary.details.time.map((time, idx) => (
              <p key={idx}><strong>Time:</strong> {time}</p>
            ))}
          </div>
          <p><strong>Accessibility:</strong> {itinerary.details.accessibility ? 'Yes' : 'No'}</p>
          <p><strong>Pick Up Location:</strong> {itinerary.details.pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {itinerary.details.dropOffLocation}</p>
          <p><strong>Booking Already Made:</strong> {itinerary.details.BookingAlreadyMade ? 'Yes' : 'No'}</p>
          <p><strong>status:</strong> {itinerary.status}</p>

          {itinerary.status === "cancelled" ?(<></>):(<button onClick={() => handlecancel(itinerary._id)}>Cancel Booking</button>)}
          
          
        </div>
        
      ))}

    </>)
}

export default ititpage