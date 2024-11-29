"use client";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import styles from '../Styles/AcceptTerms.module.css';

const AcceptTerms = () => {
    const [accepted, setAccepted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const [viewMore, setViewMore] = useState(false); // State to toggle "View More" section

    

    const handleAccept = async () => {
        try {
            const response = await fetch(`http://localhost:4000/authentication/acceptTerms/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
            });
            if (response.ok) {
                setShowModal(false);
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
