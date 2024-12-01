'use client';
import Navbar from "../../../../../components/Navbar";
import { useState, useEffect } from "react";
import styles from '/Styles/Itineraries.module.css';

const ItinerarydetailsPage = ({ params }) => {
    const id = params.id;
    const [id1, setid] = useState('');
    const [itinerary, setAllItineraries] = useState({});
    const [activityDetails, setActivityDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    
    if (loading) return <p>Loading itinerary...</p>;
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
    

    return (
        <>
            <Navbar />
            <div className={styles.itinerary}>
                <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
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
                                <strong>Day {idx + 1}:</strong> {entry.trim()}
                            </div>
                            ))}
                        </div>
                        </div>



                <p><strong>Duration:</strong> {itinerary.duration}</p>
                <p><strong>Language:</strong> {itinerary.language}</p>
                <p><strong>Price:</strong> ${itinerary.price}</p>
                <p><strong>Rating:</strong> {itinerary.rating}</p>
                <div className={styles.datesContainer}>
                    <strong className={styles.datesLabel}>Available dates:</strong>
                    <div className={styles.dates}>
                        {itinerary.availableDates && itinerary.availableDates.length > 0 ? (
                        <select className={styles.dateSelect}>
                            {itinerary.availableDates.map((date, idx) => (
                            <option key={idx} value={date}>
                                {new Date(date).toLocaleDateString()}
                            </option>
                            ))}
                        </select>
                        ) : (
                        <p>No available dates</p>
                        )}
                    </div>
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

                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
                
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
                                    <strong>{touristId}:</strong>
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


                <button className={styles.searchbtn} onClick={() => { handleBooking(itinerary.availableDates[0]) }} >
                    Book
                </button>
         
                <button className={styles.searchbtn} onClick={share}>share link</button>

            </div>
        </>
    );
};

export default ItinerarydetailsPage;
