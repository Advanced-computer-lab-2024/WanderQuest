'use client'
import { useEffect, useState } from 'react';
import styles from '/styles/Activities.module.css';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import { motion } from "framer-motion";
const Activitiespage = (Props) => {
  const cc = [
    "Historical",
    "Cultural",
    "Nature",
    "Food & Drink",
    "Family",
    "Luxury"
  ];
  const role='Tourist';
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
        (prod.tags && prod.tags.some(tag => tag.type.toLowerCase() === search.toLowerCase()));
    });
    setActivities(filteredActivities);
  };
//   const clearsearch=()=>{
//     setActivities(allActivities);
// }
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
//   const handlefilter = (tag) => {
//     if (filteredtags.includes(tag)) {
//         const temp = filteredtags.filter(t => t !== tag);
//         setFilteredtags(temp);
//     } else {
//         setFilteredtags([...filteredtags, tag]);
//     }
// };

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
    fetch('http://localhost:4000/admin/categories', {
      credentials: 'include', // Include credentials (cookies) in the request
    })
      .then(res => res.json())
      .then(data => {
        setCategory(data); // Set the categories fetched from the API
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setCategory([]); // Set to an empty array on error
      });
  }, []);
  
  useEffect(() => {
    filteritemscat();
  }, [selecttedfilters]);
  
  const fetchData = () => {
    fetch('http://localhost:4000/tourist/upcomingActivities', {
      credentials: 'include', // Include credentials (cookies) in the request
    })
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
  }, []);
  useEffect(() => {
    handleSearch();
  }, [search]);



  const handleApplyFilters = () => {
    let updatedActivities = [...allActivities];
  
    // Apply category filters
    if (selecttedfilters.length > 0) {
      updatedActivities = updatedActivities.filter((item) => 
        selecttedfilters.includes(item.category)
      );
    }
  
    // Apply search filter
    if (search.toLowerCase() !== '') {
      updatedActivities = updatedActivities.filter((prod) => 
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        prod.category.toLowerCase().includes(search.toLowerCase()) ||
        (prod.tags && prod.tags.some(tag => tag.type.toLowerCase().includes(search.toLowerCase())))
      );
    }
  
    // Apply rating filter
    if (ratingFilter !== null) {
      updatedActivities = updatedActivities.filter((activity) => 
        activity.rating >= ratingFilter
      );
    }
  
    // Apply date filter
    if (dateFilter) {
      updatedActivities = updatedActivities.filter((activity) => 
        activity.date === dateFilter
      );
    }
  
    // Apply budget filter
    if (minBudget !== '' || maxBudget !== '') {
      updatedActivities = updatedActivities.filter((activity) => {
        const price = activity.price;
        return (minBudget === '' || price >= parseFloat(minBudget)) && 
               (maxBudget === '' || price <= parseFloat(maxBudget));
      });
    }
  
    // Set the filtered activities
    setActivities(updatedActivities);
  };
  const clearFilters = () => {
    // Reset all filter states
    setSearch('');
    setSelectedfilers([]);
    setRatingFilter(null);
    setDateFilter('');
    setMinBudget('');
    setMaxBudget('');
  
    // Reset activities to the original list
    setActivities([...allActivities]);
  };
  // useEffect(() => {
  //   handleRatings();
  // }, [ratingFilter]);

  // Apply date filter whenever the dateFilter state changes
  // useEffect(() => {
  //   filterByDate();
  // }, [dateFilter]);

  // Apply budget filter whenever minBudget or maxBudget state changes
  // useEffect(() => {
  //   filterByBudget();
  // }, [minBudget, maxBudget]);

  if (loading) {
    return <p className={styles.loading}>Loading activities...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (<>
    <Navbar></Navbar>
    <img src="/1.png" className={styles.travelplan} alt="iti" />
    <div className={styles.container}>


      {Array.isArray(category) && category.map((cat, index3) => (
  <div key={index3}>
    <input type="checkbox" onClick={() => handlefiltercat(cat.category)}></input>
    <label htmlFor="">{cat.category}</label> {/* Use cat.category to render the category name */}
  </div>
))}

{role === "Tourist" ? (
  < motion.div
  className={styles.searchcom}
  initial={{ y: -170 }}
  transition={{ duration: 1 }} >
    <input
      className={styles.productsearch}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Search activities..."
    />
    {/* <button className={styles.searchbtn} onClick={handleSearch}>Search</button> */}
    {/* <button onClick={clearsearch}>Clear Search</button> */}
  </motion.div>
) : (
  <div></div>
)}
{/* 
      <div className={styles.sortButtons}>
        <button onClick={handlesortPriceAsc}>Sort Price Asc</button>
        <button onClick={handlesortPriceDsc}>Sort Price Desc</button>
        <button onClick={handlesortRatingAsc}>Sort Rating Asc</button>
        <button onClick={handlesortRatingDsc}>Sort Rating Desc</button>
      </div> */}

     
      {/* Date filter input */}
      {/* <div className={styles.dateFilter}>
        <input 
          type="date" 
          onChange={(e) => setDateFilter(e.target.value)} // Update date filter state on date change
        />
      </div> */}

      {/* Budget filter inputs */}
      {/* <div className={styles.budgetFilter}>
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
      </div> */} <div className={styles.pageLayout}>
      <div className={styles.sidebar}>
                    <h1>Products</h1>
                    <div className={styles.filterSection}>
                    <button  style={{ margin: '5px' }} onClick={handlesortPriceAsc}>Sort Price Asc</button>
                    <button  style={{ margin: '5px' }}  onClick={handlesortPriceDsc}>Sort Price Desc</button>
                    <button style={{ margin: '5px' }} onClick={handlesortRatingAsc}>Sort Rating Asc</button>
                    <button  style={{ margin: '5px' }}onClick={handlesortRatingDsc}>Sort Rating Desc</button>
                    <div className={styles.ratingFilters}></div>
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
                    
                    <div className={styles.priceFilter}>
                        <h3>Price Filter</h3>
                        <div>
                            <label>
                                Min Price:
                                <input
                                    type="number"
                                    className={styles.min}
                                    value={minBudget}
                                    onChange={(e) => setMinBudget(e.target.value)}
                                    placeholder="0"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Max Price:
                                <input
                                    type="number"
                                    className={styles.max}
                                    value={maxBudget}
                                    onChange={(e) => setMaxBudget(e.target.value)}
                                    placeholder="1000"
                                />
                            </label>
                        </div>
                        <div className={styles.slider}>
                            <label>Min</label>
                            <input
                                type="range"
                                className={styles.rangeMin}
                                min="0"
                                max="10000"
                                value={minBudget}
                                onChange={(e) => setMinBudget(e.target.value)}
                                step="100"
                            />
                            <label>Max</label>
                            <input
                                type="range"
                                className={styles.rangeMax}
                                min="0"
                                max="10000"
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(e.target.value)}
                                step="100"
                            />
                        </div><div className={styles.filterSection}>
                        <button  style={{ margin: '5px' }} onClick={handleApplyFilters}>Apply Filter</button>
                        <button  style={{ margin: '5px' }} className={styles.productArchive} onClick={clearFilters }>Clear Filters</button>
                    </div></div>
                </div>
                <div className={styles.activities}>
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
            <p></p>
            <Link href={`activity/${activity._id}`} className={styles.addticket}>
            <button className={styles.searchbtn}>View</button>
          </Link>
          </p>
          
        </div>
        
      ))}</div>
    </div></div>
    </>);
};

export default Activitiespage;
