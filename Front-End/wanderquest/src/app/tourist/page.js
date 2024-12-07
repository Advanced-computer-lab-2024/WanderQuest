'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import styles from '../../../Styles/Tourist.module.css'
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import Wishlist from '../../../components/Wishlist';
import Complaints from '../../../components/Complaints';
import Image from 'next/image';
import Mountains from '../../../imgs/Mountains.jpg';
import { Playball } from 'next/font/google';

const playball = Playball({
  weight: '400',
  subsets: ['latin'],
});

export default function Tourist() {
    
    const router = useRouter();
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);

    const handleRedirect = () => {
        router.push('/tourist/iti');
    };
    const handleRedirectp = () => {
        router.push('/tourist/products');
    };
    const handleRedirectm = () => {
        router.push('/tourist/musuem');
    };
    const handleRedirectac = () => {
        router.push('/tourist/activity');
    };
    const handleRedirectcomp = () => {
        router.push('/tourist/complaint');
    };
    const handleRedirectviewcomp = () => {
        router.push('/tourist/viewComplaint');

    };
    const handleRedirectHist = () => {
        router.push('/tourist/history');
    };
    const handleRedirec = () => {
        router.push('/tourist/mybookings');
    };
    const handleRedirechotel = () => {
        router.push('/tourist/Hotels');
    };
    const handleRedirecflight = () => {
        router.push('/tourist/Flights');
    };
    const handleRedirectransport = () => {
        router.push('/tourist/transportation');
    };
    const handleRedirectProfile = () => {
        router.push('/tourist/profile');
    };

    const handleRedirectWishlist = () => {
        setIsWishlistOpen(true);
    };

    const handleViewComplaints = () => {
        setIsComplaintsOpen(true);
    };
    
    

    return (
        <>
            <Navbar  />
            <div className={styles.container}>
                <div className={styles.heroSection}>
                    <Image className={styles.heroImage}
                        src={Mountains}
                        alt="Mountain landscape with starry night sky"
                        priority
                    />
                    <h1 className={`${styles.heroText} ${playball.className}`}>
                        Explore the world
                    </h1>
                </div>
                

                <div className={styles.buttons}>
                    <button onClick={handleRedirect}>Go to Itinerary</button>
                    <button onClick={handleRedirectac}>Go to activity</button>
                    <button onClick={handleRedirectp}>Go to products</button>
                    <button onClick={handleRedirectm}>Go to museums</button>
                    <button onClick={handleRedirectcomp}>File a complaint</button>
                    <button onClick={handleRedirectviewcomp}>View Complaint</button>
                    <button onClick={handleRedirectHist}>Go to History</button>
                    <button onClick={handleRedirec}>My Bookings</button>
                    <button onClick={handleRedirechotel}>Hotels</button>
                    <button onClick={handleRedirecflight}>Flights</button>
                    <button onClick={handleRedirectransport}>Transportation</button>
                    <button onClick={handleRedirectWishlist}>View Wishlist</button>
                    <button onClick={handleViewComplaints}>View Complaint</button>

                </div>

                {/* Profile button with icon */}
                <button className={styles.profileButton} onClick={handleRedirectProfile}>
                    <FaUserCircle className={styles.profileIcon} /> Profile
                </button>
            </div>

            {/* Updated Wishlist Sliding Panel */}
            <div className={`${styles.wishlistContainer} ${isWishlistOpen ? styles.visible : ''}`}>
                <div className={`${styles.wishlistPanel} ${isWishlistOpen ? styles.open : ''}`}>
                    <button 
                        className={styles.closeButton}
                        onClick={() => setIsWishlistOpen(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>My Wishlist</h2>
                    <Wishlist />
                </div>
            </div>

            {/* Complaints Sliding Panel */}
            <div className={`${styles.complaintsContainer} ${isComplaintsOpen ? styles.visible : ''}`}>
                <div className={`${styles.complaintsPanel} ${isComplaintsOpen ? styles.open : ''}`}>
                    <button 
                        className={styles.closeButton}
                        onClick={() => setIsComplaintsOpen(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>My Complaints</h2>
                    <Complaints role='Tourist' />
                </div>
            </div>
        </>
    );
};
