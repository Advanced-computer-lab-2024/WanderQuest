"use client";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import styles from '../Styles/AcceptTerms.module.css';

const AcceptTerms = () => {
    const [accepted, setAccepted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
        if (token) {
            const decodedToken = jwt.decode(token.split('=')[1]);
            if (decodedToken && decodedToken.userId) {
                setUserId(decodedToken.userId);
            }
        }
    }, []);

    const handleAccept = async () => {
        try {
            const response = await fetch(`http://localhost:4000/authentication/acceptTerms/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                    <p>[Display terms and conditions here]</p>
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={accepted}
                            onChange={() => setAccepted(!accepted)}
                        />
                        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
                    </div>
                    <button className={styles.Checkbutton} onClick={handleAccept} disabled={!accepted}>
                        Confirm
                    </button>
                </div>
            </div>
        )
    );
};

export default AcceptTerms;
