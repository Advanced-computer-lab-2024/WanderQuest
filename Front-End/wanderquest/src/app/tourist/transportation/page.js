'use client'
import { useEffect, useState } from 'react';
import styles from "/Styles/Activities.module.css";
import Navbar from '../../../../components/Navbar';

function transportpage() {
  const[transportation,setTransportation]=useState([]);
  const[Loading,setLoading]=useState(true);
  const fetchData = () => {
    fetch(`http://localhost:4000/advertiser/transportations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTransportation(data);
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

  const handleBooking = async () => {
    const activityId=id;
    const act = { userId, bookingType, activityId };
    
    try {
      const response = await fetch('http://localhost:4000/booking/activity', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(act),
      });
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking activity:', error);
      alert('Booking failed, already booked ');
    }
  };


  return (<><Navbar></Navbar>
    <div>transportpage</div>
    {transportation.map((transport)=>(
          <div className={styles.activity} key={transport._id}>
          <div className={styles.flightDetails}>
            <p>
              <strong>Compnay Name:</strong> {transport.company}
            </p>
            <p>
              <strong>Type:</strong> {transport.type}
            </p>
            <p>
              <strong>Price:</strong> {transport.price}
            </p>
            <p>
              <strong>Departure:</strong> {transport.departure}
            </p>
            <p>
              <strong>Arrival:</strong> {transport.arrival}
            </p>
            <p>
              <strong>Date:</strong> {transport.date}
            </p>
            <p>
              <strong>Booking AlreadyMade:</strong> {transport.bookingAlreadyMade}
            </p>
            <p>
              <strong>PickUpLocation:</strong> {transport.pickUpLocation}
            </p>
            <p>
              <strong>DropOffLocatione:</strong> {transport.dropOffLocation}
            </p>
            {transport.bookingAlreadyMade ?(<button onClick={handleBooking}>Book</button>):(<></>)}
          </div>
        </div>
    ))}

    </>)
}

export default transportpage;