'use client'
import Navbar from "../../../../components/Navbar";
import styles from '/Styles/TouristHistory.module.css';

const TouristHistory = () => {
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