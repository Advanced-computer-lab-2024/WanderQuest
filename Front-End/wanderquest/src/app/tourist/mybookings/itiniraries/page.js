"use client";
import React, { useState, useEffect } from "react";
import styles from "/Styles/Activities.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from "../../../../../components/Navbar";

function ititpage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const id ='672fce1b259054c6c4871c33'
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/itineraries//67310bdba3280f11a947c86d`)
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
      alert('cancel successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('cancel failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
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

const fetchItineraries = () => {
    fetch(`http://localhost:4000/tourist/upcomingItineraries/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching itineraries: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            setAllItineraries(data);
            setLoading(false);

            // Fetch details for all activities
            if (data.activities) {
                data.activities.forEach(activityId => {
                    fetchActivityDetails(activityId);
                });
            }
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
};

useEffect(() => {
    fetchItineraries();
}, []);

  
  return (<>
    <Navbar></Navbar>

    {displayedItineraries.map((itinerary) => (
        <div id={itinerary.id} key={itinerary.id} className={styles.itinerary}>
          <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
          <div className={styles.activities}>
            {itinerary.activities.map((activityId) => (
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
            {itinerary.locations.map((location, idx) => (
              <p key={idx}><strong>Location:</strong> {location}</p>
            ))}
          </div>
          <p><strong>Timeline:</strong> {itinerary.timeline}</p>
          <p><strong>Duration:</strong> {itinerary.duration}</p>
          <p><strong>Language:</strong> {itinerary.language}</p>
          <p><strong>Price:</strong> ${itinerary.price}</p>
          <p><strong>Rating:</strong> {itinerary.rating}</p>
          <div className={styles.dates}>
            {itinerary.availableDates.map((date, idx) => (
              <p key={idx}><strong>Date:</strong> {date}</p>
            ))}
          </div>
          <div className={styles.times}>
            {itinerary.time.map((time, idx) => (
              <p key={idx}><strong>Time:</strong> {time}</p>
            ))}
          </div>
          <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
          <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
          <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
          <Link href={`iti/${itinerary._id}`} className={styles.addticket}>
              view
          </Link>
          <p>{itinerary.id}</p>
          
          
          
        </div>
        
      ))}

    </>)
}

export default ititpage