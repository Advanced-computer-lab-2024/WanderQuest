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
    const [touristID, setTouristID] = useState(null); // Hardcoded for now, will be dynamic in the future

    const[rating, setRating] = useState(0);
    const[comment, setComment] = useState('');

    // Hardcoded for now, will be dynamic in the future

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
        


    const handleFeedback = async () => {
        try{

            console.log('Rating:', rating);
            console.log('Comment:', comment);
            const ratingResp = await fetch(`http://localhost:4000/tourGuide/rate/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ touristId : touristID , rating: rating })
            });
            const commentResp = await fetch(`http://localhost:4000/tourGuide/comment/${tourGuideData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ touristId : touristID , comment })
            });
            if (ratingResp.ok && commentResp.ok) {
                console.log('Feedback sent successfully');
                const ratingData = await ratingResp.json();
                setRating(ratingData);
                const commentData = await commentResp.json();
                setComment(commentData);
            } else {
                console.log(ratingResp.json(), commentResp.json());
            }
        }catch (error) {
            console.log('Something is wrong in your call', error);
        }

    }

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
                        <button className={styles.btnFeedback} onClick={handleFeedback}>Send</button>
                        </div>     
                    ) 
                         :
                        (<p></p>) }
                </div>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Itineraries by Followed Tour Guides</h2>
                    {pastItineraries.length > 0 ? (
                        pastItineraries.map((itinerary, index) => (
                            <div key={index} className={styles.itineraryContainer}>
                                <p><strong>Itinerary Title:</strong> {itinerary.title}</p>
                                <p><strong>Description:</strong> {itinerary.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No past itineraries available.</p>
                    )}
                </div>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Attended Activities</h2>
                    {attendedActivities.length > 0 ? (
                        attendedActivities.map((activity, index) => (
                            <div key={index} className={styles.activityContainer}>
                                <p><strong>Activity Name:</strong> {activity.name}</p>
                                <p><strong>Date:</strong> {activity.date}</p>
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
