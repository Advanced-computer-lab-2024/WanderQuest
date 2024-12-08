'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Make sure this import exists
import styles from "/Styles/transport.module.css";
import Navbar from '../../../../components/Navbar';
import { motion } from "framer-motion";
function transportpage() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState(3);
  const [transportation, setTransportation] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    passengers: ''
  });
  const [filteredTransportation, setFilteredTransportation] = useState([]);


  const [multiplier, setMultiplier] = useState(1);
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  useEffect(() => {
    const fetchPaymentMultiplier = async () => {
      try {
        const response = await fetch('http://localhost:4000/payment/getPaymentMultiplier', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Automatically include credentials (user session)
        });

        if (response.ok) {
          const result = await response.json();
          setMultiplier(result.multiplier);
          setPreferredCurrency(result.currency);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    fetchPaymentMultiplier();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = transportation.filter(transport => {
      const matchFrom = transport.pickUpLocation.toLowerCase().includes(searchParams.from.toLowerCase());
      const matchTo = transport.dropOffLocation.toLowerCase().includes(searchParams.to.toLowerCase());
      const transportDate = new Date(transport.date);
      const searchStartDate = searchParams.startDate ? new Date(searchParams.startDate) : null;

      return matchFrom && matchTo && (!searchStartDate || transportDate >= searchStartDate);
    });
    setFilteredTransportation(filtered);
  };


  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    setFilteredTransportation(transportation);
  }, [transportation]);
  const handleChangeColor = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleRedirect = () => {
    router.push('/tourist/Flights');
  };

  const handleRedirect1 = () => {
    router.push('/tourist/Hotels');
  };

  const handleRedirectTransport = () => {
    router.push('/tourist/Transportation');
  };




  const fetchData = () => {
    fetch(`http://localhost:4000/advertiser/transportations`, {
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

  const handleBooking = async (company1, type1, price1, departure1, arrival1, date1, pickUpLocation1, dropOffLocation1) => {
    // Credentials will determine the user automatically
    const bookingType = 'transportation';
    const company = company1;
    const type = type1;
    const price = price1;
    const departure = departure1;
    const arrival = arrival1;
    const date = date1;
    const pickUpLocation = pickUpLocation1;
    const dropOffLocation = dropOffLocation1;

    const act = {
      bookingType: 'transportation',
      company: company1,
      type: type1,
      price: parseFloat(price1), // Ensure price is a number
      departure: departure1,
      arrival: arrival1,
      date: new Date(date1).toISOString(), // Convert to ISO string if required
      pickUpLocation: pickUpLocation1,
      dropOffLocation: dropOffLocation1,
    };

    console.log('Sending act:', act);

    try {
      const response = await fetch('http://localhost:4000/booking/transportation', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(act),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error('Booking failed');
      }

      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking transportation:', error);
      alert('Booking failed, already booked');
    }

  };


  return (<><Navbar></Navbar>

    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.navbtns}>
          <button
            onClick={() => {
              handleChangeColor(1);
              handleRedirect1();
            }}
            className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ""}`}
          >
            Hotels
          </button>
          <button
            onClick={() => {
              handleChangeColor(2);
              handleRedirect();
            }}
            className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
          >
            Flights
          </button>
          <button
            onClick={() => {
              handleChangeColor(3);
              handleRedirectTransport();
            }}
            className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
          >
            Transportation
          </button>
        </div>
      </div>
      <h2 className={styles.welcome}>Where to next, Sakarta7?</h2>
      <div className={styles.welcomeq}>
        Wander freely, quest deeply – WanderQuest brings your travel dreams to life.
      </div>
    </div>

    <motion.div className={styles.searchbar} initial={{ y: -230 }} transition={{ duration: 1 }}>
      <input
        className={styles.input}
        style={{ marginLeft: "0", height: '41px' }}
        placeholder="From"
        type="text"
        name="from"
        value={searchParams.from}
        onChange={handleSearchChange}
      />

      <input
        className={styles.input}
        style={{ marginLeft: "3px", height: '41px' }}
        placeholder="To"
        type="text"
        name="to"
        value={searchParams.to}
        onChange={handleSearchChange}
      />

      <input
        className={styles.input}
        type="date"
        placeholder="Start Date"
        name="startDate"
        value={searchParams.startDate}
        onChange={handleSearchChange}
      />

      <input
        className={styles.input}
        style={{ height: '41px' }}
        placeholder="End Date"
        type="date"
        name="endDate"
        value={searchParams.endDate}
        onChange={handleSearchChange}
      />

      <input
        className={styles.input}
        style={{ width: "80px", height: '40px' }}
        min='0'
        placeholder="Passengers"
        type="number"
        name="passengers"
        value={searchParams.passengers}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch} className={styles.search}>Search</button>
    </motion.div>




    <div className={styles.transportGrid}>
      {filteredTransportation.map((transport) => (
        <div className={styles.card} key={transport._id}>
          <div className={styles.cardHeader}>
            <div className={styles.busIcon}>🚌</div>
            <div className={styles.routeName}>{transport.company} ({transport.type})</div>
          </div>

          <div className={styles.timelineContainer}>
            <div className={styles.departureInfo}>
              <div className={styles.time}>{transport.departure}</div>
              <div className={styles.location}>{transport.pickUpLocation}</div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.duration}>{new Date(transport.date).toLocaleDateString()}</div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.arrivalInfo}>
              <div className={styles.time}>{transport.arrival}</div>
              <div className={styles.location}>{transport.dropOffLocation}</div>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.price}>{transport.price * multiplier} {preferredCurrency}</div>
            <button
              className={styles.buyButton}
              onClick={() => handleBooking(
                transport.company,
                transport.type,
                transport.price,
                transport.departure,
                transport.arrival,
                transport.date,
                transport.pickUpLocation,
                transport.dropOffLocation
              )}
            >
              BUY TICKETS
            </button>
          </div>
        </div>
      ))}
    </div>

  </>)
}

export default transportpage;