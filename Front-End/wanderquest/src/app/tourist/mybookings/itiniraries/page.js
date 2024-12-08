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
  const [id1, setid] = useState('');

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

  const fetchActivityDetails = (activityId) => {
    if (activityDetails[activityId]) return; // Avoid refetching

    fetch(`http://localhost:4000/advertiser/activity/${activityId}`, {
      credentials: 'include', // Include credentials in the request
    })
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

  const fetchid = () => {
    fetch(`http://localhost:4000/tourist/touristId`, {
      credentials: 'include', // Include credentials in the request
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching itineraries: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setid(data);
        setLoading(false);

        // Fetch details for all activities
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchid();
  }, [id1]);

  const fetchData = () => {
    fetch(`http://localhost:4000/booking/itineraries/${id1}`, {
      credentials: 'include', // Include credentials in the request
    })
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
    const bookingId = actid;

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
      alert('Cancel successful!');
    } catch (error) {
      console.error('Error canceling activity:', error);
      alert('Cancel failed. Cannot cancel a booking within 48 hours of the start date.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id1]);






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
        <p><strong>Price:</strong> {itinerary.details.price * multiplier} {preferredCurrency}</p>
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

        {itinerary.status === "cancelled" ? (<></>) : (<button onClick={() => handlecancel(itinerary._id)}>Cancel Booking</button>)}


      </div>

    ))}

  </>)
}

export default ititpage