import { useEffect, useState } from 'react';
import styles from '../styles/Itineraries.module.css';

const ItineraryList = () => {
  const preferences = ["Historic Areas", "Beaches", "Family-Friendly", "Shopping"];
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Japanese", "Russian"];
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleSearch = () => {
    const newItineraries = itineraries.filter((itinerary) => {
      return (
        search.toLowerCase() === '' ||
        itinerary.title.toLowerCase().includes(search.toLowerCase()) ||
        itinerary.category.toLowerCase().includes(search.toLowerCase()) ||
        (Array.isArray(itinerary.tags) && itinerary.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
      );
    });
    setItineraries(newItineraries);
  };

  const handleSortAsc = () => {
    const sortedItineraries = [...itineraries].sort((a, b) => a.price - b.price);
    setItineraries(sortedItineraries);
  };

  const handleSortDesc = () => {
    const sortedItineraries = [...itineraries].sort((a, b) => b.price - a.price);
    setItineraries(sortedItineraries);
  };

  const handleSortRatingAsc = () => {
    const sortedItineraries = [...itineraries].sort((a, b) => a.rating - b.rating);
    setItineraries(sortedItineraries);
  };

  const handleSortRatingDesc = () => {
    const sortedItineraries = [...itineraries].sort((a, b) => b.rating - a.rating);
    setItineraries(sortedItineraries);
  };

  const handlePreferenceChange = (preference) => {
    setSelectedPreferences(prevState =>
      prevState.includes(preference)
        ? prevState.filter(pref => pref !== preference)
        : [...prevState, preference]
    );
  };

  const handleApplyFilters = () => {
    const filteredItineraries = itineraries.filter((itinerary) => {
      const withinBudget = 
        (minBudget === '' || itinerary.price >= minBudget) && 
        (maxBudget === '' || itinerary.price <= maxBudget);
        
      const withinDate = 
        dateFilter === '' || 
        itinerary.availableDates.includes(dateFilter);

      const matchesPreferences = 
        selectedPreferences.length === 0 || 
        selectedPreferences.some(pref => itinerary.prefrence.includes(pref));

      return withinBudget && withinDate && matchesPreferences;
    });
    setItineraries(filteredItineraries);
  };

  const handleClearFilters = () => {
    setDateFilter('');
    setMinBudget('');
    setMaxBudget('');
    setSelectedPreferences([]);
    fetchItineraries(); // Fetch all itineraries again
  };

  const fetchItineraries = () => {
    fetch('http://localhost:8000/itineraries')
      .then(res => res.json())
      .then(data => {
        setItineraries(data);
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchItineraries();
  }, [search]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Itinerary List</h1>
      <div className={styles.searchcom}>
        <input 
          className={styles.productsearch} 
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder='Enter your text' 
        />
        <button className={styles.searchbtn} onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.dateFilter}>
          <label htmlFor="date-filter">Date:</label>
          <input 
            type="date" 
            id="date-filter"
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)} 
          />
        </div>

        <div className={styles.budgetFilter}>
          <label htmlFor="min-budget">Min Budget:</label>
          <input 
            type="number" 
            id="min-budget"
            placeholder="Min Budget" 
            value={minBudget} 
            onChange={(e) => setMinBudget(e.target.value)} 
          />
          
          <label htmlFor="max-budget">Max Budget:</label>
          <input 
            type="number" 
            id="max-budget"
            placeholder="Max Budget" 
            value={maxBudget} 
            onChange={(e) => setMaxBudget(e.target.value)} 
          />
        </div>

        <div className={styles.preferenceFilter}>
          <h3>Preferences:</h3>
          {preferences.map((pref, ind) => (
            <div key={ind}>
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

        <div className={styles.filterButtons}>
          <button onClick={handleApplyFilters}>Apply Filters</button>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>

      <button onClick={handleSortAsc}>Sort on Price Asc</button>
      <button onClick={handleSortDesc}>Sort on Price Desc</button>
      <button onClick={handleSortRatingAsc}>Sort on Rating Asc</button>
      <button onClick={handleSortRatingDesc}>Sort on Rating Desc</button>

      {itineraries.map((itinerary, index) => (
        <div key={index} className={styles.itinerary}>
          <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
          <div className={styles.activities}>
            {itinerary.activities.map((activity, index1) => (
              <div key={index1} className={styles.activity}>
                <h3>Activity {index1 + 1}</h3>
                <p><strong>Title:</strong> {activity.title}</p>
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Time:</strong> {activity.time}</p>
                <p><strong>Location:</strong> {activity.location}</p>
              </div>
            ))}
          </div>
          <div className={styles.locations}>
            {itinerary.locations.map((location1, index2) => (
              <p key={index2}><strong>Location:</strong> {location1}</p>
            ))}
          </div>
          <p><strong>Timeline:</strong> {itinerary.timeline}</p>
          <p><strong>Duration:</strong> {itinerary.duration}</p>
          <p><strong>Language:</strong> {itinerary.language}</p>
          <p><strong>Price:</strong> ${itinerary.price}</p>
          <div className={styles.dates}>
            {itinerary.availableDates.map((date, index3) => (
              <p key={index3}><strong>Date:</strong> {date}</p>
            ))}
          </div>
          <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
          <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
          <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;
