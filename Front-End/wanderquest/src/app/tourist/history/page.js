'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import styles from '/Styles/TouristHistory.module.css';
import AddComment from '../../../../components/AddComment';
import AddRating from '../../../../components/AddRating';


const TouristHistory = () => {
    //const [followedGuides, setFollowedGuides] = useState([]);
    const [tourGuideData, setTourGuideData] = useState(null);
    const [pastItineraries, setPastItineraries] = useState(null);
    const [attendedActivities, setAttendedActivities] = useState(null);
    const [pastOrders, setPastOrders] = useState(null);
    const [onOrders, setOnOrders] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [ongoingEvents, setOngoingEvents] = useState(null);
    const [touristID, setTouristID] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [itiFeedback, setItiFeedback] = useState({});

    const [activityFeedback, setActivityFeedback] = useState({});

    const [activeButton, setActiveButton] = useState('Orders');
    const [showGuidePopup, setShowGuidePopup] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);


    //const guideID = "672e33ac93c8d93da59e6f4d"; // Hardcoded for now, will be dynamic in the future


    // useEffect(() => {
    //     const fetchGuide = async () => {
    //         try {
    //             const response = await fetch("http://localhost:4000/tourGuide/tourGuideId",{
    //                 credentials: 'include',
    //             });
    //             const data = await response.json();
    //             setFollowedGuides(data);
    //             console.log('Guide ID:', data);
    //         } catch (error) {
    //             console.error('Error fetching guide:', error);
    //         }
    //     };
    //     fetchGuide();
    // }, []);

    // Fetch tourist ID
    useEffect(() => {
        const fetchTourist = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/profile',{
                    credentials: 'include',
                });
                const data = await response.json();
                const touristID = data._id;
                setTouristID(touristID);
                console.log('Tourist ID:', touristID);
            } catch (error) {
                console.error('Error fetching tourist:', error);
            }
        };
        fetchTourist();
    }, []);

    // Fetch profile once followedGuides is available
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         if (!followedGuides || followedGuides.length === 0) {
    //             // Ensuring followedGuides is set and not empty
    //             console.log("Guide ID is not available or empty."); // Debugging line
    //             return;
    //         }
    //         try {
    //             console.log('Guide new ID:', followedGuides);
    //             const response = await fetch(`http://localhost:4000/tourGuide/profile/${followedGuides}`,{
    //                 credentials: 'include',
    //             });
    //             const data = await response.json();
    //             setTourGuideData(data);
    //             console.log('Profile:', data);
    //         } catch (error) {
    //             console.error('Error fetching profile:', error);
    //         }
    //     };

    //     fetchProfile();
    // }, [followedGuides]);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await fetch(`http://localhost:4000/itinerary/myItineraries/${tourGuideData._id}`,{
                    credentials: 'include',
                });
                const data = await response.json();
                //const guideID = data.map(itinerary => itinerary.createdBy);
                setPastItineraries(data);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        };
        fetchItineraries();
    }, [lastUpdated]);


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/upcomingActivities',{
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.length !== 0){
                    setAttendedActivities(data);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        }
        fetchActivities();
    }, [lastUpdated]);

    useEffect(() => {
        const fetchPastOrders = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setPastOrders(data);
            } catch (err){
                console.error("API Problem", error);
            }
        }
    },[lastUpdated]);

    useEffect(() => {
        const fetchOnOrders = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setOnOrders(data);
            } catch (err){
                console.error("API Problem", error);
            }
        }
    },[lastUpdated]);

    useEffect(() => {
        const fetchpastEvents = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setPastEvents(data);
            } catch (err){
                console.error("API Problem", error);
            }
        }
    },[lastUpdated]);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/upcomingActivities',{
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.length !== 0){
                    setOngoingEvents(data);
                }
                
            } catch (err){
                console.error("API Problem", error);
            }
        }
        fetchUpcomingEvents();
    },[lastUpdated]);

    const handleFeedback = async () => {
        try {

            console.log('Rating:', rating);
            console.log('Comment:', comment);
            const ratingResp = await fetch(`http://localhost:4000/tourGuide/rate/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ touristId: touristID, rating: rating })
            });
            const commentResp = await fetch(`http://localhost:4000/tourGuide/comment/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ touristId: touristID, comment })
            });
            if (ratingResp.ok && commentResp.ok) {
                console.log('Feedback sent successfully');
                setRating(0);
                setComment("");
                setLastUpdated(tourGuideData._id);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            } else {
                console.log(ratingResp.json(), commentResp.json());
            }
        } catch (error) {
            console.log('Something is wrong in your call', error);
        }

    }
    const handleGuidePopup = async (guideId) => {
        try {
            const response = await fetch(`http://localhost:4000/tourGuide/profile/${guideId}`);
            const data = await response.json();
            setSelectedGuide(data); // Store guide details in state
            setShowGuidePopup(true); // Open the popup
        } catch (error) {
            console.error('Error fetching guide details:', error);
        }
    };
    

    const handleItiFeedbackChange = (id, type, value) => {
        setItiFeedback(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [type]: value
            }
        }));
    };

    const handleActivityFeedbackChange = (id, type, value) => {
        setActivityFeedback(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [type]: value
            }
        }));
    };



    const handleItiFeedback = async (e, id) => {
        e.preventDefault();
        const { rating = '', comment = '' } = itiFeedback[id] || {};

        const ratingFeedback = await fetch(`http://localhost:4000/itinerary/rate/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ touristID, rating: rating }),
        });

        const commentFeedback = await fetch(`http://localhost:4000/itinerary/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ touristID, comment }),
        });

        if (commentFeedback.ok && ratingFeedback.ok) {
            setItiFeedback(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });
            setLastUpdated(id);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            console.log('Feedback sent successfully for activity ID:', id);
        }
    };

    const handleActivityFeedback = async (e, id) => {
        e.preventDefault();
        const { rating = '', comment = '' } = activityFeedback[id] || {};

        const ratingFeedback = await fetch(`http://localhost:4000/activityRoutes/activity/rate/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ touristId: touristID, rating: rating }),
        });
        const commentFeedback = await fetch(`http://localhost:4000/activityRoutes/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ touristId: touristID, comment }),
        });
        if (ratingFeedback.ok && commentFeedback.ok) {
            setActivityFeedback(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });
            setLastUpdated(id);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            console.log('Feedback sent successfully for activity ID:', id);
        }
    };




    return (
        <div>
            <Navbar />
            <h2 className={styles.histTitle}>History</h2>
            <div className={styles.histContainer}>
            <div className={styles.tabContainer}>
             <button className={`${styles.tabButton} ${activeButton === 'Orders' ? styles.activeTab : ''}`} onClick={() => setActiveButton('Orders')}>
                    Orders
             </button>
                <button className={`${styles.tabButton} ${activeButton === 'Events' ? styles.activeTab : ''}`}onClick={() => setActiveButton('Events')}>
                    Events
              </button>
              <button className={`${styles.tabButton} ${activeButton === 'Rate' ? styles.activeTab : ''}`} onClick={() => setActiveButton('Rate')}>
                    Itineraries
             </button>
            </div>
            <div>
    {activeButton === 'Rate' && (
        <div className={styles.innerBox}>
            <h2 className={styles.innerTitle}>Rate Your Experience</h2>
            {/* Followed Tour Guides Section
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Followed Tour Guides</h2>

                {tourGuideData ? (
                    <div>
                        <p>Username: {tourGuideData.username}</p>
                        <p>Email: {tourGuideData.email}</p>
                        <AddRating rating={rating} setRating={setRating} />
                        <AddComment comment={comment} setComment={setComment} />
                        <button className={styles.btnFeedback} onClick={handleFeedback}>Send</button>
                        <div>
                            {showMessage && lastUpdated === tourGuideData._id ? (
                                <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>
                                    Feedback sent successfully
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <p>No Followed Tour Guides</p>
                )}
            </div> */}

            {/* List of Itineraries Section */}
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>List of Itineraries</h2>
                <div>
                    {pastItineraries ? (
                        pastItineraries.map((itinerary) => (
                            <div key={itinerary._id} className={styles.innerBox}>
                                <p><strong>Title: {itinerary.title}</strong></p>
                                <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                                <p><strong>Time:</strong> {itinerary.time.join(', ')}</p>
                                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                                <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                                <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                                <p><strong>Price:</strong> {itinerary.price}</p>
                                <button className={styles.linkButton} onClick={() => handleGuidePopup(itinerary.createdBy)}>
                                    View Tour Guide
                                </button>
                                <p><strong>Rating:</strong> {itinerary.rating}</p>
                                <AddRating 
                                    rating={itiFeedback[itinerary._id]?.rating || ''} 
                                    setRating={(value) => handleItiFeedbackChange(itinerary._id, 'rating', value)} 
                                />
                                <AddComment 
                                    comment={itiFeedback[itinerary._id]?.comment || ''} 
                                    setComment={(value) => handleItiFeedbackChange(itinerary._id, 'comment', value)} 
                                />
                                <button 
                                    className={styles.btnFeedback} 
                                    onClick={(e) => handleItiFeedback(e, itinerary._id)}
                                >
                                    Send
                                </button>
                                <div>
                                    {showMessage && lastUpdated === itinerary._id ? (
                                        <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>
                                            Feedback sent successfully
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Itineraries Available</p>
                    )}
                </div>
            </div>

            {/* Attended Activities Section */}
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Attended Activities</h2>
                <div>
                    {attendedActivities ? (
                        attendedActivities.map((activity) => (
                            <div key={activity._id} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {activity.name}</p>
                                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {activity.location}</p>
                                <p><strong>Rating:</strong> {activity.rating}</p>
                                <AddRating 
                                    rating={activityFeedback[activity._id]?.rating || ''} 
                                    setRating={(value) => handleActivityFeedbackChange(activity._id, 'rating', value)} 
                                />
                                <AddComment 
                                    comment={activityFeedback[activity._id]?.comment || ''} 
                                    setComment={(value) => handleActivityFeedbackChange(activity._id, 'comment', value)} 
                                />
                                <button 
                                    className={styles.btnFeedback} 
                                    onClick={(e) => handleActivityFeedback(e, activity._id)}
                                >
                                    Send
                                </button>
                                <div>
                                    {showMessage && lastUpdated === activity._id ? (
                                        <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>
                                            Feedback sent successfully
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Attended Activities</p>
                    )}
                </div>
            </div>
        </div>
    )}
</div>

<div>
    {activeButton === 'Orders' && (
        <div className={styles.innerBox}>
            <h2 className={styles.innerTitle}>Your Orders</h2>
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Ongoing Orders</h2>
                <div>
                    {onOrders ? (
                        onOrders.map((order) => (
                            <div key={order._id} className={styles.innerBox}>
                                <img src={order.picture} alt="Order Image" />
                                <p><strong>Product:</strong> {order.name}</p>
                                <p><strong>Price:</strong>{order.price}</p>
                                <p><strong>Rating:</strong> {order.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Ongoing Orders</p>
                    )}
                </div>
            </div>
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Past Orders</h2>
                <div>
                    {pastOrders ? (
                        pastOrders.map((order)=>(
                            <div key={order._id} className={styles.innerBox}>
                                <img src={order.picture} alt="Order Image" />
                                <p><strong>Product:</strong> {order.name}</p>
                                <p><strong>Price:</strong>{order.price}</p>
                                <p><strong>Rating:</strong> {order.rating}</p>
                                <AddRating 
                                    rating={activityFeedback[activity._id]?.rating || ''} 
                                    setRating={(value) => handleActivityFeedbackChange(activity._id, 'rating', value)} 
                                />
                                <AddComment 
                                    comment={activityFeedback[activity._id]?.comment || ''} 
                                    setComment={(value) => handleActivityFeedbackChange(activity._id, 'comment', value)} 
                                />
                                <button 
                                    className={styles.btnFeedback} 
                                    onClick={(e) => handleActivityFeedback(e, activity._id)}
                                >
                                    Send
                                </button>
                                <div>
                                    {showMessage && lastUpdated === activity._id ? (
                                        <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>
                                            Review sent successfully
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))
                        ) : ( <p>No Orders Yet</p> )}
                </div>
            </div>
        </div>
    )}
</div>

<div>
    {activeButton === 'Events' && (
        <div className={styles.innerBox}>
            <h2 className={styles.innerTitle}>Your Events</h2>
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Upcoming Events</h2>
                <div>
                    {ongoingEvents ? (
                        ongoingEvents.map((event) => (
                            <div key={event._id} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {event.name}</p>
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Rating:</strong> {event.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Upcoming Events</p>
                    )}
                </div>
            </div>
            <div className={styles.innerContainer}>
                <h2 className={styles.innerTitle}>Past Events</h2>
                <div>
                    {pastEvents ? (
                        pastEvents.map((activity) => (
                            <div key={activity._id} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {activity.name}</p>
                                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {activity.location}</p>
                                <p><strong>Rating:</strong> {activity.rating}</p>
                                <AddRating 
                                    rating={activityFeedback[activity._id]?.rating || ''} 
                                    setRating={(value) => handleActivityFeedbackChange(activity._id, 'rating', value)} 
                                />
                                <AddComment 
                                    comment={activityFeedback[activity._id]?.comment || ''} 
                                    setComment={(value) => handleActivityFeedbackChange(activity._id, 'comment', value)} 
                                />
                                <button 
                                    className={styles.btnFeedback} 
                                    onClick={(e) => handleActivityFeedback(e, activity._id)}
                                >
                                    Send
                                </button>
                                <div>
                                    {showMessage && lastUpdated === activity._id ? (
                                        <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>
                                            Feedback sent successfully
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Past Events</p>
                    )}
                </div>
            </div>
            
        </div>
    )}
</div> 

            </div>
            {showGuidePopup && selectedGuide && (
    <div className={styles.popupOverlay}>
        <div className={styles.popupWindow}>
            <button 
                className={styles.closeButton} 
                onClick={() => setShowGuidePopup(false)}
            >
                Close
            </button>
            <h2>Tour Guide Details</h2>
            <p><strong>Username:</strong> {selectedGuide.username}</p>
            <p><strong>Email:</strong> {selectedGuide.email}</p>
            <h3>Rate This Guide</h3>
            <AddRating rating={rating} setRating={setRating} />
            <AddComment comment={comment} setComment={setComment} />
            <button 
                className={styles.btnFeedback} 
                onClick={handleFeedback}
            >
                Submit Feedback
            </button>
        </div>
    </div>
)}
        </div>
    );
};

export default TouristHistory;
