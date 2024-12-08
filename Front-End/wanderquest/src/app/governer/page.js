'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { useState, useEffect } from 'react';
import styles from '/Styles/GovernorHome.module.css';
import Image from 'next/image';
import Historic from '../../../imgs/monument.jpg';
import Sph from '../../../imgs/Sphinx.jpg';

export default function governer() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/governer/viewall');
    };

    const handleRedirectUpdate = (place) =>{
        localStorage.setItem('placeToEdit', JSON.stringify(place));
        router.push('/governer/viewall');
    }

    const handleRedirectp = () => {
        router.push('/governer/tagm');
    };

    const [place, setPlaces] = useState([]);
    const [governorID, setGovernorID] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGovernorID = async () => {
            const response = await fetch('http://localhost:4000/authentication/user',
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();
            const governorID = data._id;
            setGovernorID(governorID);
            console.log(governorID);
            console.log(data.role);
        };
        fetchGovernorID();
    }, []);

    const handleFilterToggle = async () => {
      if (!filterEnabled) {
        // Fetch myCreatedPlaces from the API
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:4000/tourismGovernor/myPlaces`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch my created places.");
          }
          const data = await response.json();
          setFilteredPlaces(data); // Show only my created places
        } catch (error) {
          console.error("Error fetching my created places:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Reset to show all places
        setFilteredPlaces(places);
      }
      setFilterEnabled(!filterEnabled);
    };


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

    const handleDelete = async (id) => {
    
      const confirmDelete = window.confirm(
          "Are you sure you want to delete this place? This action is irreversible."
      );
  
      if (!confirmDelete) {
          return;
      }
  
      try {
          const response = await fetch(`http://localhost:4000/tourismGovernor/deletePlace/${id}`, {
              method: 'DELETE',
              credentials: 'include',
          });
          
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          else{
              console.log('Place deleted successfully');
          }
  
          // Remove the deleted place from the state
          setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
  
          // Optional: Show success alert or message
          alert('Place successfully deleted.');
      } catch (error) {
          console.error('Error deleting Historical Place:', error);
          alert(error);
      }
  };
  
  
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


<div className={styles.mainCont}>
  {loading ? (
    <p className={styles.loading}>Loading...</p>
  ) : place && place.length > 0 ? (
    <div className={styles.cardContainer}>
      {place.map((place) => (
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
                  <div
                    key={`${tag._id || index}-${place._id}`}
                    className={styles.tag}
                  >
                    <p className={styles.tagText}>{tag.type}</p>
                  </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
   
               <button className={`${styles.button} ${styles.updateButton}`}onClick={() => handleRedirectUpdate(place)}>
                  Update
                </button>

              <button className={`${styles.button} ${styles.deleteButton}`}onClick={() => handleDelete(place._id)}>
                  Delete
              </button>
            </div>
          </div>
          <Image
            src={place.picture || Sph}
            alt={"place picture"}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  ) : (
    <p>No places to display</p>
  )}
</div>
    </div>
  );
  
};
