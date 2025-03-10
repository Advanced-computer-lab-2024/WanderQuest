'use client';
import Navbar from "../../../../../components/Navbar";
import { useState, useEffect } from "react";
import styles from '/Styles/itidetails.module.css';
import ShareIcon from '@mui/icons-material/Share';
import { TimerIcon } from "lucide-react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LanguageIcon from '@mui/icons-material/Language';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import TimelapseSharpIcon from '@mui/icons-material/TimelapseSharp';
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
const ItinerarydetailsPage = ({ params }) => {
    const id = params.id;
    const [id1, setid] = useState('');
    const [itinerary, setAllItineraries] = useState({});
    const [activityDetails, setActivityDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const share = () => {
        navigator.share({
            url: 'http://localhost:3000/tourist/iti/' + id
        })
    }
    const fetchActivityDetails = (activityId) => {
        if (activityDetails[activityId]) return; // Avoid refetching

        fetch(`http://localhost:4000/advertiser/activity/${activityId}`, {
            method: 'GET',
            credentials: 'include', // Include cookies
            headers: {
                "Content-Type": "application/json",
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
        fetch(`http://localhost:4000/tourist/upcomingItineraries/${id}`, {
            method: 'GET',
            credentials: 'include', // Include cookies
            headers: {
                "Content-Type": "application/json",
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
                setLoading(false);

                // Fetch details for all activities
                if (data.activities) {
                    data.activities.forEach(activityId => {
                        fetchActivityDetails(activityId);
                    });
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchItineraries();
    }, [id1]);

if (loading) {return <>
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
  </>};
    if (error) return <p>Error: {error}</p>;

    const handleBooking = (date) => {
        const userId = id1;
        const bookingType = 'itinerary';
        const startDate = date;
        const itineraryId = id;
        const iti = { userId, bookingType, itineraryId, startDate };
        console.log(iti);

        fetch('http://localhost:4000/booking/itinerary', {
            method: "POST",
            credentials: 'include', // Include cookies
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(iti),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Booking failed');
                }
                return response.json();
            })
            .then(() => {
                alert('Booking has been made successfully!');
            })
            .catch(error => {
                console.error('Error booking itinerary:', error);
                alert('You Already Booked This!');
            });
    };

    const images = {
        'Adventure and Relaxation Tour': '/australia.jpg',
        'Winter Wonderlands': '/winter.jpg',
        'Nature and Wildlife Tours': '/africa.jpg',
        'Japan Cultural Journey': '/japan1.jpg'
     
      };
    

    return (
        <>
            <Navbar />
            <div className={styles.itinerary}>
                
                <div className={styles.itinerary_info}>
                <img src={images[itinerary.title]} className={styles.itinerary_pic} />
                <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
                <div className={styles.itinerary_subtitle}> 
                    <p>  <TimelapseSharpIcon />{itinerary.duration}</p>
                    <p> <StarBorderSharpIcon  style={{color:"#FFD700"}}/>{itinerary.rating}</p>
                    <p> <LanguageIcon />  {itinerary.language}</p>
                    
                    <p><FlightTakeoffIcon /> {itinerary.pickUpLocation}</p>
                    <p><FlightLandIcon /> {itinerary.dropOffLocation}</p>



                </div>


                <div className={styles.activities}>
                    {itinerary.activities && itinerary.activities.map((activityId) => (
                        <div key={activityId} className={styles.activity}>
                            {activityDetails[activityId] ? (
                                <>
                                    <h3>Activity</h3>
                                    <p><strong>Title:</strong> {activityDetails[activityId].title}</p>
                                    <p><strong>Date:</strong> {new Date(activityDetails[activityId].date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {activityDetails[activityId].time}</p>
                                    <p><strong>Location:</strong> {activityDetails[activityId].location}</p>
                                </>
                            ) : (
                                <p>Loading activity details...</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.locationsContainer}>
                    <strong className={styles.locationsLabel}>Available locations:</strong>
                    <div className={styles.locations}>
                        {itinerary.locations && itinerary.locations.length > 0 ? (
                            <select className={styles.locationSelect}>
                                {itinerary.locations.map((location, idx) => (
                                    <option key={idx} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>No available locations</p>
                        )}
                    </div>
                </div>
                <div className={styles.timelineCard}>
                    <h3 className={styles.timelineTitle}>Timeline</h3>
                    <div className={styles.timelineList}>
                        {itinerary.timeline && itinerary.timeline.split(',').map((entry, idx) => (
                            <div key={idx} className={styles.timelineEntry}>
                                <AccessTimeIcon/>    {entry.trim()}
                            </div>
                        ))}
                    </div>
                </div>


              
     
                <div className={styles.datesContainer}>
                   
                </div>


                <div className={styles.timesContainer}>
                    <strong className={styles.timesLabel}>Available times:</strong>
                    <div className={styles.times}>
                        {itinerary.time && itinerary.time.length > 0 ? (
                            <select className={styles.timeSelect}>
                                {itinerary.time.map((time, idx) => (
                                    <option key={idx} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>No available times</p>
                        )}
                    </div>
                </div>

          
                        

                <div className={styles.reviews}>
                    <h3>Ratings & Reviews</h3>

                    {/* Check if there are no ratings or comments */}
                    {(!itinerary.ratings.length && !itinerary.comments.length) ? (
                        <p>No reviews and ratings</p>
                    ) : (
                        [
                            ...new Set([
                                ...itinerary.ratings.map((rat) => rat.touristId),
                                ...itinerary.comments.map((comm) => comm.touristId),
                            ])
                        ].map((touristId, idx) => {
                            const rating = itinerary.ratings.find((rat) => rat.touristId === touristId);
                            const comment = itinerary.comments.find((comm) => comm.touristId === touristId);

                            return (
                                <div className={styles.review} key={idx}>
                                    <p>
                                        <strong>Ahmed Elfar</strong>
                                    </p>
                                    {rating && (
                                        <p>
                                            <strong>Rating:</strong> {rating.rating} stars
                                        </p>
                                    )}
                                    {comment && (
                                        <p>
                                            <strong>Review:</strong> {comment.comment}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>


                
                </div>
                <div className={styles.itineraryright}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                             <p style={{ fontWeight: 'bold',fontSize: 'larger' }}>{itinerary.price * multiplier} {preferredCurrency}</p>
                             <button style={{ backgroundColor: 'green', color: 'white' ,borderRadius: '12px',border: 'none'}}>Available</button>
                        </div>
                <strong className={styles.datesLabel}>Available dates:</strong>
                    <div className={styles.dates}>
                        {itinerary.availableDates && itinerary.availableDates.length > 0 ? (
                            <div className={styles.dates}>
                                {itinerary.availableDates.map((date, idx) => (
                                   <p key={idx}>{new Date(date).toLocaleDateString()}</p>
                               
                                ))}
                           </div>
                        ) : (
                            <p>No available dates</p>
                        )}

                    </div>



                    <div className={styles.buttonGroup}>
                    <div className={styles.leftButton}>
                        <button
                            className={styles.primaryButton}
                            onClick={() => handleBooking(itinerary.availableDates[0])}
                        >
                            Book Itinerary
                        </button>
                    </div>

                    <div className={styles.rightButton}>
                        <button
                            className={styles.secondaryButton}
                            onClick={share}
                        >
                            <ShareIcon  size={50} />
                        </button>
                    </div>
                </div>
                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </>
    );
};

export default ItinerarydetailsPage;
