'use client'
import { useEffect, useState } from 'react';
import styles from '/Styles/Itineraries.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import { motion } from "framer-motion";
import * as React from 'react';
import { Rating, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';

const ItineraryListpage = (Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const role = 'Tourist';
  const [activityDetails, setActivityDetails] = useState({});
  const [allItineraries, setAllItineraries] = useState([]);
  const [displayedItineraries, setDisplayedItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const labels = {

  };


  const [multiplier, setMultiplier] = useState(1);
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  useEffect(() => {
    const storedMultiplier = localStorage.getItem('multiplier');
    let multiplier = 1;
    console.log('Stored Multiplier:', storedMultiplier);
    if (storedMultiplier) {
      console.log('Setting Multiplier:', storedMultiplier);
      setMultiplier(storedMultiplier);
    }

    const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    console.log('Preferred Currency:', preferredCurrency);
    if (preferredCurrency) {
      setPreferredCurrency(preferredCurrency);
    }
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
  }, [searchQuery]);
  const handleSearch = () => {
    const newprod = allItineraries.filter((prod) => {
      return searchQuery.toLowerCase() === '' ||
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.tags && prod.tags.some(tag => tag.type.toLowerCase() === searchQuery.toLowerCase()));
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

  const images = {
    'Adventure and Relaxation Tour': '/australia.jpg',
    'Winter Wonderlands': '/winter.jpg',
    'Nature and Wildlife Tours': '/wallpaper.jpg',
    'Japan Cultural Journey': '/japan1.jpg'
 
  };

  return (
    <>
      <Navbar></Navbar>
      <img src="/1.png" className={styles.travelplan} alt="iti" />

      <div className={styles.container}>
        {role === "Tourist" ? (
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for your next journey"
            />
            <select 
              className={styles.sortSelect}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'price_asc') handleSortAsc();
                else if (value === 'price_desc') handleSortDesc();
                else if (value === 'rating_asc') handleSortRatingAsc();
                else if (value === 'rating_desc') handleSortRatingDesc();
              }}
            >
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_asc">Rating: Low to High</option>
              <option value="rating_desc">Rating: High to Low</option>
            </select>
          </div>
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

           
          </div>
                  
          <div className={styles.itineraries}>
            {displayedItineraries.map((itinerary) => (
              <div
                id={itinerary._id}
                key={itinerary._id}
                className={styles.itinerary}
              >
                <img
                  src={images[itinerary.title]}
                  alt={itinerary.title}
                  className={styles.itinerary_pic}
                />
                <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
               
                  <div className={styles.itineraryDetails}>
                   <div className={styles.section1}> 
                    <p>
                      <LocationOnIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                      {itinerary.locations[0]}
                    </p>
                    <p>
                      <CalendarTodayIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                      {new Date(itinerary.availableDates[0]).toISOString().split('T')[0].split('-').reverse().join('-')}
                    </p>
                   </div> 
                   <div className={styles.section2}>                    
                     <p>
                       <AccessTimeIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                       {itinerary.duration}
                     </p>
                     <p>
                       <LanguageIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                       {itinerary.language}
                     </p>
                   </div>                
             
                 
               </div>
               <hr className={styles.divider}/>
               <div className={styles.priceSection}>
                  <p> {itinerary.price * multiplier} {preferredCurrency}</p>
                  <p className={styles.productRating}>
                    {itinerary.rating && itinerary.rating > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          name="text-feedback"
                          value={itinerary.rating}
                          readOnly
                          precision={0.5}
                          icon={<StarIcon style={{ color: 'black' }} fontSize="inherit" />}
                          emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'black' }} fontSize="inherit" />}
                        />
                        <Typography sx={{ ml: 1 }}>{labels[itinerary.rating]}</Typography>
                      </Box>
                    ) : "No rating yet"}
                  </p>
                </div>
                <div className={styles.buttonsection}>
                <Link href={`iti/${itinerary._id}`} passHref>
                  <button className={styles.viewbtn}>View Detailes</button>
                </Link>
                </div>
                </div>
         
            ))}
          </div>
        </div>
      </div>
    </>
  );

};

export default ItineraryListpage;
