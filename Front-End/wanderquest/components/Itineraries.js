import { useEffect, useState } from 'react';
import styles from '../styles/Itineraries.module.css';
import React from 'react';

// components/ItineraryList.js
// components/ItineraryList.js
import axios from 'axios';


const ItineraryList = () => {
  const [itineraries, setItineraries] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/itineraries');
        setItineraries(response.data.itineraries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Itinerary List</h1>
      {itineraries && itineraries.map((itinerary, index) => (
        <div key={index}>
          <h2>{itinerary.title}</h2>
          <ul>
            {itinerary.activities.map((activity, activityIndex) => (
              <li key={activityIndex}>
                <h3>{activity.name}</h3>
                <p>
                  Location: {activity.location.name} ({activity.location.google_maps_link})
                </p>
                <p>Timeline: {activity.timeline}</p>
                <p>Duration: {activity.duration}</p>
                <p>Language: {activity.language}</p>
                <p>Price: ${activity.price.fixed}</p>
                <p>Available Dates: {activity.available_dates.join(', ')}</p>
                <p>Accessibility: {activity.accessibility}</p>
                <p>Pickup/Dropoff: {activity.pickup_dropoff}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;