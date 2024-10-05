import { useEffect, useState } from 'react';
import styles from '../styles/Itineraries.module.css';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/itineraries')
      .then(res => res.json())
      .then(data => {
        setItineraries(data);
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Itinerary List</h1>
      {itineraries.map((itinerary, index) => (
        <div key={index} className={styles.itinerary}>
          <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
          <div className={styles.activities}>
            {itinerary.activities.map((activity, index1) => (
              <div key={index1} className={styles.activity}>
                <h3>Activity{index1+1}</h3>
                <p><strong>Title:</strong> {activity.title}</p>
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Time:</strong> {activity.time}</p>
                <p><strong>Location:</strong> {activity.location}</p>
              </div>
            ))}
          </div>
          <div className={styles.locations}>
            {itinerary.locations.map((location1, index2) => (
              <p key={index2}><strong>Location:</strong> {location1}</p>
            ))}
          </div>
          <p><strong>Timeline:</strong> {itinerary.timeline}</p>
          <p><strong>Duration:</strong> {itinerary.duration}</p>
          <p><strong>Language:</strong> {itinerary.language}</p>
          <p><strong>Price:</strong> ${itinerary.price}</p>
          <div className={styles.dates}>
            {itinerary.availableDates.map((date, index3) => (
              <p key={index3} ><strong>Date:</strong> {date}</p>
            ))}
          </div>
          <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
          <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
          <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;
