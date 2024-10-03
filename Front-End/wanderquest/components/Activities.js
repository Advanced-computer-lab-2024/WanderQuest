import { useEffect, useState } from 'react';
import styles from '../styles/Activities.module.css';

const Activities = () => {
  const [activities, setActivities] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/activities') // Adjust the URL as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data for debugging
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading activities...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  if (!activities || activities.length === 0) {
    return <p className={styles.noActivities}>No activities available.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Activities</h1>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.activity}>
          <h3>{activity.name}</h3>
          <p>
            <strong>Date:</strong> {activity.date}<br />
            <strong>Time:</strong> {activity.time}<br />
            <strong>Location:</strong>{' '}
            <a href={activity.location.google_maps_link} target="_blank" rel="noopener noreferrer">
              {activity.location.name}
            </a><br />
            <strong>Price:</strong> 
            {typeof activity.price === 'object' 
              ? `${activity.price.min} - ${activity.price.max}` // Display the range
              : activity.price}<br />
            <strong>Category:</strong> {activity.category}<br />
            <strong>Tags:</strong> {Array.isArray(activity.tags) ? activity.tags.join(', ') : ''}<br />
            <strong>Special Discounts:</strong> {activity.special_discounts}<br />
            <strong>Booking Open:</strong> {activity.booking_open ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
