'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import WishlistPanel from './WishlistPanel';
import ComplaintsPanel from './ComplaintsPanel';
import styles from '../Styles/Navbar.css';
import NotificationButton from './NotificationsTourGuide';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Navbar = () => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
    const [role, setRole] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [user, setUser] = useState({});



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:4000/authentication/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Automatically include credentials (user session)
                });

                if (response.ok) {
                    const result = await response.json();
                    setUser(result);
                    setRole(result.role);
                } else {
                    const errorData = await response.json();
                    setUser({});
                }
            } catch (error) {
                setUser({});
            }
        };

        fetchUserData();
    }, []);

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/authentication/logout', {}, {
                withCredentials: true,
            });
            // Redirect to home page after logout
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleRedirect = () => window.location.href = '/tourist/itinerary';
    const handleRedirectac = () => window.location.href = '/tourist/activity';
    const handleRedirectp = () => window.location.href = '/tourist/products';
    const handleRedirectm = () => window.location.href = '/tourist/museums';
    const handleRedirectcomp = () => window.location.href = '/tourist/file-complaint';
    const handleRedirectviewcomp = () => window.location.href = '/tourist/view-complaint';
    const handleRedirectHist = () => window.location.href = '/tourist/history';
    const handleRedirec = () => window.location.href = '/tourist/bookings';
    const handleRedirechotel = () => window.location.href = '/tourist/hotels';
    const handleRedirecflight = () => window.location.href = '/tourist/flights';
    const handleRedirectransport = () => window.location.href = '/tourist/transportation';
    const handleRedirectWishlist = () => window.location.href = '/tourist/wishlist';
    const handleViewComplaints = () => window.location.href = '/tourist/view-complaint';

    return (
        <>
            <div className="navbar-container">
                <div className='navbar-leftside'>
                    <Link href="/">
                        <img className="navbar-logo" src="/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className='navbar-middleside'>
                    {role == "advertiser" && (
                        <div className={styles.buttons}>
                            <button onClick={() => window.location.href = '/advertiser/activitys'}>Activities</button>
                            <button onClick={() => window.location.href = '/advertiser/createactivity'}>Create Activity</button>
                            <button onClick={() => window.location.href = '/advertiser/createTransportation'}>Create Transportation</button>
                            <button onClick={() => window.location.href = '/advertiser/transportation'}>Transportation</button>
                        </div>
                    )}
                    {role == "tourist" && (
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
                    )}
                    {role == "" && (
                        <div className={styles.buttons}>
                            <button onClick={() => window.location.href = '/guest/itinerary'}>Go to Itinerary</button>
                            <button onClick={() => window.location.href = '/guest/activity'}>Go to activity</button>
                            <button onClick={() => window.location.href = '/guest/museums'}>Go to museums</button>
                        </div>
                    )}
                    {role == "seller" && (
                        <div className={styles.buttons}>
                            <button onClick={() => window.location.href = '/seller/createprod'}>Create Product</button>
                            <button onClick={() => window.location.href = '/seller/products'}>View Products</button>
                        </div>
                    )}
                    {role == "tourGuide" && (
                        <div className={styles.buttons}>
                            <button onClick={() => window.location.href = '/tourguide/crud'}>CRUD Operations</button>
                            <button onClick={() => window.location.href = '/tourguide/viewAll'}>View All</button>
                        </div>
                    )}
                    {role != "advertiser" && role != "tourist" && role != "seller" && role != "tourGuide" && role != "" && <button className="navbar-button">Products</button>}
                    {role != "advertiser" && role != "tourist" && role != "seller" && role != "tourGuide" && role != "" && <button className="navbar-button">Itinerary</button>}
                    {role != "advertiser" && role != "tourist" && role != "seller" && role != "tourGuide" && role != "" && <button className="navbar-button">Historical Places</button>}
                </div>
                <div className='navbar-rightside'>
                    {role && <NotificationButton role={role} />}
                    {role != "advertiser" && (
                        <>
                            <Link href="/tourist/history">
                                <button className="navbar-history-button">
                                    <svg
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="#1a6187"
                                        strokeWidth="0.00016"
                                        height="30px"
                                        width="30px"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g fill="#1a6187">
                                                <path d="M1.5 1.25a.75.75 0 011.5 0v1.851A7 7 0 111 8a.75.75 0 011.5 0 5.5 5.5 0 101.725-4H5.75a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-3.5z"></path>
                                                <path d="M8.25 4a.75.75 0 01.75.75v3.763l1.805.802a.75.75 0 01-.61 1.37l-2.25-1A.75.75 0 017.5 9V4.75A.75.75 0 018.25 4z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </Link>
                            <button
                                className="navbar-wishlist-button"
                                onClick={() => setIsWishlistOpen(true)}
                            >
                                <svg
                                    viewBox="0 0 64 64"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="3.84"
                                    stroke="#1a6187"
                                    fill="#1a6187"
                                    height="30px"
                                    width="30px"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button
                                className="navbar-complaints-button"
                                onClick={() => setIsComplaintsOpen(true)}
                            >
                                <svg
                                    height="30px"
                                    width="40px"
                                    viewBox="0 0 496 496"
                                    fill="#1a6187"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        stroke="#1a6187"
                                        strokeWidth="3.968"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M496,168.648V64c0-35.288-28.712-64-64-64h-48c-35.288,0-64,28.712-64,64c0,0.456,0.056,0.904,0.072,1.36 C304.896,59.224,288.584,56,272.144,56h-48.28c-16.448,0-32.76,3.224-47.928,9.36C175.944,64.904,176,64.456,176,64 c0-35.288-28.712-64-64-64H64C28.712,0,0,28.712,0,64v104.648L50.808,128h58.184C100.504,145.376,96,164.4,96,183.856 c0,19.504,4.576,38.632,13.2,56.144H64c-35.288,0-64,28.712-64,64v104.648L50.808,368H112c19.72,0,37.368-8.976,49.12-23.04 c6.304,9.68,14.056,18.072,22.88,25.008V392l-49.872,14.976C96.968,418.416,72,452.208,72,491.088V496h16v-4.912 c0-31.808,20.432-59.464,50.832-68.816l10.144-3.12l-6.4,25.584l100.464,41.856l4.96,6.216l4.968-6.208l100.464-41.856 l-6.4-25.584l10.152,3.12c30.392,9.344,50.816,37,50.816,68.808V496h16v-4.912c0-38.872-24.96-72.672-62.12-84.112 l-47.528-14.624L312,392.304V369.96c8.824-6.928,16.576-15.328,22.88-25.008C346.632,359.024,364.28,368,384,368h61.192 L496,408.648V304c0-35.288-28.712-64-64-64h-45.2c8.624-17.512,13.2-36.632,13.2-56.144c0-19.456-4.504-38.48-12.992-55.856 h58.184L496,168.648z M223.856,72h48.28c17.888,0,35.528,4.464,51.352,12.68c6.88,20.056,23.432,35.608,44.08,41.104 c10.72,17.56,16.432,37.552,16.432,58.072c0,20.584-5.816,40.704-16.72,58.432c-5.416,1.472-10.536,3.616-15.28,6.368V224 c0-30.872-25.128-56-56-56h-96c-30.872,0-56,25.128-56,56v24.656c-4.744-2.752-9.872-4.896-15.28-6.368 C117.816,224.56,112,204.44,112,183.856c0-20.528,5.712-40.52,16.424-58.072c20.656-5.496,37.208-21.048,44.08-41.104 C188.328,76.464,205.976,72,223.856,72z M45.192,112L16,135.352V64c0-26.472,21.528-48,48-48h48c26.472,0,48,21.528,48,48 s-21.528,48-48,48H45.192z M112,352H45.192L16,375.352V304c0-26.472,21.528-48,48-48h48c26.472,0,48,21.528,48,48 S138.472,352,112,352z M161.432,435.264l5.4-21.608l14.32-4.408L222.24,460.6L161.432,435.264z M248,467.2l-48-60.008V400v-8 v-11.688C214.496,387.856,230.848,392,248,392s33.504-4.144,48-11.688V392v8v7.192L248,467.2z M314.848,409.248l14.32,4.408 l5.4,21.608L273.76,460.6L314.848,409.248z M325.312,329.464C309.912,358.192,280.704,376,248,376 c-32.704,0-61.912-17.808-77.312-46.536c3.4-7.816,5.312-16.416,5.312-25.464c0-16.168-6.072-30.912-16-42.192V224 c0-22.056,17.944-40,40-40h96c22.056,0,40,17.944,40,40v37.808c-9.928,11.28-16,26.024-16,42.192 C320,313.048,321.912,321.648,325.312,329.464z M432,256c26.472,0,48,21.528,48,48v71.352L450.808,352H384 c-26.472,0-48-21.528-48-48s21.528-48,48-48H432z M384,112c-26.472,0-48-21.528-48-48s21.528-48,48-48h48 c26.472,0,48,21.528,48,48v71.352L450.808,112H384z"></path>
                                                    <path d="M248,304c-22.056,0-40,17.944-40,40h16c0-13.232,10.768-24,24-24s24,10.768,24,24h16C288,321.944,270.056,304,248,304z"></path>
                                                    <path d="M224,252c0-8.048-4.8-14.96-11.672-18.128l17.136,5.712l5.064-15.168l-48-16l-5.064,15.168l26.424,8.808 C206.632,232.144,205.336,232,204,232c-11.032,0-20,8.968-20,20s8.968,20,20,20S224,263.032,224,252z M204,256c-2.2,0-4-1.8-4-4 s1.8-4,4-4s4,1.8,4,4S206.2,256,204,256z"></path>
                                                    <path d="M309.472,208.416l-48,16l5.064,15.168l17.136-5.712C276.8,237.04,272,243.952,272,252c0,11.032,8.968,20,20,20 c11.032,0,20-8.968,20-20c0-11.032-8.968-20-20-20c-1.336,0-2.632,0.144-3.888,0.392l26.424-8.808L309.472,208.416z M292,248 c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S289.8,248,292,248z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </>
                    )}
                    {role ? (
                        <FontAwesomeIcon icon={faUser} className="profile-icon" onClick={toggleProfileMenu} />

                    ) : (
                        <Link href="/authentication">
                            <button className='navbar-signup'>Sign In</button>
                        </Link>
                    )}

                    {/* Profile Menu */}
                    {isProfileMenuOpen && (
                        <div className="profile-menu">
                            <Link href={`/${role}/profile`} className="profile-menu-item">
                                Profile
                            </Link>
                            <div onClick={handleLogout} className="profile-menu-item">
                                Log out
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <WishlistPanel
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
            />
            <ComplaintsPanel
                isOpen={isComplaintsOpen}
                onClose={() => setIsComplaintsOpen(false)}
            />
        </>
    );
};

export default Navbar;
