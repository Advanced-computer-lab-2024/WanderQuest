"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";

const TouristInfo = ({ userId }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [occupation, setOccupation] = useState('');
    const [wallet, setWallet] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch the tourist profile data (GET request)
    useEffect(() => {
        if (!userId) {
            setError("User ID is not available.");
            return; // Exit if userId is not provided
        }

        fetch(`http://localhost:4000/tourist/profile`, {
            // No token required for this version
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return response.json();
            })
            .then((data) => {
                setUsername(data.username || '');
                setEmail(data.email || '');
                setMobileNo(data.mobileNo || '');
                setNationality(data.nationality || '');
                setDob(data.dob || '');
                setOccupation(data.occupation || '');
                setWallet(data.wallet || '');
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            });
    }, [userId]);

    // Handle form submission (PUT request)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email,
            mobileNo,
            nationality,
            dob,
            occupation,
            wallet,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/tourist/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Profile updated successfully!");
                setError(''); // Clear any error message
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to update profile");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("An error occurred while updating the profile");
        }
    };

    return (
        <form className={styles.Profile} onSubmit={handleSubmit}>
            <h3 className={styles.h1}>My Profile</h3>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            <label>Username: </label>
            <input type="text" value={username} required readOnly />

            <label>Email: </label>
            <input type="text" value={email} required readOnly />

            <label>Mobile Number:</label>
            <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
            />

            <label>Nationality:</label>
            <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
            />

            <label>Date of Birth:</label>
            <input type="date" value={dob} required readOnly />

            <label>Occupation: </label>
            <input
                type="text"
                value={occupation}
                required
                onChange={(e) => setOccupation(e.target.value)}
            />

            <label>Wallet: </label>
            <input type="number" value={wallet} required readOnly />

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default TouristInfo;
