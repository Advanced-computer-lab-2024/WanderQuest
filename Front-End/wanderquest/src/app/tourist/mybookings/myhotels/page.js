'use client'
import React, { useState, useEffect } from "react";
import Navbar from '../../../../../components/Navbar';
import styles from "/Styles/Activities.module.css";
function myhotels() {
    const [hotels, sethotels] = useState([]);
    const id = '67310bdba3280f11a947c86d';
    const [loading, setLoading] = useState(true);
  
    const fetchData = () => {
      fetch(`http://localhost:4000/booking/hotels/${id}`)
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
          console.error('Error fetching flights:', error);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
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
                    <strong>Price:</strong> {hotel.details.price}
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