"use client";
import { useState, useEffect } from "react";
import styles from '../Styles/AcceptTerms.module.css';
import Cookies from 'js-cookie';

const AcceptTerms = () => {
    const [accepted, setAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [viewMore, setViewMore] = useState(false);
    const [role, setRole] = useState("");  // State to store the role

    useEffect(() => {
        // Get the role from the cookie
        const userRole = Cookies.get('role');
        if (userRole) {
            setRole(userRole);
            fetchProfile(userRole);
        } else {
            // If no role is found in cookies, we can handle this case as needed
            console.log('No role found in cookies');
        }
    }, []);

    const fetchProfile = async (role) => {
        try {
            // Make a GET request to the corresponding profile endpoint based on the role
            const response = await fetch(`http://localhost:4000/${role}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Ensure the request includes the user's session cookies
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();

            if (data?.termsAccepted) {
                setShowModal(false);  // Don't show modal if terms have been accepted
                Cookies.set('isTermsAccepted', 'true', { expires: 365 });
            } else {
                setShowModal(true);  // Show modal if terms have not been accepted
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setShowModal(true);  // Show modal if there's an error
        }
    };

    const handleAccept = async () => {
        try {
            const response = await fetch(`http://localhost:4000/authentication/acceptTerms/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });
            if (response.ok) {
                setShowModal(false);
                Cookies.set('isTermsAccepted', 'true', { expires: 365 });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error accepting terms:", error);
            alert("An error occurred while accepting the terms. Please try again.");
        }
    };
    

    return (
        showModal && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Terms and Conditions</h2>
                    <p>Last Updated: November 2024</p>
                    <p>Welcome to WanderQuest! Please read these Terms & Conditions carefully. By accessing and using our website and services, you agree to these terms. If you do not agree, please discontinue use immediately.
                    </p>
                    <ul>
                        <li>Acceptance of Terms: By creating an account or booking a trip, you agree to these Terms & Conditions and our Privacy Policy.</li>
                        <li>Services Provided: WanderQuest provides a platform for trip planning, with bookings processed via third-party providers.</li>
                        <li>User Accounts: You are responsible for your account credentials and all activities under your account.</li>
                        <li>Eligibility: Users must be at least 18 years old to use WanderQuest.</li>
                        <li>Use of the Platform: Use WanderQuest responsibly and only for lawful purposes.</li>
                        <li>Bookings and Transactions: WanderQuest facilitates bookings via third-party providers; users are responsible for checking providers' policies.</li>
                        <li>Payments and Refunds: Refunds and cancellations are subject to the policies of third-party providers.</li>
                        <li>Personalization and Preferences: WanderQuest may use data for travel recommendations to enhance user experience.</li>
                        {viewMore && (
                            <>
                                <li>Content Ownership and Intellectual Property: WanderQuest owns all content and trademarks on its website.</li>
                                <li>Limitation of Liability: WanderQuest is not liable for damages resulting from the platform's use or technical issues.</li>
                                <li>Privacy Policy: WanderQuest handles personal data per our Privacy Policy.</li>
                                <li>Termination: WanderQuest may suspend or terminate access for terms violations.</li>
                                <li>Modification of Terms: WanderQuest may update these Terms & Conditions at any time.</li>
                                <li>Governing Law: These terms are governed by the laws of the specified jurisdiction.</li>
                            </>
                        )}
                    </ul>
                    {!viewMore && (
                        <button className={styles.viewMoreButton} onClick={() => setViewMore(true)}>
                            View More
                        </button>
                    )}
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={accepted}
                            onChange={() => setAccepted(!accepted)}
                        />
                        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
                    </div>
                    <button
                        className={styles.Checkbutton}
                        onClick={handleAccept}
                        disabled={!accepted} // Disable until terms are accepted
                    >
                        Confirm
                    </button>
                </div>
            </div>
        )
    );
};

export default AcceptTerms;
