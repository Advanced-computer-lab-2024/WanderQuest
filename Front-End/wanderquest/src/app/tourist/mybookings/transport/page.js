'use client'
import { useEffect, useState } from 'react';
import styles from "/Styles/Activities.module.css";
import Navbar from '../../../../../components/Navbar';

function transportpage() {
  const [transportation, setTransportation] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [id1, setid] = useState('');
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/transportations`, {
      credentials: 'include', // Automatically include user credentials
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTransportation(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transportations:', error);
        setLoading(false);
      });
  };
  

  
  useEffect(() => {
    fetchData();

  }, []); // No need for `id1` as a dependency, credentials will handle identification
  


  return (<> <Navbar></Navbar>
    <div>transportpage</div>
    {transportation.map((transport) => (
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