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
    fetch(`http://localhost:4000/tourist/upcomingPlaces/${id}`)
      .then(res => res.json())
      .then(data => {
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
          <h2 className="museum-name">{museum.title}</h2>
          <p className="museum-description">{museum.description}</p>
          <div className="museum-pictures">
            {museum.pictures?.map((pic, index) => (
              <img key={index} src={pic} alt="Museum" className="museum-image" />
            ))}
          </div>
          <p className="museum-location">{museum.location}</p>
          <div className="opening-hours">
            <h3>Opening Hours:</h3>
            <p>{museum.openingHours}</p>
          </div>
          <div className="ticket-prices">
            <h3>Ticket Prices:</h3>
            {museum.ticketPrices.map((cat, price) => (
                            <div key={cat}>
                                <p>{cat}: ${price}</p>
                                
                            </div>
                        ))}
          </div>
        
        </>
      )}
      <button onClick={share}>share</button>
    </>
  );
}

export default Page;
