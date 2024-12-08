'use client'
import React, { useEffect, useState } from 'react';
import styles from '/styles/museum.css';
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
        <>
          <h2 className="museum-name">{museum.title || 'No title available'}</h2>
          <p className="museum-description">{museum.description || 'No description available'}</p>
          
          {museum.pictures && museum.pictures.length > 0 ? (
            <div className="museum-pictures">
              {museum.pictures.map((pic, index) => (
                <img key={index} src={pic} alt={`Museum image ${index + 1}`} className="museum-image" />
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}
          
          <p className="museum-location">{museum.location || 'Location not available'}</p>
          
          <div className="opening-hours">
            <h3>Opening Hours:</h3>
            <p>{museum.openingHours || 'Opening hours not available'}</p>
          </div>
          
          <div className="ticket-prices">
            <h3>Ticket Prices:</h3>
            {museum.ticketPrices && Array.isArray(museum.ticketPrices) && museum.ticketPrices.length > 0 ? (
              museum.ticketPrices.map((price, index) => (
                <div key={index}>
                  <p>{price.category || 'Category'}: ${price.amount || 'N/A'}</p>
                </div>
              ))
            ) : (
              <p>No ticket prices available</p>
            )}
          </div>
        </>
      )}
      <button onClick={share}>share</button>
    </>
  );
}

export default Page;
