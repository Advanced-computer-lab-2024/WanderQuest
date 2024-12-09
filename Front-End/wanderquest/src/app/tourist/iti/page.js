'use client'
import { useEffect, useState } from 'react';
import styles from '/Styles/Itineraries.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import { motion } from "framer-motion";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';



const ItineraryListpage = (Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const role = 'Tourist';
  const [activityDetails, setActivityDetails] = useState({});
  const [allItineraries, setAllItineraries] = useState([]);
  const [displayedItineraries, setDisplayedItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };


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

  const preferences = ["Historic Areas", "Beaches", "Family-Friendly", "Shopping"];
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Japanese", "Russian"];
  const share = () => {
    navigator.share({
      url: 'http://localhost:3000/tourist/iti'
    })
  }

  const fetchActivityDetails = (activityId) => {
    if (activityDetails[activityId]) return; // Avoid refetching

    fetch(`http://localhost:4000/advertiser/activity/${activityId}`, {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies)
      headers: {
        "Content-Type": "application/json", // Ensure headers are set correctly
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching activity ${activityId}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setActivityDetails(prevDetails => ({
          ...prevDetails,
          [activityId]: data,
        }));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchItineraries = () => {
    fetch('http://localhost:4000/tourist/upcomingItineraries', {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies)
      headers: {
        "Content-Type": "application/json", // Ensure headers are set correctly
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching itineraries: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setAllItineraries(data);
        setDisplayedItineraries(data);
        setTimeout(() => console.log("First"), 10000);
        setLoading(false);

        // Fetch details for all activities
        data.forEach(itinerary => {
          itinerary.activities.forEach(activityId => {
            fetchActivityDetails(activityId);
          });
        });
      })
      .catch(error => {
        setError(error.message);
        setTimeout(() => console.log("First"), 10000);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItineraries();

  }, []);

  useEffect(() => {

    handleSearch();
  }, [search]);
  const handleSearch = () => {
    const newprod = allItineraries.filter((prod) => {
      return search.toLowerCase() === '' ||
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        (prod.tags && prod.tags.some(tag => tag.type.toLowerCase() === search.toLowerCase()));
    });
    setDisplayedItineraries(newprod);  // Set the filtered museums based on search
  };
  const clearsearch = () => {
    setDisplayedItineraries(allItineraries);
  }
  // const l = () => {
  //   let filtered = allItineraries.filter((itinerary) => {
  //     const searchLower = search.toLowerCase();
  //     return (
  //       searchLower === '' ||
  //       itinerary.title.toLowerCase().includes(searchLower) ||
  //       itinerary.category.toLowerCase().includes(searchLower) ||
  //       (Array.isArray(itinerary.tags) && itinerary.tags.some(tag => tag.toLowerCase().includes(searchLower)))
  //     );
  //   });
  //   setDisplayedItineraries(filtered);
  // };

  const handleSortAsc = () => {
    const sorted = [...displayedItineraries].sort((a, b) => a.price - b.price);
    setDisplayedItineraries(sorted);
  };

  const handleSortDesc = () => {
    const sorted = [...displayedItineraries].sort((a, b) => b.price - a.price);
    setDisplayedItineraries(sorted);
  };

  const handleSortRatingAsc = () => {
    const sorted = [...displayedItineraries].sort((a, b) => a.rating - b.rating);
    setDisplayedItineraries(sorted);
  };

  const handleSortRatingDesc = () => {
    const sorted = [...displayedItineraries].sort((a, b) => b.rating - a.rating);
    setDisplayedItineraries(sorted);
  };

  const handlePreferenceChange = (preference) => {
    setSelectedPreferences(prevState =>
      prevState.includes(preference)
        ? prevState.filter(pref => pref !== preference)
        : [...prevState, preference]
    );
  };
  const handleApplyFilters = () => {
    let filtered = allItineraries.filter((itinerary) => {
      const withinBudget =
        (minBudget === '' || itinerary.price * multiplier >= parseFloat(minBudget)) &&
        (maxBudget === '' || itinerary.price * multiplier <= parseFloat(maxBudget));

      const withinDate =
        dateFilter === '' ||
        itinerary.availableDates.some(date => {
          const availableDate = new Date(date);
          const filterDate = new Date(dateFilter);
          return availableDate.toDateString() === filterDate.toDateString();
        });

      const matchesPreferences =
        selectedPreferences.length === 0 ||
        selectedPreferences.some(pref => itinerary.tags.includes(pref));

      const matchesLanguage =
        selectedLanguage === '' || itinerary.language === selectedLanguage; // Add language filter logic

      return withinBudget && withinDate && matchesPreferences && matchesLanguage;
    });

    setDisplayedItineraries(filtered);
  };



  const handleClearFilters = () => {
    setDateFilter('');
    setMinBudget('');
    setMaxBudget('');
    setSelectedPreferences([]);
    setDisplayedItineraries(allItineraries);
  };

  if (loading) {
    return <>
      <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
      <dotlottie-player style={{
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
      }}
        src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
    </>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <img src="/1.png" className={styles.travelplan} alt="iti" />
      <div className={styles.container}>
        {role === "Tourist" ? (
          <motion.div
            className={styles.searchcom}
            initial={{ y: 10 }}
            transition={{ duration: 1 }}
          >
            <input
              className={styles.productsearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for your next journey"
            />
          </motion.div>
        ) : (
          <></>
        )}
        <div className={styles.pageLayout}>
          <div className={styles.sidebar}>
            <h1>Filters</h1>
            <div className={styles.filterSection}>
              <h3>Date</h3>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className={styles.filterSection}>
              <h3>Budget</h3>
              <label htmlFor="min-budget">Min:</label>
              <input
                type="number"
                id="min-budget"
                placeholder="Min Budget"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <label htmlFor="max-budget">Max:</label>
              <input
                type="number"
                id="max-budget"
                placeholder="Max Budget"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>

            <div className={styles.filterSection}>
              <h3>Preferences</h3>
              {preferences.map((pref) => (
                <div key={pref}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPreferences.includes(pref)}
                      onChange={() => handlePreferenceChange(pref)}
                    />
                    {pref}
                  </label>
                </div>
              ))}
            </div>

            <div className={styles.filterSection}>
              <h3>Language</h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <button style={{ margin: '5px' }} onClick={handleApplyFilters}>Apply</button>
              <button style={{ margin: '5px' }} onClick={handleClearFilters}>Clear</button>
            </div>

            <div className={styles.filterSection}>
              <h3 style={{ marginBottom: '5px' }}>Sorting</h3>
              <button onClick={handleSortAsc} style={{ margin: '5px' }}>Price: Low to High</button>
              <button onClick={handleSortDesc} style={{ margin: '5px' }}>Price: High to Low</button>
              <button onClick={handleSortRatingAsc} style={{ margin: '5px' }}>Rating: Low to High</button>
              <button onClick={handleSortRatingDesc} style={{ margin: '5px' }}>Rating: High to Low</button>

            </div>
          </div>

          <div className={styles.itineraries}>
            {displayedItineraries.map((itinerary) => (
              <div
                id={itinerary.id}
                key={itinerary.id}
                className={styles.itinerary}
              >
                <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
                <div className={styles.activities}>
                  {itinerary.activities.map((activityId) => (
                    <div key={activityId} className={styles.activity}>
                      {activityDetails[activityId] ? (
                        <>
                          <h3>Activity</h3>
                          <p>
                            <strong>Title:</strong>{" "}
                            {activityDetails[activityId].title}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {activityDetails[activityId].date}
                          </p>
                          <p>
                            <strong>Time:</strong>{" "}
                            {activityDetails[activityId].time}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {activityDetails[activityId].location}
                          </p>
                        </>
                      ) : (
                        <p>Loading activity details...</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* <div className={styles.locationsContainer}>
                    <strong className={styles.locationsLabel}>Available locations:</strong>
                    <div className={styles.locations}>
                        {itinerary.locations && itinerary.locations.length > 0 ? (
                        <select className={styles.locationSelect}>
                            {itinerary.locations.map((location, idx) => (
                            <option key={idx} value={location}>
                                {location}
                            </option>
                            ))}
                        </select>
                        ) : (
                        <p>No available locations</p>
                        )}
                    </div>
                 </div> */}
                {/* <div className={styles.timelineCard}>
  <h3 className={styles.timelineTitle}>Timeline</h3>
  <div className={styles.timelineList}>
    {itinerary.timeline && itinerary.timeline.split(',').map((entry, idx) => (
      <div key={idx} className={styles.timelineEntry}>
        <strong>Day {idx + 1}:</strong> {entry.trim()}
      </div>
    ))}
  </div>
</div> */}
                <p>
                  <strong>Duration:</strong> {itinerary.duration}
                </p>
                <p>
                  <strong>Language:</strong> {itinerary.language}
                </p>
                <p>
                  <strong>Price:</strong> {itinerary.price * multiplier} {preferredCurrency}
                </p>
           
                {/* <div className={styles.datesContainer}>
                    <strong className={styles.datesLabel}>Available dates:</strong>
                    <div className={styles.dates}>
                        {itinerary.availableDates && itinerary.availableDates.length > 0 ? (
                        <select className={styles.dateSelect}>
                            {itinerary.availableDates.map((date, idx) => (
                            <option key={idx} value={date}>
                                {new Date(date).toLocaleDateString()}
                            </option>
                            ))}
                        </select>
                        ) : (
                        <p>No available dates</p>
                        )}
                    </div>
                 </div>
                 <div className={styles.timesContainer}>
                  <strong className={styles.timesLabel}>Available times:</strong>
                  <div className={styles.times}>
                    {itinerary.time && itinerary.time.length > 0 ? (
                      <select className={styles.timeSelect}>
                        {itinerary.time.map((time, idx) => (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>No available times</p>
                    )}
                  </div>
                </div>
                <p>
                  <strong>Accessibility:</strong>{" "}
                  {itinerary.accessibility ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Pick Up Location:</strong> {itinerary.pickUpLocation}
                </p>
                <p>
                  <strong>Drop Off Location:</strong> {itinerary.dropOffLocation}
                </p> */}
                {/* <p>
                  <strong>Booking Already Made:</strong>{" "}
                  {itinerary.BookingAlreadyMade ? "Yes" : "No"}
                </p> */}
                <p className={styles.productRating}>
                    {itinerary.rating && itinerary.rating > 0 ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating
                                name="text-feedback"
                                value={itinerary.rating}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <Typography sx={{ ml: 1 }}>{labels[itinerary.rating]}</Typography>
                        </Box>
                    ) : "No rating yet"}
                </p>
                <Link href={`iti/${itinerary._id}`} passHref>
                  <button className={styles.searchbtn}>View</button>
                </Link>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

};

export default ItineraryListpage;
