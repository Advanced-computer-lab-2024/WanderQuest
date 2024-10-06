"use client"
import { useState , useEffect } from "react";
import styles from "../Styles/Profiles.module.css"
import jwt_decode from "jwt-decode";

const SellerInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');

    

    // Get the JWT token from localStorage
    const token = localStorage.getItem('authToken'); // This should be stored during login
    let userId = '';

    if (token) {
        const decoded = jwt_decode(token);
        userId = decoded.id; // Assuming the user ID is stored in the token
    } else {
        setError('User not authenticated');
    }

    // Fetch the seller profile data (GET request)
    useEffect(() => {
        if (!userId) return; // If no userId, do nothing

        fetch(`http://localhost:4000/seller/profile/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username || '');
                setEmail(data.email || '');
                setName(data.name || '');
                setDescription(data.description || '');
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
            name,
            description,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/seller/profile/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add the token for authentication
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
    return(
        <form className={styles.Profile} onSubmit={handleSubmit}>
            <h3 className={styles.h1}>My profile</h3>
            <label>Username: </label>
            <input
                type="text"
                value={username}
                required
            />

            <label>Email: </label>
            <input
                type="text"
                value={email}
                required
            />

            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button>Save Changes</button>

        </form>

    )



}
export default SellerInfo