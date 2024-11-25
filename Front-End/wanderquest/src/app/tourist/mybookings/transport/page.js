'use client'
import { useEffect, useState } from 'react';
import styles from "/Styles/Activities.module.css";
import Navbar from '../../../../../components/Navbar';

function transportpage() {
  const[transportation,setTransportation]=useState([]);
  const[Loading,setLoading]=useState(true);
  const [id1, setid] = useState('');
  const fetchData = () => {
    fetch(`http://localhost:4000/booking/transportations/${id1}`)
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
  const fetchid = () => {
    fetch(`http://localhost:4000/tourist/touristId`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching itineraries: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            setid(data);
            setLoading(false);

            // Fetch details for all activities
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
};
  useEffect(() => {
    fetchData();
    fetchid();
  }, [id1]);



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