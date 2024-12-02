'use client'
import React, { useState, useEffect } from "react";
import Navbar from '../../../../../components/Navbar';
import styles from "/Styles/Activities.module.css";
function myhotels() {
    const [hotels, sethotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
      fetch(`http://localhost:4000/booking/hotels`, {
        credentials: 'include', // Automatically include user credentials
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          sethotels(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching hotels:', error);
          setLoading(false);
        });
    };
    

    
    useEffect(() => {
  
      fetchData();
    }, []); // No need for `id1` as a dependency, credentials will handle identification
    
    
    return (<>  <Navbar></Navbar>
        <div className={styles.container}>
    <h1>My Hotels</h1>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : (
            hotels.map((hotel) => (
              <div className={styles.activity} key={hotel._id}>
                <div className={styles.flightDetails}>
                  <p>
                    <strong>HotelName:</strong> {hotel.details.hotelName}
                  </p>
                  <p>
                    <strong>Rating:</strong> {hotel.details.rating}
                  </p>
                  <p>
                    <strong>Description:</strong> {hotel.details.description}
                  </p>
                  <p>
                    <strong>Price:</strong> {hotel.details.price ?(<>{hotel.details.price}</>):(<>none</>)}
                  </p>
                  <p>
                    <strong>stars:</strong> {hotel.details.stars}
                  </p>
                  <p>
                    <strong>checkInDate :</strong> {hotel.details.checkIn}
                  </p>
                  <p>
                    <strong>checkOut Date:</strong> {hotel.details.checkOut}
                  </p>
                 
                </div>
              </div>
            ))
          )}
        </div>
        </>);
}

export default myhotels