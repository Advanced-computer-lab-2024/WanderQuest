import { useEffect, useState } from 'react';
import styles from '../styles/Activities.module.css';

const Activities = () => {
  const cc = [
    "Adventure",
    "Cultural",
    "Nature",
    "Food & Drink",
    "Family",
    "Luxury"
  ];

  const [category, setCategory] = useState([]);
  const [selecttedfilters, setSelectedfilers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(''); // State for the selected date
  const [minBudget, setMinBudget] = useState(''); // State for minimum budget
  const [maxBudget, setMaxBudget] = useState(''); // State for maximum budget

  const handleSearch = () => {
    const filteredActivities = allActivities.filter((prod) => {
      return search.toLowerCase() === '' ||
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        prod.category.toLowerCase().includes(search.toLowerCase()) ||
        (Array.isArray(prod.tags) && prod.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
    });
    setActivities(filteredActivities);
  };

  const handleRatingChange = (rating) => {
    setRatingFilter(ratingFilter === rating ? null : rating);
  };

  const handleRatings = () => {
    let updatedActivities = allActivities;
    if (ratingFilter !== null) {
      updatedActivities = updatedActivities.filter((activity) => activity.rating >= ratingFilter);
    }
    setActivities(updatedActivities);
  };

  const filterByDate = () => {
    let updatedActivities = allActivities;
    if (dateFilter) {
      updatedActivities = updatedActivities.filter((activity) => activity.date === dateFilter);
    }
    setActivities(updatedActivities);
  };

  const filterByBudget = () => {
    let updatedActivities = allActivities;

    // Filter activities based on the budget range
    if (minBudget !== '' || maxBudget !== '') {
      updatedActivities = updatedActivities.filter((activity) => {
        const price = activity.price;
        return (minBudget === '' || price >= minBudget) && (maxBudget === '' || price <= maxBudget);
      });
    }

    setActivities(updatedActivities);
  };

  const handlesortPriceAsc = () => {
    const sorted = [...activities].sort((a, b) => a.price - b.price);
    setActivities(sorted);
  };

  const handlesortPriceDsc = () => {
    const sorted = [...activities].sort((a, b) => b.price - a.price);
    setActivities(sorted);
  };

  const handlesortRatingAsc = () => {
    const sorted = [...activities].sort((a, b) => a.rating - b.rating);
    setActivities(sorted);
  };

  const handlesortRatingDsc = () => {
    const sorted = [...activities].sort((a, b) => b.rating - a.rating);
    setActivities(sorted);
  };

  const handlefiltercat = (catg) => {
    if (selecttedfilters.includes(catg)) {
      let filters = selecttedfilters.filter((el) => el !== catg);
      setSelectedfilers(filters);
    } else {
      setSelectedfilers([...selecttedfilters, catg]);
    }
  };

  const filteritemscat = () => {
    if (selecttedfilters.length > 0) {
      let temparr = selecttedfilters.map((selectedcat) => {
        let temp = allActivities.filter((item) => item.category === selectedcat);
        return temp;
      });
      setActivities(temparr.flat());
    } else {
      setActivities([...allActivities]);
    }
  };

  useEffect(() => {
    filteritemscat();
  }, [selecttedfilters]);

  const fetchData = () => {
    fetch('http://localhost:5000/activities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setAllActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    handleRatings();
  }, [ratingFilter]);

  // Apply date filter whenever the dateFilter state changes
  useEffect(() => {
    filterByDate();
  }, [dateFilter]);

  // Apply budget filter whenever minBudget or maxBudget state changes
  useEffect(() => {
    filterByBudget();
  }, [minBudget, maxBudget]);

  if (loading) {
    return <p className={styles.loading}>Loading activities...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Activities</h1>

      {cc.map((cat, index3) => (
        <div key={index3}>
          <input type="checkbox" onClick={() => handlefiltercat(cat)}></input><label htmlFor="">{cat}</label>
        </div>
      ))}

      <div className={styles.searchcom}>
        <input
          className={styles.productsearch}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search activities..."
        />
        <button className={styles.searchbtn} onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.sortButtons}>
        <button onClick={handlesortPriceAsc}>Sort Price Asc</button>
        <button onClick={handlesortPriceDsc}>Sort Price Desc</button>
        <button onClick={handlesortRatingAsc}>Sort Rating Asc</button>
        <button onClick={handlesortRatingDsc}>Sort Rating Desc</button>
      </div>

      <div className={styles.ratingFilters}>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(1)}
            checked={ratingFilter === 1}
          /> 1 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(2)}
            checked={ratingFilter === 2}
          /> 2 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(3)}
            checked={ratingFilter === 3}
          /> 3 or higher
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleRatingChange(4)}
            checked={ratingFilter === 4}
          /> 4 or higher
        </label>
      </div>

      {/* Date filter input */}
      <div className={styles.dateFilter}>
        <input 
          type="date" 
          onChange={(e) => setDateFilter(e.target.value)} // Update date filter state on date change
        />
      </div>

      {/* Budget filter inputs */}
      <div className={styles.budgetFilter}>
        <label>
          Min Budget: 
          <input 
            type="number" 
            value={minBudget} 
            onChange={(e) => setMinBudget(e.target.value)} 
            placeholder="Min" 
          />
        </label>
        <label>
          Max Budget: 
          <input 
            type="number" 
            value={maxBudget} 
            onChange={(e) => setMaxBudget(e.target.value)} 
            placeholder="Max" 
          />
        </label>
      </div>

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

export default Activities;
