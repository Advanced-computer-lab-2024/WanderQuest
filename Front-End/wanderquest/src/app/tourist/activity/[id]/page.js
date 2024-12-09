'use client'
import React, { useEffect, useState } from 'react';
import styles from '/styles/actdetail.module.css';
import Navbar from '../../../../../components/Navbar';

function Page({ params }) {
  const id = params.id;
  const [activity, setActivity] = useState(null);
  const [bookingType, setBookingType] = useState('activity');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id1, setid] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  useEffect(() => {
    const storedMultiplier = localStorage.getItem('multiplier');
    let multiplier = 1;
    console.log('Stored Multiplier:', storedMultiplier);
    if (storedMultiplier) {
      console.log('Setting Multiplier:', storedMultiplier);
      setMultiplier(storedMultiplier);
    }

    const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    console.log('Preferred Currency:', preferredCurrency);
    if (preferredCurrency) {
      setPreferredCurrency(preferredCurrency);
    }
  }, []);

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
        <div className={styles.activitydetails}>
          <div className={styles.header}>
            <h1 className={styles.title}>{activity.title}</h1>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Date</span>
              <span className={styles.value}>{activity.date}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Time</span>
              <span className={styles.value}>{activity.time}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Location</span>
              <a
                href={`https://maps.google.com/?q=${activity.location}`}
                className={`${styles.value} ${styles.locationLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activity.location} 📍
              </a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Price</span>
              <span className={styles.value}>{activity.price}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Category</span>
              <span className={styles.value}>{activity.category}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Tags</span>
              <span className={styles.value}>
                {Array.isArray(activity.tags) ? activity.tags.join(', ') : ''}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Special Discounts</span>
              <span className={styles.value}>{activity.specialDiscounts || 'None'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Booking Status</span>
              <span className={styles.value}>
                {activity.booking_open ? '✅ Open for Booking' : '❌ Currently Closed'}
              </span>
            </div>
          </div>

          <div className={styles.reviews}>
            <h2 className={styles.reviewsTitle}>Ratings & Reviews</h2>
            {(!activity.ratings.length && !activity.comments.length) ? (
              <div className={styles.review}>
                <p className={styles.value}>No reviews and ratings yet</p>
              </div>
            ) : (
              [...new Set([
                ...activity.ratings.map((rat) => rat.touristId),
                ...activity.comments.map((comm) => comm.touristId),
              ])].map((touristId, idx) => {
                const rating = activity.ratings.find((rat) => rat.touristId === touristId);
                const comment = activity.comments.find((comm) => comm.touristId === touristId);

                return (
                  <div className={styles.review} key={idx}>
                    <p className={styles.reviewHeader}>
                      Tourist {touristId}
                    </p>
                    {rating && (
                      <p className={`${styles.value} ${styles.rating}`}>
                        <strong>Rating:</strong>
                        <span className={styles.star}>{'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}</span>
                      </p>
                    )}
                    {comment && (
                      <p className={styles.value}>
                        <strong>Review:</strong> {comment.comment}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={share} className={`${styles.button} ${styles.shareButton}`}>
              Share Activity
            </button>
            {activity.bookingIsOpen && (
              <button onClick={handleBooking} className={`${styles.button} ${styles.bookButton}`}>
                Book Now
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
