'use client'
import {useState, useEffect} from 'react';
import Navbar from "../../../../components/Navbar";
import styles from '/Styles/TouristHistory.module.css';
import AddComment from '../../../../components/AddComment';
import AddRating from '../../../../components/AddRating';

const TouristHistory = () => {
    
    const [followedGuides, setFollowedGuides] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);
    const [attendedActivities, setAttendedActivities] = useState([]);

    const [formData, setFormData] = useState([
        {
            rating: '',
            comment: '',
        }
    ]);

    const id1 = "507f1f77bcf86cd799439011";
    const id2 = "672e33ac93c8d93da59e6f4d";

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                // Fetch all guides in parallel using Promise.all
                const responses = await fetch("http://localhost:4000/tourGuide/tourGuideId");
                const data = await responses.json();
                setFollowedGuides(data);
            } catch (error) {
                console.error("Error fetching guides:", error);
            }
        };

        fetchGuides();
    }, []);

    return ( 
        <div>
            <Navbar/>
            <div className={styles.histContainer}>
                <h2 className={styles.histTitle}>History</h2>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Followed Tour Guides</h2>
                        <div className={styles.pastItern} >
                            {followedGuides.username}

                        </div>
                </div>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Itineraries by Followed Tour Guides</h2>
                </div>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Attended Activities</h2>
                </div>
            </div>
        </div>
     );
}
 
export default TouristHistory;