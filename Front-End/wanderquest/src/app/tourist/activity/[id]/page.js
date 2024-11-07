'use client'
import React, { useEffect, useState } from 'react';
import styles from '/styles/Activities.module.css';
import Navbar from '../../../../../components/Navbar';

function Page({ params }) {
  const id = params.id;
  const [activity, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const share=()=>{
    navigator.share({
        url:`http://localhost:3000/tourist/activity/${id}`
    })
}
  const fetchData = () => {
    fetch(`http://localhost:4000/advertiser/activity/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Navbar></Navbar>
      {activity && (
        <div key={activity.id} className={styles.activity}>
          <h3>{activity.title}</h3>
          <p>
            <strong>Date:</strong> {activity.date}<br />
            <strong>Time:</strong> {activity.time}<br />
            <strong>Location:</strong>{' '}
            <a href={activity.location} target="_blank" rel="noopener noreferrer">
              {activity.location}
            </a><br />
            <strong>Price:</strong> {activity.price}<br />
            <strong>Category:</strong> {activity.category}<br />
            <strong>Tags:</strong> {Array.isArray(activity.tags) ? activity.tags.join(', ') : ''}<br />
            <strong>Special Discounts:</strong> {activity.specialDiscounts}<br />
            <strong>Booking Open:</strong> {activity.booking_open ? 'Yes' : 'No'}
            <button onClick={share}>share link</button>
          </p>
        </div>
      )}
    </>
  );
}

export default Page;
