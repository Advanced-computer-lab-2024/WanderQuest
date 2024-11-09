'use client'
import {useState, useEffect} from 'react';
import Navbar from "../../../../components/Navbar";
import styles from '/Styles/TouristHistory.module.css';
import AddComment from '../../../../components/AddComment';
import AddRating from '../../../../components/AddRating';

const TouristHistory = () => {
    
    const [followedGuides, setFollowedGuides] = useState({});
    const [pastItineraries, setPastItineraries] = useState({});
    const [attendedActivities, setAttendedActivities] = useState({});

    const [formData, setFormData] = useState([
        {
            rating: '',
            comment: '',
        }
    ]);

    return ( 
        <div>
            <Navbar/>
            <div className={styles.histContainer}>
                <h2 className={styles.histTitle}>History</h2>

                <div className={styles.innerContainer}>
                    <h2 className={styles.innerTitle}>Followed Tour Guides</h2>
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