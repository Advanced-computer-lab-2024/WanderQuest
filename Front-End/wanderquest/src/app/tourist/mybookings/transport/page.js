'use client'
import { useEffect, useState } from 'react';
import styles from "/Styles/Activities.module.css";
import Navbar from '../../../../../components/Navbar';

function transportpage() {
  const[transportation,setTransportation]=useState([]);
  const[Loading,setLoading]=useState(true);
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/transportations/67310bdba3280f11a947c86d`)
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



  return (<> <Navbar></Navbar>
    <div>transportpage</div>
    {transportation.map((transport)=>(
          <div className={styles.activity} key={transport._id}>
          <div className={styles.flightDetails}>
            <p>
              <strong>Compnay Name:</strong> {transport.details.company}
            </p>
            <p>
              <strong>Type:</strong> {transport.details.type}
            </p>
            <p>
              <strong>Price:</strong> {transport.details.price}
            </p>
            <p>
              <strong>Departure:</strong> {transport.details.departure}
            </p>
            <p>
              <strong>Arrival:</strong> {transport.details.arrival}
            </p>
            <p>
              <strong>Date:</strong> {transport.details.transportationDate}
            </p>
            <p>
              <strong>Booking AlreadyMade:</strong> {transport.details.bookingAlreadyMade}
            </p>
            <p>
              <strong>PickUpLocation:</strong> {transport.details.pickUpLocation}
            </p>
            <p>
              <strong>DropOffLocatione:</strong> {transport.details.dropOffLocation}
            </p>
          </div>
        </div>
    ))}

    </>)
}

export default transportpage;