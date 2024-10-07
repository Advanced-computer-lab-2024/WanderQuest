"use client"
import { useState , useEffect } from "react";
import styles from "../Styles/Profiles.module.css"


const CompanyInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [hotline, setHotline] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    useEffect(() => {
        // Fetch user profile using the provided userId
        if (!userId) {
            setError("User ID is not available.");
            return; // Exit if userId is not provided
        }

        fetch(`http://localhost:4000/advertiser/profile/:id`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return response.json();
            })
            .then((data) => {
                setUsername(data.username || "");
                setEmail(data.email || "");
                setWebsiteLink(data.websiteLink || "");
                setHotline(data.hotline || "");
                setCompanyName(data.companyName || "");
                setCompanyAddress(data.companyAddress || "");
                setCompanyDescription(data.companyDescription || "");
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            });
    }, [userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email,
            websiteLink,
            hotline,
            companyName,
            companyAddress,
            companyDescription,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/advertiser/profile/:id`,
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

            <label>Company Name:</label>
            <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <label>Company Address:</label>
            <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
            />

            <label>Company Description:</label>
            <input
                type="text"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
            />


            <label>Link to Website: </label>
            <input
                type="text"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}            
            />

            <label>Hotline:</label>
            <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
            />

            

            <button type="submit">Save Changes</button>

        </form>

    )

}
export default CompanyInfo