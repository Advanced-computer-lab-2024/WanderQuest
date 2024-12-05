'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import styles from '/Styles/TouristHistory.module.css';
import AddComment from '../../../../components/AddComment';
import AddRating from '../../../../components/AddRating';


const TouristHistory = () => {
    //const [followedGuides, setFollowedGuides] = useState([]);
    // const [tourGuideData, setTourGuideData] = useState(null);
    const [pastItineraries, setPastItineraries] = useState(null);
    const [attendedActivities, setAttendedActivities] = useState(null);
    const [pastOrders, setPastOrders] = useState([]);
    const [onOrders, setOnOrders] = useState([]);
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



    // useEffect(() => {
    //     const fetchItineraries = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:4000/itinerary/myItineraries/${tourGuideData._id}`,{
    //                 credentials: 'include',
    //             });
    //             const data = await response.json();
    //             //const guideID = data.map(itinerary => itinerary.createdBy);
    //             setPastItineraries(data);
    //         } catch (error) {
    //             console.error('Error fetching itineraries:', error);
    //         }
    //     };
    //     fetchItineraries();
    // }, [lastUpdated]);


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/upcomingActivities',{
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.length !== 0){
                    //setAttendedActivities(data);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        }
        fetchActivities();
    }, [lastUpdated]);

    

    useEffect(()=> {
        const fetchOrders = async () => {
            try{
                const response = await fetch('http://localhost:4000/tourist/orders',{
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.length !== 0){
                    for(let counter = 0; counter < data.length; counter++){
                        if(data[counter].status === 'sent to delivery' || data[counter].status === 'pending'){
                            setOnOrders(prev => [...prev, data[counter]]);
                        }else{
                            setPastOrders(prev => [...prev, data[counter]]);
                        }
                    }
                }
                if(onOrders.length === null){
                    setOnOrders([]);
                }
                if(pastOrders.length === null){
                    setPastOrders([]);
                }
            }catch(error){
                console.error("API Problem", error);
            }
        }
        fetchOrders();
    }, [lastUpdated]);


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

    // const handleOrderCancel = async (e, id) => {
    //     e.preventDefault();
    //     const response = await fetch(`http://localhost:4000/tourist/orders/cancel/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //     });
    //     if(response.ok){
    //         setLastUpdated(id);
    //         setOnOrders(prev => prev.filter(order => order._id !== id));
    //         setPastOrders(prev => [...prev, { ...orderToCancel, status: 'canceled' }]);
    //     }
    //     else{
    //         console.log('Error cancelling order');
    //     }
    // }

    const handleOrderCancel = async (e, id) => {
        e.preventDefault();
        const orderToCancel = onOrders.find(order => order._id === id); // Retrieve the canceled order.
    
        if (!orderToCancel) {
            console.log('Order not found');
            return;
        }
    
        const response = await fetch(`http://localhost:4000/tourist/orders/cancel/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    
        if (response.ok) {
            setLastUpdated(id); // Assuming this triggers a re-fetch or re-render elsewhere.
            setOnOrders(prev => prev.filter(order => order._id !== id)); // Remove the order from active list.
            setPastOrders(prev => [...prev, { ...orderToCancel, status: 'canceled' }]); // Add to past orders.
        } else {
            console.log('Error cancelling order');
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
        <div>
            <h2 className={styles.otherTitle}>Rate Your Experience</h2>
        <div className={styles.innerBox}>
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
        </div>
        </div>
    )}
</div>

<div>
    {activeButton === 'Orders' && (
        <div>
            <h2 className={styles.otherTitle}>Your Orders</h2>
        <div className={styles.innerBox}>
        <h2 className={styles.innerTitle}>Active Orders</h2>
            <div className={styles.tabInBox}>
                <div>
                    {onOrders.length > 0 ? (
                        onOrders.map((order,index) => (
                            <div key={index} className={styles.innerBox}>
                                <h2 className={styles.innerTitle}>Order</h2>
                                {/* <img src={order.picture} alt="Order Image" /> */}
                                <p><strong>Product(s):</strong></p>
                                {order.products.map((prod,index) => (
                                    <div key={index} className={styles.innerBox}>
                                        <p>{/*<strong>Product:</strong>*/}{prod.name}</p>
                                        <p><strong>Quantity:</strong>{prod.quantity}</p>
                                        <p><strong>Rating:</strong>{prod.rating ?? "N/A"}</p>
                                    </div>
                                ))}
                                <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                                <p><strong>Total Price:</strong>{order.totalPrice}</p>
                                <p><strong>Status:</strong>{order.status}</p>
                                <button className={styles.cancelButton} onClick={(e)=>handleOrderCancel(e, order._id)}>Cancel</button>
                            </div>
                        ))
                    ) : (
                        <p>No Current Orders</p>
                    )}
                </div>
            </div>
            
            <div>
            <h2 className={styles.innerTitle}>Previous Orders</h2>
            <div className={styles.tabInBox}>
                <div>
                    {pastOrders.length > 0 ? (
                        pastOrders.map((order,index)=>(
                            <div key={index} className={styles.innerBox}>
                                <h2 className={styles.innerTitle}>Order</h2>
                                {/* <img src={order.picture} alt="Order Image" /> */}
                                <p><strong>Product(s):</strong></p>{order.products.map((prod,index) => (
                                    <div key={index} className={styles.innerBox}>
                                        <p>{/*<strong>Product:</strong>*/}{prod.name}</p>
                                        <p><strong>Quantity:</strong>{prod.quantity}</p>
                                        <p><strong>Rating:</strong>{prod.rating ?? "N/A"}</p>
                                    </div>
                                ))}
                                <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString(/*'en-US', {year:'numeric', month:'long', day:'numeric'}*/)}</p>
                                <p><strong>Total Price:</strong>{order.totalPrice}</p>
                                <p><strong>Status:</strong>{order.status}</p>
                            </div>
                        ))
                        ) : ( <p>No Orders Yet</p> )}
                </div>
            </div>
            </div>
        </div>
        </div>
    )}
</div>

<div>
    {activeButton === 'Events' && (
        <div>
            <h2 className={styles.otherTitle}>Your Events</h2>
        <div className={styles.innerBox}>
            <h2 className={styles.innerTitle}>Upcoming Events</h2>
            <div className={styles.tabInBox}>
                <div>
                    {ongoingEvents ? (
                        ongoingEvents.map((event) => (
                            <div key={event._id} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {event.title}</p>
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
            <></>
            <h2 className={styles.innerTitle}>Past Events</h2>
            <div className={styles.tabInBox}>
                <div>
                    {pastEvents ? (
                        pastEvents.map((activity) => (
                            <div key={activity._id} className={styles.innerBox}>
                                <p><strong>Activity:</strong> {activity.title}</p>
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
