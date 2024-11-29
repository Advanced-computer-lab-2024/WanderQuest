'use client'
import { useEffect, useState } from 'react';
import styles from '/Styles/Itineraries.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import { motion } from "framer-motion";

const ItineraryListpage = (Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const role='Tourist';
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

  const preferences = ["Historic Areas", "Beaches", "Family-Friendly", "Shopping"];
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Japanese", "Russian"];
    const share=()=>{
        navigator.share({
            url:'http://localhost:3000/tourist/iti'
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
  }, [search]);
  
  const handleSearch = () => {
    const newprod = allItineraries.filter((prod) => {
        return search.toLowerCase() === '' || 
             prod.title.toLowerCase().includes(search.toLowerCase()) || 
            (prod.tags && prod.tags.some(tag => tag.type.toLowerCase() === search.toLowerCase()));
    });
    setDisplayedItineraries(newprod);  // Set the filtered museums based on search
};
const clearsearch=()=>{
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
        (minBudget === '' || itinerary.price >= parseFloat(minBudget)) && 
        (maxBudget === '' || itinerary.price <= parseFloat(maxBudget));
        
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

  if (loading) {return<>
    <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script> 
    <dotlottie-player style={{
  width: '300px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto'
}}
  src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </>}

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (<>      <Navbar></Navbar>
      <img src="/1.png" className={styles.travelplan} alt="iti" />
    <div className={styles.container}>

      
      {role==="Tourist"?(
      <motion.div className={styles.searchcom} initial={{ y: -170 }} transition={{ duration: 1 }}>
        <input 
          className={styles.productsearch} 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder='Enter your text' 
        />
        <button className={styles.searchbtn} onClick={handleSearch}>Search</button>
        {/* <button className={styles.searchbtn} onClick={clearsearch}>clearsearch</button> */}
      </motion.div>):(<></>)}
      <div className={styles.pageLayout}>
      <div className={styles.sidebar}>
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
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
    <button onClick={handleApplyFilters}>Apply</button>
  </div>

  <div className={styles.filterSection}>
    <h3>Sorting</h3>
    <button onClick={handleSortAsc}>Price: Low to High</button>
    <button onClick={handleSortDesc}>Price: High to Low</button>
    <button onClick={handleSortRatingAsc}>Rating: Low to High</button>
    <button onClick={handleSortRatingDesc}>Rating: High to Low</button>
  </div>
</div>

      <div className={styles.itineraries} >

      {displayedItineraries.map((itinerary) => (
        <div  id={itinerary.id} key={itinerary.id} className={styles.itinerary}>
          <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
          <div className={styles.activities}>
            {itinerary.activities.map((activityId) => (
              <div key={activityId} className={styles.activity}>
                {activityDetails[activityId] ? (
                  <>
                    <h3>Activity</h3>
                    <p><strong>Title:</strong> {activityDetails[activityId].title}</p>
                    <p><strong>Date:</strong> {activityDetails[activityId].date}</p>
                    <p><strong>Time:</strong> {activityDetails[activityId].time}</p>
                    <p><strong>Location:</strong> {activityDetails[activityId].location}</p>
                  </>
                ) : (
                  <p>Loading activity details...</p>
                )}
              </div>
            ))}
          </div>
          <div className={styles.locations}>
            {itinerary.locations.map((location, idx) => (
              <p key={idx}><strong>Location:</strong> {location}</p>
            ))}
          </div>
          <p><strong>Timeline:</strong> {itinerary.timeline}</p>
          <p><strong>Duration:</strong> {itinerary.duration}</p>
          <p><strong>Language:</strong> {itinerary.language}</p>
          <p><strong>Price:</strong> ${itinerary.price}</p>
          <p><strong>Rating:</strong> {itinerary.rating}</p>
          <div className={styles.dates}>
            {itinerary.availableDates.map((date, idx) => (
              <p key={idx}><strong>Date:</strong> {date}</p>
            ))}
          </div>
          <div className={styles.times}>
            {itinerary.time.map((time, idx) => (
              <p key={idx}><strong>Time:</strong> {time}</p>
            ))}
          </div>
          <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
          <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
          <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
          <Link href={`iti/${itinerary._id}`} className={styles.addticket}>
              view
          </Link>
          <p>{itinerary.id}</p>
          
          
          
        </div>
        
      ))}
      </div>
    </div>
    </div>
    </>);
};

export default ItineraryListpage;
