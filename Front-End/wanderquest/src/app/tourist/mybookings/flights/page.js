"use client";
import { useEffect, useState } from 'react';
import Navbar from '../../../../../components/Navbar';
import styles from "/Styles/Activities.module.css";

function FlightPage() {
  const [flights, setFlights] = useState([]);
  const id = '67310bdba3280f11a947c86d';
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(`http://localhost:4000/booking/flights/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFlights(data);
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

  return (<>        <Navbar />
    <div className={styles.container}>
    <h1>My Flights</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        flights.map((flight) => (
          <div className={styles.activity} key={flight._id}>
            <div className={styles.flightDetails}>
              <p>
                <strong>Date of departure:</strong> {flight.details.from}
              </p>
              <p>
                <strong>Airport of departure:</strong> {flight.details.fromAir}
              </p>
              <p>
                <strong>Airport of arrival:</strong> {flight.details.toAir}
              </p>
              <p>
                <strong>Price:</strong> ${flight.details.price}
              </p>
              <p>
                <strong>Company Name:</strong> {flight.details.companyName}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
    </>);
}

export default FlightPage;