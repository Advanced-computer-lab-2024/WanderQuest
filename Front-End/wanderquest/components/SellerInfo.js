"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";

const SellerInfo = () => {
    const [userId, setUserId] = useState(''); // State for storing the seller ID
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [sellerName, setName] = useState('');
    const [sellerDescription, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch the seller ID first
    useEffect(() => {
        const fetchSellerId = async () => {
            try {
                const response = await fetch(`http://localhost:4000/seller/sellerId`);
                if (!response.ok) {
                    throw new Error('Failed to fetch seller ID');
                }
                const sellerId = await response.json(); // Ensure we get the ID correctly
                console.log("Fetched seller ID:", sellerId); // Debugging line
                setUserId(sellerId); // Assuming sellerId is returned as a string
            } catch (error) {
                console.error("Error fetching seller ID:", error);
                setError("Error fetching seller ID");
            }
        };

        fetchSellerId();
    }, []);

    // Fetch the seller profile data (GET request)
    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                console.log("User ID is not available."); // Debugging line
                return; // Exit if userId is not provided
            }

            try {
                const response = await fetch(`http://localhost:4000/seller/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                console.log("Fetched seller profile data:", data); // Debugging line
                setUsername(data.username || '');
                setEmail(data.email || '');
                setName(data.sellerName || '');
                setDescription(data.sellerDescription || '');
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            }
        };

        fetchProfile();
    }, [userId]);

    // Handle form submission (PUT request)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email,
            sellerName,
            sellerDescription,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/seller/profile/${userId}`,
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
                setError(""); // Clear any error message
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

            <label>Name:</label>
            <input
                type="text"
                value={sellerName}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Description:</label>
            <input
                type="text"
                value={sellerDescription}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default SellerInfo;
