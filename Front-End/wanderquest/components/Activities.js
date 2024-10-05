import { useEffect, useState } from 'react';
import styles from '../styles/Activities.module.css';

const Activities = () => {
  const [activities, setActivities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[search,setSearch]=useState('');
  const handlesearch = () => {
    const newprod = activities.filter((prod) => {
        return search.toLowerCase() === '' || prod.title.toLowerCase().includes(search.toLowerCase());
    });
    setActivities(newprod);
};
  // const handlesort=()=>{
  //   activities.sort(function(a,b){
  //      if(a.price>b.price)return-1;
  //      if(a.price>b.price)return 1;
  //   })
  // }

  useEffect(() => {
    fetch('http://localhost:5000/activities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [search]);

  if (loading) {
    return <p className={styles.loading}>Loading activities...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  if (!activities || activities.length === 0) {
    return <p className={styles.noActivities}>No activities available.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Activities</h1>
      {/* <button onClick={}>sort on price </button> */}
      <div className={styles.searchcom}>
                <input 
                    className={styles.productsearch} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder='Enter your text' 
                />
                <button className={styles.searchbtn} onClick={handlesearch}>Search</button>
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
            <strong>Price:{activity.priceRange} </strong>
            <br />
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
