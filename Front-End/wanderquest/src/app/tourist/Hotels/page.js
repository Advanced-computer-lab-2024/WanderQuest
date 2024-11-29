"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import styles from "/Styles/Bookings.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import axios from 'axios';

function BookingsPage() {
  const [activeButton, setActiveButton] = useState(1);
  const [destinationLocationCode, setDestinationLocationCode] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState('');
  const [rooms, setRooms] = useState('');
  const [countryCodes, setcountryCodes] = useState('');
  const [hotels, setHotels] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(false);
  const [id1, setid] = useState('');
  const router = useRouter();

  const handleChangeColor = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleRedirect = () => {
    router.push('/tourist/Flights');
  };

  const handleSearch = async () => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel',
      params: { query: destinationLocationCode || 'new' }, // Use the input value or default to 'new'
      headers: {
        'x-rapidapi-key': 'e1a392507fmshecdc89915bffc3ap1e2e73jsna2ebabbc6faa',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    try {
      // First request to get entityId
      const response = await axios.request(options);
      const entityId = response.data.data[0].entityId;
      console.log('Entity ID:', entityId);

      setcountryCodes(entityId);

      // Second request to get hotels
      const hotelOptions = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          entityId: entityId,
          checkin: departureDate,
          checkout: returnDate,
          adults: adults,
          rooms: rooms,
          limit: '10',
          sorting: '-relevance',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US'
        },
        headers: {
          'x-rapidapi-key': 'e1a392507fmshecdc89915bffc3ap1e2e73jsna2ebabbc6faa',
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
      };

      const hotelResponse = await axios.request(hotelOptions);
      console.log('Hotel Response:', hotelResponse.data);
      setHotels(hotelResponse.data); // Store the entire response

    } catch (error) {
      console.error('Error fetching data:', error);
      setHotels(null); // Reset hotels on error
    } finally {
      setLoading(false);
    }
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

        // Fetch details for all activiti
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchid();
  }, [id1]);

  const handlebooking = (hotelName, stars, rating, description, price1,) => {
    const bookingType = "hotel";
    const price = price1;
    const userId = id1;
    const checkIn = departureDate;
    const checkOut = returnDate;
    const hotel = { userId, bookingType, hotelName, rating, description, price, stars, checkIn, checkOut }
    console.log('hotel details:', hotel);
    fetch('http://localhost:4000/booking/hotel', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotel)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      return response.json();
    })
      .then(() => {
        alert('Booking has been made successfully!');
      })
      .catch(error => {
        console.error('Error booking itinerary:', error);
        alert('Booking failed. Please try again.');
      });
  }



  return (
    <div className={styles.all}>
      <Navbar />
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.navbtns}>
            <button
              onClick={() => {
                handleChangeColor(1);
                handleRedirect();
              }}
              className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ""}`}
            >
              Hotels
            </button>
            <button
              onClick={() => { handleChangeColor(2); handleRedirect() }}
              className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
            >
              Flights
            </button>
            <button
              onClick={() => handleChangeColor(3)}
              className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
            >
              Transportation
            </button>
          </div>
        </div>
        <h2 className={styles.welcome}>Where to next, Hadwa?</h2>
        <div className={styles.welcome}>
          Wander freely, quest deeply – WanderQuest brings your travel dreams to life.
        </div>
      </div>

      <motion.div
        className={styles.searchbar}
        initial={{ y: -20 }}
        transition={{ duration: 1 }}
      >
        <input
          className={styles.input}
          style={{ marginLeft: "3px", height: '41px' }}
          placeholder="To"
          type="text"
          value={destinationLocationCode}
          onChange={(e) => setDestinationLocationCode(e.target.value)}
        />

        <input
          className={styles.input}
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />

        <input
          className={styles.input}
          style={{ height: '41px' }}
          placeholder="Return Date"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <input
          className={styles.input}
          style={{ width: "60px", height: '40px' }}
          min='0'
          placeholder="Adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
        />

        <input
          className={styles.input}
          style={{ width: "80px", height: '40px' }}
          min='0'
          placeholder="rooms"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />

        <button onClick={handleSearch} className={styles.search}>
          Search
        </button>
      </motion.div>



      <div className={styles.form}>
        {hotels && hotels.data && hotels.data.hotels ? (
          hotels.data.hotels.map((hotel, index) => (
            <div key={index} className={styles.card}>
              {hotel.heroImage && (
                <img
                  src={hotel.heroImage}
                  alt={hotel.name || 'Hotel'}
                  className={styles.hotelImage}
                />
              )}
              <h3>{hotel.name || 'Unnamed Hotel'}</h3>
              {hotel.stars && <p><strong>Stars:</strong> {hotel.stars} Stars</p>}
              {hotel.price && <p><strong>Price:</strong> {hotel.price} per night</p>}
              {hotel.distance && <p><strong>Distance:</strong> {hotel.distance}</p>}
              {hotel.relevantPoiDistance && (
                <p><strong>Relevant Location:</strong> {hotel.relevantPoiDistance}</p>
              )}
              {hotel.rating && (
                <p><strong>Rating:</strong> {hotel.rating.value}</p>
              )}
              {hotel.exclusiveDealLabel && (
                <p><strong>Exclusive Deal:</strong> {hotel.exclusiveDealLabel}</p>
              )}
              {hotel.priceDescription && (
                <p><strong>Price Description:</strong> {hotel.priceDescription}</p>
              )}
              <button className={styles.button} onClick={() => { handlebooking(hotel.name, hotel.stars, hotel.rating.value, hotel.rating.description, hotel.priceDescription) }}>book</button>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            {loading ? 'Searching for hotels...' : ' Try searching for a destination.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;