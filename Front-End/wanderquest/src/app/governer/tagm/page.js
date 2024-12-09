'use client';

import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import TagManager from '../../../../components/TagManager';
import { useRouter } from 'next/navigation';
import styles from '../../../../styles/tagm.module.css';


const activitypage = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.back();
    }

    return (
        <div>
            <Navbar />
            <div className={styles.buttonContainer}>
                <button className={styles.back} onClick={handleRedirect}>Back To Home</button>
            </div>
            <TagManager></TagManager>
            <div className={styles.buttonContainer}>
                <button className={styles.back} onClick={handleRedirect}>Back To Home</button>
            </div>
        </div>
    );
};

export default activitypage;