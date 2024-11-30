'use client'
import React, { useEffect, useState } from 'react';
import styles from '/styles/Activities.module.css';
import Navbar from '../../../../../components/Navbar';

function Page({ params }) {
  const id = params.id;
  const [activity, setActivity] = useState(null);
  const [bookingType, setBookingType] = useState('activity');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id1, setid] = useState('');
  const share = () => {
    navigator.share({
      url: `http://localhost:3000/tourist/activity/${id}`,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/advertiser/activity/${id}`, {
        credentials: 'include', // Include credentials in the request
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setActivity(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Error fetching activity details.');
    } finally {
      setLoading(false);
    }
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
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchData();
    fetchid();
  }, [id1]);
  
  const handleBooking = async () => {
    const activityId = id;
  
    // User ID is fetched from the credentials in the cookies (handled by the backend)
    const act = { bookingType, activityId };
  
    try {
      const response = await fetch('http://localhost:4000/booking/activity', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(act),
        credentials: 'include', // Include credentials (cookies) in the request
      });
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('Booking failed, already booked');
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      {activity && (
        <div key={activity.id} className={styles.activity}>
          <h3>{activity.title}</h3>
          <p>
            <strong>Date:</strong> {activity.date}<br />
            <strong>Time:</strong> {activity.time}<br />
            <strong>Location:</strong>{' '}
            <a href='' target="_blank" rel="noopener noreferrer">
              {activity.location}
            </a><br />
            <strong>Price:</strong> {activity.price}<br />
            <strong>Category:</strong> {activity.category}<br />
            <strong>Tags:</strong> {Array.isArray(activity.tags) ? activity.tags.join(', ') : ''}<br />
            <strong>Special Discounts:</strong> {activity.specialDiscounts}<br />
            <strong>Booking Open:</strong> {activity.booking_open ? 'Yes' : 'No'}
            {activity.comments.map((Comment) => (<div>
              <strong>comment</strong> {Comment.touristId}<br />
              <strong>comment</strong> {Comment.comment}<br />
              <strong>comment</strong> {Comment.createdAt}<br />
            </div>
            ))}

          </p>
          <button onClick={share}>Share Link</button>
          {activity.bookingIsOpen ? (<button onClick={handleBooking}>Book</button>) : (<></>)}
        </div>
      )}
    </>
  );
}

export default Page;
