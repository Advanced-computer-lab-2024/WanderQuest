'use client'
import { useEffect, useState } from 'react';
import styles from "/Styles/Activities.module.css";
import Navbar from '../../../../components/Navbar';

function transportpage() {
  const[transportation,setTransportation]=useState([]);
  const[Loading,setLoading]=useState(true);
  const [id1, setid] = useState('');
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

  const handleBooking = async (company1,type1,price1,departure1,arrival1,date1,pickUpLocation1,dropOffLocation1) => {
    const userId=id1;
    const bookingType='transportation'
    const company=company1;
    const type=type1
    const price=price1
    const departure=departure1
    const arrival=arrival1
    const date=date1
    const pickUpLocation=pickUpLocation1
    const dropOffLocation=dropOffLocation1
    const act = { userId, bookingType, company, type, price, departure, arrival, date, pickUpLocation, dropOffLocation };
    console.log(act);
    try {
      const response = await fetch('http://localhost:4000/booking/transportation', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(act),
      });
      if (!response.ok) {
        throw new Error('Booking failed');
        console.log(act);
      }
      console.log(act);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking transportation:', error);
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
           <button onClick={()=>{handleBooking(transport.company,transport.type,transport.price,transport.departure,transport.arrival,transport.date,transport.pickUpLocation,transport.dropOffLocation)}}>Book</button>
          </div>
        </div>
    ))}

    </>)
}

export default transportpage;