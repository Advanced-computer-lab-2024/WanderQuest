"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";

const TourGuideInfo = ({ userId }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [previousWork, setPreviousWork] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch the tour guide's profile data (GET request)
    useEffect(() => {
        if (!userId) {
            setError("User ID is not available.");
            return; // Exit if userId is not provided
        }

        fetch(`http://localhost:4000/tourGuide/profile/:id`)
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
                setYearsOfExperience(data.yearsOfExperience || '');
                setPreviousWork(data.previousWork || '');
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
            yearsOfExperience,
            previousWork,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/tourGuide/profile/:id`,
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
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label>Email: </label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Mobile Number: </label>
            <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
            />

            <label>Years of Experience:</label>
            <input
                type="number"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
            />

            <label>Previous Work:</label>
            <input
                type="text"
                value={previousWork}
                onChange={(e) => setPreviousWork(e.target.value)}
            />

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default TourGuideInfo;
