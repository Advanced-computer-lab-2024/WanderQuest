'use client'
import { useEffect, useState } from 'react';
import styles from '/styles/Activities.module.css';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Rating, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import CategoryIcon from '@mui/icons-material/Category';


const Activitiespage = (Props) => {
  const cc = [
    "Historical",
    "Cultural",
    "Nature",
    "Food & Drink",
    "Family",
    "Luxury"
  ];
  const role = 'Tourist';
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
        const price = activity.price * multiplier;
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
        const price = activity.price * multiplier;
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
    return<>
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
        </>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }
  const images ={'Shadows of the Pharaohs':'/pyramids 2.jpg',
    'Venice Gondola Ride':'/venice.jpg',
    'Northern Lights Viewing':'/ll.jpg',
    'Sunset Desert Safari':'/desert.jpg',
    'Mount Everest Base Camp Trek':'/everest.jpg'
    
    };

  return (<>
    <Navbar></Navbar>
    <img src="/4.jpg" className={styles.travelplan} alt="iti" />
    <div className={styles.container}>


      {/* {Array.isArray(category) && category.map((cat, index3) => (
        <div key={index3}>
          <input type="checkbox" onClick={() => handlefiltercat(cat.category)}></input>
          <label htmlFor="">{cat.category}</label> 
        </div>
      ))} */}

      {role === "Tourist" ? (
        < motion.div
          className={styles.searchcom}
          initial={{ y: 10,x:-300 }}
          transition={{ duration: 1 }} >
          <input
            className={styles.productsearch}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search activities..."
          />
         
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
          <h1>Filters</h1>
          <div className={styles.filterSection}>
            <button style={{ margin: '5px' }} onClick={handlesortPriceAsc}>Sort Price Asc</button>
            <button style={{ margin: '5px' }} onClick={handlesortPriceDsc}>Sort Price Desc</button>
            <button style={{ margin: '5px' }} onClick={handlesortRatingAsc}>Sort Rating Asc</button>
            <button style={{ margin: '5px' }} onClick={handlesortRatingDsc}>Sort Rating Desc</button>
            <div className={styles.ratingFilters}>
              <h2>Rating Filter</h2>
              {[1, 2, 3, 4].map((rating) => (
                <label key={rating} style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    onChange={() => handleRatingChange(rating)}
                    checked={ratingFilter === rating}
                  />
                  {[...Array(rating)].map((_, index) => (
                    <span key={index} style={{ color: 'gold' }}>★</span>
                  ))}
                  {[...Array(5 - rating)].map((_, index) => (
                    <span key={index} style={{ color: '#ccc' }}>★</span>
                  ))}
                  <span style={{ marginLeft: '4px' }}>or higher</span>
                </label>
              ))}
            </div>
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
              <button style={{ margin: '5px' }} onClick={handleApplyFilters}>Apply Filter</button>
              <button style={{ margin: '5px' }} className={styles.productArchive} onClick={clearFilters}>Clear Filters</button>
            </div></div>
        </div>
        <div className={styles.activities}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.activity}>
               <img
                  src={images[activity.title]}
                  alt={activity.title}
                  className={styles.itinerary_pic}
                />
              <h2 className={styles.itineraryTitle}>{activity.title}</h2>

              <div className={styles.itineraryDetails}>
                   <div className={styles.section1}> 
                <p> 
                  
              <CalendarTodayIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                   {new Date(activity.date).toISOString().split('T')[0].split('-').reverse().join('-')}
                </p>
                <p>
                       <AccessTimeIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                       {activity.time}</p>
                       </div>
                       <div className={styles.section2}>
                <p><LocationOnIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                {activity.location}</p>
                <p>
                       <CategoryIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                       {activity.category}</p>
                       </div>
                </div>
                <hr className={styles.divider}/>
                <div style={{display:'flex',padding: ' 0px 20px', flexDirection:'row' , justifyContent:'space-between',height:'30px',marginTop:'0px'}}>
                <p style={{fontWeight: 'bold', fontSize: '1.4rem' ,marginBottom: '0px' }}>{activity.price} {preferredCurrency}</p>
               
          <p className={styles.productRating} style={{padding: ' 0px 20px'}}>
                    {activity.rating && activity.rating > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          name="text-feedback"
                          value={activity.rating}
                          readOnly
                          precision={0.5}
                          icon={<StarIcon style={{ color: 'black' }} fontSize="inherit" />}
                          emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'black' }} fontSize="inherit" />}
                        />
                      
                      </Box>
                    ) : "No rating yet"}
                  </p>
               </div>
             
              < Link href={`activity/${activity._id}`} className={styles.buttonsection}>
                <button className={styles.viewbtn} style={{ fontSize: '1.4rem' }}>View</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default Activitiespage;
