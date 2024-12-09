'use client'
import React, { useEffect, useState } from 'react';
import styles from '/styles/museumid.module.css';
import Navbar from '../../../../../components/Navbar';

function Page({ params }) {
  const [museum, setMuseum] = useState({});
  const [loading, setLoading] = useState(true);
  const id = params.id;
  const share=()=>{
    navigator.share({
        url:`http://localhost:3000/tourist/musuem/${id}`
    })
}
useEffect(() => {
  fetch(`http://localhost:4000/tourist/upcomingPlaces/${id}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Received museum data:', data); // Add this to debug
      setMuseum(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setMuseum({});
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      {museum && (
        <div className={styles.museumContainer}>
          <h2 className={styles.museumName}>{museum.title || 'No title available'}</h2>
          {museum.pictures && museum.pictures.length > 0 ? (
            <div className={styles.museumPictures}>
              {museum.pictures.map((pic, index) => (
                <img key={index} src={pic} alt={`Museum image ${index + 1}`} className={styles.museumImage} />
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}
          <p className={styles.museumDescription}>{museum.description || 'No description available'}</p>
          

          
          <p className={styles.museumLocation}>
            <i className="fas fa-map-marker-alt"></i>
            {museum.location || 'Location not available'}
          </p>
          
          <div className={styles.infoSection}>
            <h3>Opening Hours</h3>
            <p>{museum.openingHours || 'Opening hours not available'}</p>
          </div>
          
          <div className={styles.infoSection}>
            <h3>Ticket Prices</h3>
            {museum.ticketPrices && Array.isArray(museum.ticketPrices) && museum.ticketPrices.length > 0 ? (
              museum.ticketPrices.map((price, index) => (
                <div key={index} className={styles.ticketPriceItem}>
                  <span>{price.category || 'Category'}</span>
                  <span>${price.amount || 'N/A'}</span>
                </div>
              ))
            ) : (
              <p>No ticket prices available</p>
            )}
          </div>
        </div>
      )}
      <button className={styles.shareButton} onClick={share}>
        Share <i className="fas fa-share"></i>
      </button>
    </>
  );
  
}

export default Page;
