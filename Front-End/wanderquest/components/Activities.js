// Import necessary hooks from React and styles from the CSS module
import { useEffect, useState } from 'react';
import styles from '../styles/Activities.module.css';

// Define the Activities component
const Activities = () => {
  // Define an array of activity categories
  const cc = [
    "Adventure",
    "Cultural",
    "Nature",
    "Food & Drink",
    "Family",
    "Luxury"
  ];

  // Initialize state variables using useState hook
  const [category, setCategory] = useState([]); // Currently unused state
  const [selecttedfilters, setSelectedfilers] = useState([]); // Tracks selected category filters
  const [activities, setActivities] = useState([]); // Stores the currently displayed activities
  const [allActivities, setAllActivities] = useState([]); // Stores all fetched activities
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const [error, setError] = useState(null); // Stores any error messages
  const [search, setSearch] = useState(''); // Stores the current search query
  const [ratingFilter, setRatingFilter] = useState(null); // Stores the current rating filter
  const [filteredactivities, setFilteredactivities] = useState(activities); // Currently unused state

  /**
   * Handles the search functionality by filtering activities based on the search query.
   */
  const handleSearch = () => {
    // Filter allActivities based on search criteria
    const filteredActivities = allActivities.filter((prod) => {
      return search.toLowerCase() === '' || // If search is empty, include all
        prod.title.toLowerCase().includes(search.toLowerCase()) || // Match title
        prod.category.toLowerCase().includes(search.toLowerCase()) || // Match category
        (Array.isArray(prod.tags) && prod.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))); // Match any tag
    });
    setActivities(filteredActivities); // Update activities with filtered results
  };

  /**
   * Toggles the rating filter. If the same rating is clicked again, it removes the filter.
   * @param {number} rating - The rating value to filter by
   */
  const handleRatingChange = (rating) => {
    setRatingFilter(ratingFilter === rating ? null : rating); // Toggle rating filter
  };

  /**
   * Applies the rating filter to the activities.
   */
  const handleRatings = () => {
    if (ratingFilter !== null) {
      // Filter activities with rating >= ratingFilter
      const updatedActivities = allActivities.filter((activity) => activity.rating >= ratingFilter);
      setActivities(updatedActivities); // Update activities with filtered results
    } else {
      setActivities(allActivities); // If no filter, show all activities
    }
  };

  /**
   * Sorts activities by price in ascending order.
   */
  const handlesortPriceAsc = () => {
    const sorted = [...activities].sort((a, b) => a.price - b.price); // Clone and sort
    setActivities(sorted); // Update activities with sorted results
  };

  /**
   * Sorts activities by price in descending order.
   */
  const handlesortPriceDsc = () => {
    const sorted = [...activities].sort((a, b) => b.price - a.price); // Clone and sort
    setActivities(sorted); // Update activities with sorted results
  };

  /**
   * Sorts activities by rating in ascending order.
   */
  const handlesortRatingAsc = () => {
    const sorted = [...activities].sort((a, b) => a.rating - b.rating); // Clone and sort
    setActivities(sorted); // Update activities with sorted results
  };

  /**
   * Sorts activities by rating in descending order.
   */
  const handlesortRatingDsc = () => {
    const sorted = [...activities].sort((a, b) => b.rating - a.rating); // Clone and sort
    setActivities(sorted); // Update activities with sorted results
  };

  /**
   * Handles category filter selection. Adds or removes categories from selected filters.
   * @param {string} catg - The category to filter by
   */
  const handlefiltercat = (catg) => {
    if (selecttedfilters.includes(catg)) {
      // If category is already selected, remove it
      let filters = selecttedfilters.filter((el) => el !== catg);
      setSelectedfilers(filters);
    } else {
      // If category is not selected, add it
      setSelectedfilers([...selecttedfilters, catg]);
    }
  };

  /**
   * useEffect hook that triggers whenever selected filters change to filter activities by category.
   */
  useEffect(() => {
    filteritemscat(); // Call the category filtering function
  }, [selecttedfilters]); // Dependency array: runs when selecttedfilters changes

  /**
   * Filters activities based on selected categories.
   */
  const filteritemscat = () => {
    if (selecttedfilters.length > 0) {
      // If there are selected filters, filter activities accordingly
      let temparr = selecttedfilters.map((selectedcat) => {
        // For each selected category, filter activities
        let temp = allActivities.filter((item) => item.category === selectedcat);
        return temp;
      });
      setActivities(temparr.flat()); // Flatten the array and update activities
    } else {
      setActivities([...allActivities]); // If no filters, show all activities
    }
  };

  /**
   * Fetches activities data from the backend API.
   */
  const fetchData = () => {
    fetch('http://localhost:4000/activityRoutes/activities') // Make a GET request to the API
      .then((response) => {
        if (!response.ok) {
          // If response is not OK, throw an error
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => {
        setActivities(data); // Set activities state with fetched data
        setAllActivities(data); // Also set allActivities with fetched data
        setLoading(false); // Set loading to false as data is fetched
      })
      .catch((error) => {
        console.error('Error fetching activities:', error); // Log error to console
        setError(error.message); // Set error state with error message
        setLoading(false); // Set loading to false as fetching is complete
      });
  };

  /**
   * useEffect hook that fetches data when the component mounts or when the search query changes.
   */
  useEffect(() => {
    fetchData(); // Fetch activities data
  }, [search]); // Dependency array: runs when search changes

  /**
   * useEffect hook that applies rating filters whenever the ratingFilter state changes.
   */
  useEffect(() => {
    handleRatings(); // Apply rating filters
  }, [ratingFilter]); // Dependency array: runs when ratingFilter changes

  // The following useEffect is commented out. It was intended to handle search on search state change.
  // useEffect(() => {
  //   handleSearch();
  // }, [search]);

  // Render loading state if data is being fetched
  if (loading) {
    return <p className={styles.loading}>Loading activities...</p>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  // Render a message if there are no activities to display
  if (!activities || activities.length === 0) {
    return <p className={styles.noActivities}>No activities available.</p>;
  }

  // Render the main component UI
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Activities</h1>

      {/* Render category filter buttons */}
      {cc.map((cat, index3) => (
        <div key={index3}>
          <button onClick={() => handlefiltercat(cat)}>{cat}</button>
        </div>
      ))}

      {/* Search input and button */}
      <div className={styles.searchcom}>
        <input
          className={styles.productsearch}
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          type="text"
          placeholder="Search activities..."
        />
        <button className={styles.searchbtn} onClick={handleSearch}>Search</button>
      </div>

      {/* Sorting buttons */}
      <div className={styles.sortButtons}>
        <button onClick={handlesortPriceAsc}>Sort Price Asc</button>
        <button onClick={handlesortPriceDsc}>Sort Price Desc</button>
        <button onClick={handlesortRatingAsc}>Sort Rating Asc</button>
        <button onClick={handlesortRatingDsc}>Sort Rating Desc</button>
      </div>

      {/* Rating filter checkboxes */}
      <div className={styles.ratingFilters}>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(1)} // Toggle rating filter for 1+
            checked={ratingFilter === 1} // Check if current filter is 1
          /> 1 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(2)} // Toggle rating filter for 2+
            checked={ratingFilter === 2} // Check if current filter is 2
          /> 2 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(3)} // Toggle rating filter for 3+
            checked={ratingFilter === 3} // Check if current filter is 3
          /> 3 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(4)} // Toggle rating filter for 4+
            checked={ratingFilter === 4} // Check if current filter is 4
          /> 4 or higher
        </label>
      </div>

      {/* Render the list of activities */}
      {activities.map((activity) => (
        <div key={activity.id} className={styles.activity}>
          <h3>{activity.title}</h3>
          <p>
            <strong>Date:</strong> {activity.date}<br />
            <strong>Time:</strong> {activity.time}<br />
            <strong>Location:</strong>{' '}
            <a href={activity.location} target="_blank" rel="noopener noreferrer">
              {activity.location}
            </a><br />
            <strong>Price:</strong> {activity.price}<br />
            <strong>Category:</strong> {activity.category}<br />
            <strong>Tags:</strong> {Array.isArray(activity.tags) ? activity.tags.join(', ') : ''}<br />
            <strong>Special Discounts:</strong> {activity.specialDiscounts}<br />
            <strong>Booking Open:</strong> {activity.booking_open ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </div>
  );
};

// Export the Activities component as default export
export default Activities;
