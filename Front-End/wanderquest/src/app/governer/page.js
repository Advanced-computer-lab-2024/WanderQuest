'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { useState, useEffect } from 'react';
import styles from '/Styles/GovernorHome.module.css';
import Image from 'next/image';
import Historic from '../../../imgs/monument.jpg';

export default function governer() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/governer/viewall');
    };
    const handleRedirectp = () => {
        router.push('/governer/tagm');
    };

    const [place, setPlaces] = useState([]);
    const [governorID, setGovernorID] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGovernorID = async () => {
            const response = await fetch('http://localhost:4000/tourismGovernor/profile',
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();
            const governorID = data._id;
            setGovernorID(governorID);
        };
        fetchGovernorID();
    }, []);



    useEffect(() => {
        const fetchHistorical = async () => {
            const response = await fetch(`http://localhost:4000/tourismGovernor/places`, {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setPlaces(data);
            setLoading(false);
        };
        fetchHistorical();
    }, []);

  
//useEffect get places
return (
    <div>
      <Navbar />
      <h1>Governor Page</h1>
      <p>Welcome to the Governor page!</p>
      <button onClick={handleRedirect}>
        View a list of all my created activities/itineraries/museums and historical places
      </button>
      <button onClick={handleRedirectp}>Tag Manager</button>
  
      <div className={styles.mainCont}>

      <div className={styles.heroSection}>
  <Image
    src={Historic} // Path to the uploaded image
    alt="Historical Places"
    layout="fill" // Ensures the image fills the container
    objectFit="cover" // Ensures the image is scaled proportionally
    priority // Improves loading performance for hero images
    className={styles.heroImage}
  />
  <div className={styles.heroText}>
    <h1>Historical Places</h1>
  </div>
</div>


        {loading ? (
  <p className={styles.loading}>Loading...</p>
) : place && place.length > 0 ? (
  place.map((place) => (
    <div className={styles.card} key={place._id}>
  <div className={styles.textContent}>
    <h2 className={styles.title}>{place.title}</h2>
    <p className={styles.description}>{place.description}</p>
    <p className={styles.location}>{place.location}</p>
    <p className={styles.hours}>{place.openingHours}</p>
    <ul className={styles.ticketList}>
      {place.ticketPrices.map((price, index) => (
        <li className={styles.ticketItem} key={index}>
          {price}
        </li>
      ))}
    </ul>
    <div className={styles.tagsContainer}>
      {place.tags &&
        place.tags.map((tag, index) => (
          <div key={`${tag._id || index}-${place._id}`} className={styles.tag}>
            <p className={styles.tagText}>{tag.type}</p>
          </div>
        ))}
    </div>
  </div>
  <img
    src={place.picture}
    alt={"place picture"}
    className={styles.image}
  />
</div>
  ))
) : (
  <p>No places to display</p>
)}
      </div>
    </div>
  );
  
};
