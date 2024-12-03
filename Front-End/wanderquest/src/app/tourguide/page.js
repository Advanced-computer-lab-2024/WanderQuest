'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';
import styles from "../../../Styles/TourGuide.module.css";
import { FaUserCircle } from "react-icons/fa";

export default function TourGuide() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tourguide/viewall');
    };
    const handleRedirectp = () => {
        router.push('/tourguide/crud');
    };
    const handleRedirectProfile = () => {
        router.push('/tourguide/profile');
    };


    return (
        <div>
            <AcceptTerms/>
            <h1>Tour Guide Page</h1>
            <p>Welcome to the Tour Guide page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud iti</button>
            <button className={styles.profileButton} onClick={handleRedirectProfile}>
                <FaUserCircle className={styles.profileIcon} /> Profile
            </button>
      
        </div>
    );
};
