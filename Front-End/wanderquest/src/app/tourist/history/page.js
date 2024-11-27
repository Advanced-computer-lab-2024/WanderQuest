'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import styles from '/Styles/TouristHistory.module.css';
import AddComment from '../../../../components/AddComment';
import AddRating from '../../../../components/AddRating';


const TouristHistory = () => {
    const [followedGuides, setFollowedGuides] = useState(null);
    const [tourGuideData, setTourGuideData] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);
    const [attendedActivities, setAttendedActivities] = useState([]);
    const [touristID, setTouristID] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [itiFeedback, setItiFeedback] = useState({});

    const [activityFeedback, setActivityFeedback] = useState({});


    const guideID = "672e33ac93c8d93da59e6f4d"; // Hardcoded for now, will be dynamic in the future


    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await fetch("http://localhost:4000/tourGuide/tourGuideId");
                const data = await response.json();
                setFollowedGuides(data);
                console.log('Guide ID:', data);
            } catch (error) {
                console.error('Error fetching guide:', error);
            }
        };
        fetchGuide();
    }, []);

    // Fetch tourist ID
    useEffect(() => {
        const fetchTourist = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/touristId');
                const data = await response.json();
                setTouristID(data);
                console.log('Tourist ID:', data);
            } catch (error) {
                console.error('Error fetching tourist:', error);
            }
        };
        fetchTourist();
    }, []);

    // Fetch profile once followedGuides is available
    useEffect(() => {
        const fetchProfile = async () => {
            if (!followedGuides || followedGuides.length === 0) {
                // Ensuring followedGuides is set and not empty
                console.log("Guide ID is not available or empty."); // Debugging line
                return;
            }
            try {
                console.log('Guide new ID:', followedGuides);
                const response = await fetch(`http://localhost:4000/tourGuide/profile/${followedGuides}`);
                const data = await response.json();
                setTourGuideData(data);
                console.log('Profile:', data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [followedGuides]);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await fetch(`http://localhost:4000/tourGuide/myItineraries/${guideID}`);
                const data = await response.json();
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
                const response = await fetch(`http://localhost:4000/activityRoutes/myActivities/${guideID}`);
                const data = await response.json();
                setAttendedActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        }
        fetchActivities();
    }, [lastUpdated]);

    const handleFeedback = async () => {
        try {

            console.log('Rating:', rating);
            console.log('Comment:', comment);
            const ratingResp = await fetch(`http://localhost:4000/tourGuide/rate/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ touristId: touristID, rating: rating })
            });
            const commentResp = await fetch(`http://localhost:4000/tourGuide/comment/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            body: JSON.stringify({ touristID, rating: rating }),
        });

        const commentFeedback = await fetch(`http://localhost:4000/itinerary/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
            body: JSON.stringify({ touristId: touristID, rating: rating }),
        });
        const commentFeedback = await fetch(`http://localhost:4000/activityRoutes/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
            <div className={styles.histContainer}>
                <h2 className={styles.histTitle}>History</h2>
                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Followed Tour Guides</h2>

                    {tourGuideData ? (
                        <div>
                            <p>Username: {tourGuideData.username}</p>
                            <p>Email: {tourGuideData.email}</p>
                            <AddRating rating={rating} setRating={setRating} />
                            <AddComment comment={comment} setComment={setComment} />
                            <button className={styles.btnFeedback} onClick={handleFeedback} >Send</button>
                            <div>
                                {showMessage && lastUpdated === tourGuideData._id ? <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>Feedback sent successfully</p> : null}
                            </div>
                        </div>
                    )
                        :
                        (<p> No Followed Tour Guides</p>)}
                </div>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>List of Itineraries</h2>
                    <div>
                        {pastItineraries ? (pastItineraries.map((itinerary) => (
                            <div key={itinerary._id} className={styles.innerBox}>
                                <p><strong>Title: {itinerary.title}</strong></p>
                                <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                                <p><strong>Time:</strong> {itinerary.time.join(', ')}</p>
                                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                                <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                                <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                                <p><strong>Price:</strong> {itinerary.price}</p>
                                <p><strong>Rating:</strong> {itinerary.rating}</p>
                                <AddRating rating={itiFeedback[itinerary._id]?.rating || ''}
                                    setRating={(value) => handleItiFeedbackChange(itinerary._id, 'rating', value)} />
                                <AddComment comment={itiFeedback[itinerary._id]?.comment || ''}
                                    setComment={(value) => handleItiFeedbackChange(itinerary._id, 'comment', value)} />
                                <button className={styles.btnFeedback}
                                    onClick={(e) => handleItiFeedback(e, itinerary._id)}>
                                    Send </button>
                                <div>
                                    {showMessage && lastUpdated === itinerary._id ? <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>Feedback sent successfully</p> : null}
                                </div>
                            </div>

                        ))) : (<p>No itineraries available</p>)}
                    </div>
                </div>


                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Attended Activities</h2>
                    {attendedActivities.length > 0 ? (
                        attendedActivities.map((activity, index) => (
                            <div key={index} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {activity.title}</p>
                                <p><strong>ID:</strong> {activity._id}</p>
                                <p><strong>Date:</strong> {activity.date}</p>
                                <p><strong>Price:</strong> {activity.price}</p>
                                <p><strong>Location:</strong> {activity.location}</p>
                                <p><strong>Category:</strong> {activity.category}</p>
                                <p><strong>Rating:</strong> {activity.rating} </p>
                                <AddRating rating={activityFeedback[activity._id]?.rating || ''}
                                    setRating={(value) => handleActivityFeedbackChange(activity._id, 'rating', value)} />
                                <AddComment comment={activityFeedback[activity._id]?.comment || ''}
                                    setComment={(value) => handleActivityFeedbackChange(activity._id, 'comment', value)} />
                                <button className={styles.btnFeedback}
                                    onClick={(e) => handleActivityFeedback(e, activity._id)}> Send </button>
                                <div>
                                    {showMessage && lastUpdated === activity._id ? <p className={`${styles.confirmMessage} ${showMessage ? styles.fadeOut : ''}`}>Feedback sent successfully</p> : null}

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No attended activities available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TouristHistory;
