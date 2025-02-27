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
  const images ={'Eiffel Tower':'/eiflle.jpg',
  'Pyramids of Giza':'/pyramids.jpg',
  'Taj Mahal ':'/m.jpg',
  'Sydney Opera House ':'/sydney.jpg',
  'The Great Egyptian Museum ':'/egy.jpg'
  
  };
  const cat = ['students', 'locals', 'foreigners'];
  return (
    <>
      <Navbar />
      {museum && (
        <div className={styles.museumContainer}>
          <h2 className={styles.museumName}>{museum.title || 'No title available'}</h2>
          
            <div className={styles.museumPictures}>
             
                <img src={images[museum.title]}  className={styles.museumImage} />
            
            </div>
       
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
                  <span>{cat[index]}</span>
                  <span>${price}</span>
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
