'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';
import styles from "../../../Styles/TourGuide.module.css";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import backGround from '../../../public/guideHome.jpg';

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

    const [myID, setMyID] = useState('');

    const [activities, setActivities] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        const fetchMyID = async () => {
            const response = await fetch('http://localhost:4000/authentication/user');
            const data = await response.json();
            setMyID(data._id);
            console.log(data._id);
            console.log(data.role);
        };
        fetchMyID();
    },[]);

    useEffect(()=>{
        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:4000/tourGuide/profile`);
            const data = await response.json();
            console.log(data._id);
        }
    },[])

    useEffect(() => {
        const fetchActivities = async () => {
            const id = '507f1f77bcf86cd799439011';
            const response = await fetch(`http://localhost:4000/activityRoutes/myActivities/${id}`);
            const data = await response.json();
            setActivities(data);
        };
        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchItineraries = async () => {
            const id2 = '507f1f77bcf86cd799439013';
            const response = await fetch(`http://localhost:4000/tourGuide/myItineraries/${id2}`);
            const data = await response.json();
            setItineraries(data);
        };
        fetchItineraries();
    }
    , []);

    useEffect(() => {
        const fetchHistorical = async () => {
            const id3 = '507f1f77bcf86cd799439011';
            const response = await fetch(`http://localhost:4000/tourismGovernor/myPlaces/${id3}`);
            const data = await response.json();
            setPlaces(data);
        };
        fetchHistorical();
    }, []);



    return (
        <div>
            <Navbar/>
            <AcceptTerms/>
            <div className={styles.heroSection}>
                <Image src={backGround} className={styles.heroImage} alt="background" layout="fill" objectFit="cover" quality={100} />
                <div className={styles.heroTitle}>
                    <h1>Tour Guide</h1>
                    </div>
            </div>
            <div >

            </div>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud iti</button>
            {/* <button className={styles.profileButton} onClick={handleRedirectProfile}>
                <FaUserCircle className={styles.profileIcon} /> Profile
            </button>
       */}
        </div>
    );
};
