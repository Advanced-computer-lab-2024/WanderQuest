'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';
import styles from "../../../Styles/TourGuide.module.css";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import backGround from '../../../public/guideHome.jpg';
import Salesreptour from '../../../components/Salesreptour';

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
            const response = await fetch('http://localhost:4000/authentication/user',{
                credentials: "include",
            });
            const data = await response.json();
            setMyID(data._id);
            console.log(data._id);
            console.log(data.role);
        };
        fetchMyID();
    },[]);

    // useEffect(()=>{
    //     const fetchProfile = async () => {
    //         const response = await fetch(`http://localhost:4000/tourGuide/profile`);
    //         const data = await response.json();
    //         console.log(data._id);
    //     }
    //     fetchProfile();
    // },[])

    



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
            <div className={styles.buttonContainer}>
            <button className={styles.back} onClick={handleRedirect}>My Itineraries</button>
            <button className={styles.back} onClick={handleRedirectp}>Create Itineraries</button>
            </div>
            <Salesreptour/>
        </div>
    );
};
