"use client"
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";
import DeleteAccount from "../components/DeleteAccount";
import ChangePassword from "./ChangePassword";

const CompanyInfo = () => {
    // Existing state variables...
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [hotline, setHotline] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    // Logo states
    const [logo, setLogo] = useState(null); // For the selected logo file
    const [logoPreview, setLogoPreview] = useState(''); // For the preview before upload
    const [logoURL, setLogoURL] = useState(''); // For the uploaded logo URL

    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Reset error state before fetching
                setError(null);
    
                const response = await fetch(`http://localhost:4000/advertiser/profile`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
    
                const data = await response.json();
    
                // Update state with the fetched data
                setUsername(data.advertiser.username || "");
                setEmail(data.advertiser.email || "");
                setWebsiteLink(data.advertiser.websiteLink || "");
                setHotline(data.advertiser.hotline || "");
                setCompanyName(data.advertiser.companyName || "");
                setCompanyAddress(data.advertiser.companyAddress || "");
                setCompanyDescription(data.advertiser.companyDescription || "");
    
                // Update logo URL if it exists
                if (data.advertiser.logo) {
                    setLogoURL(`http://localhost:4000/advertiser/logo?timestamp=${new Date().getTime()}`);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            }
        };
    
        fetchProfile();
    }, []); 
    

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
                `http://localhost:4000/advertiser/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies in the request
                    body: JSON.stringify(updatedData),
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                console.log("Profile updated:", data);
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
    

    

    // Handle logo file selection
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file)); // Show preview of the logo
        }
    };

    const handleLogoUpload = async () => {
        if (!logo) {
            setError("Please select a logo to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("documents", logo);
    
        try {
            const response = await fetch(`http://localhost:4000/advertiser/uploadLogo`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
    
            if (response.ok) {
                const result = await response.json();
                setLogoURL(`http://localhost:4000/advertiser/logo?timestamp=${new Date().getTime()}`);
                setLogoPreview("");
                setError("");
                setSuccessMessage("Logo uploaded successfully!");
                setTimeout(() => setSuccessMessage(""), 3000); // Clears after 3 seconds
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to upload logo");
            }
        } catch (err) {
            console.error("Error uploading logo:", err);
            setError("An error occurred while uploading the logo");
        }
    };

    const handleDeleteSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };
    

    return (
        <div>
        <form className={styles.Profile} onSubmit={handleSubmit}>
        <div className={styles.profileHeader}>
            <h3 className={styles.h1}>My Profile</h3>
            {logoURL && <img src={logoURL} alt="Company Logo" className={styles.logoDisplay} />}
        </div>

            <label>Username: </label>
            <input type="text" value={username} required readOnly />

            <label>Email: </label>
            <input type="text" value={email} required readOnly />

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

            {/* Logo Upload Section */}
        <div className={styles.logoUploadSection}>
            <label>Upload Logo:</label>
            <input type="file" onChange={handleLogoChange} />
            {logoPreview && <img src={logoPreview} alt="Logo Preview" className={styles.logoPreview} />}
            <button type="button" onClick={handleLogoUpload} className={styles.uploadButton}>
                Upload
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </div>

            
        
        </form>
        <ChangePassword />
        <DeleteAccount onDeleteSuccess={handleDeleteSuccess} />
    </div>
    );

};

export default CompanyInfo;
