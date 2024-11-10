"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import styles from "/Styles/Flights.module.css";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const Amadeus = require("amadeus");

function BookingsPage() {
  const [activeButton, setActiveButton] = useState(2);
  const [originLocationCode, setOriginLocationCode] = useState('');
  const [destinationLocationCode, setDestinationLocationCode] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState('');
  const [flightOffers, setFlightOffers] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const router = useRouter();
  const amadeus = new Amadeus({
    clientId: "RvyPDMc2pf3vxqJ37qT61NpI9XzcQIUN",
    clientSecret: "w8VsTLzgtUBUr9ye",
  });

  const handleChangeColor = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleRedirect = () => {
    router.push('/tourist/Hotels');
  };

  const handleSearch = () => {
    setLoading(true); // Set loading to true when the search starts

    let requestParams = {
      originLocationCode: originLocationCode,
      destinationLocationCode: destinationLocationCode,
      departureDate: departureDate,
      adults: adults.toString(),
      max: 10,
    };

    if (returnDate) {
      requestParams.returnDate = returnDate;
    }

    amadeus.shopping.flightOffersSearch
      .get(requestParams)
      .then(function (response) {
        setFlightOffers(response.data);
        setLoading(false); // Set loading to false when data is received
        console.log(response.data);
      })
      .catch(function (responseError) {
        setLoading(false); // Set loading to false if there is an error
        console.log(responseError.code);
      });
  };

  const fetchSuggestions = (keyword, type) => {
    amadeus.referenceData.locations
      .get({ keyword, subType: "CITY" })
      .then((response) => {
        if (type === 'origin') {
          setOriginSuggestions(response.data);
        } else {
          setDestinationSuggestions(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlebooking=(price1,companyName)=>{
    const bookingType="flight";
    const userId=1;
    const flight= {userId, bookingType, originLocationCode, destinationLocationCode, price1, companyName};
    console.log('flight details:',flight);
    fetch('http://localhost:4000/booking/flight',{
      method:"POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(flight)
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
              onClick={() => {
                handleChangeColor(2);
              }}
              className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
            >
              Flights
            </button>
            <button
              onClick={() => {
                handleChangeColor(3);
              }}
              className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
            >
              Transportation
            </button>
          </div>
        </div>
        <h2 className={styles.welcome}>Where to next, Tourist?</h2>
        <div className={styles.welcome}>
          Wander freely, quest deeply – WanderQuest brings your travel dreams to life.
        </div>
      </div>
      <motion.div className={styles.searchbar} initial={{ y: -20 }} transition={{ duration: 1 }}>
        <input
          className={styles.input}
          style={{ marginLeft: "0", height: '41px' }}
          placeholder="From"
          type="text"
          value={originLocationCode}
          onChange={(e) => {
            setOriginLocationCode(e.target.value);
            fetchSuggestions(e.target.value, 'origin');
          }}
        />
        {originSuggestions.length > 0 && (
          <div className={styles.suggestions}>
            {originSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  setOriginLocationCode(suggestion.iataCode);
                  setOriginSuggestions([]); // Clear the suggestion list
                }}
                className={styles.suggestionItem}
              >
                {suggestion.name} ({suggestion.iataCode})
              </div>
            ))}
          </div>
        )}

        <input
          className={styles.input}
          style={{ marginLeft: "3px", height: '41px' }}
          placeholder="To"
          type="text"
          value={destinationLocationCode}
          onChange={(e) => {
            setDestinationLocationCode(e.target.value);
            fetchSuggestions(e.target.value, 'destination');
          }}
        />
        {destinationSuggestions.length > 0 && (
          <div className={styles.suggestions}>
            {destinationSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  setDestinationLocationCode(suggestion.iataCode);
                  setDestinationSuggestions([]); // Clear the suggestion list
                }}
                className={styles.suggestionItem}
              >
                {suggestion.name} ({suggestion.iataCode})
              </div>
            ))}
          </div>
        )}

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
          style={{ width: "80px", height: '40px' }}
          min='0'
          placeholder="Adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
        />
        <button onClick={handleSearch} className={styles.search}>Search</button>
      </motion.div>

      {/* Show loading message */}
      {loading && <div className={styles.loading}>Loading...</div>}

      {/* Display flight offers */}
      <div className={styles.form}>
        {flightOffers.map((offer, index) => {
          const { itineraries, price, validatingAirlineCodes } = offer;
          const [firstItinerary] = itineraries;
          const Airline = validatingAirlineCodes[0];
          const departureInfo = firstItinerary.segments[0].departure;
          const arrivalInfo = firstItinerary.segments[firstItinerary.segments.length - 1].arrival;

          // Format departure date and time
          const departureDate = new Date(departureInfo.at);
          const departureDay = String(departureDate.getDate()).padStart(2, '0');
          const departureMonth = String(departureDate.getMonth() + 1).padStart(2, '0');
          const departureYear = departureDate.getFullYear();
          const departureHours = String(departureDate.getHours()).padStart(2, '0');
          const departureMinutes = String(departureDate.getMinutes()).padStart(2, '0');
          const formattedDepartureDate = `${departureDay}/${departureMonth}/${departureYear}`;
          const formattedDepartureTime = `${departureHours}:${departureMinutes}`;

          // Format arrival date and time
          const arrivalDate = new Date(arrivalInfo.at);
          const arrivalDay = String(arrivalDate.getDate()).padStart(2, '0');
          const arrivalMonth = String(arrivalDate.getMonth() + 1).padStart(2, '0');
          const arrivalYear = arrivalDate.getFullYear();
          const arrivalHours = String(arrivalDate.getHours()).padStart(2, '0');
          const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, '0');
          const formattedArrivalDate = `${arrivalDay}/${arrivalMonth}/${arrivalYear}`;
          const formattedArrivalTime = `${arrivalHours}:${arrivalMinutes}`;
          const pricetotal=`${price.grandTotal}`
          return (
            <div key={index} className={styles.card}>
              <p>
                <strong>From:</strong> {departureInfo.iataCode} at {formattedDepartureDate} at {formattedDepartureTime}
              </p>
              <p>
                <strong>To:</strong> {arrivalInfo.iataCode} at {formattedArrivalDate} at {formattedArrivalTime}
              </p>
              <p>
                <strong>Price:</strong> {price.grandTotal} {price.currency}
              </p>
              <p>
                <strong>Airline:</strong> {Airline}
              </p>
              <button className={styles.button} onClick={()=>{handlebooking(pricetotal,Airline)}}>book</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingsPage;
