"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";

const TourGuideInfo = () => {
    const [userId, setUserId] = useState(''); // State for storing the tour guide ID
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNo] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [previousWork, setPreviousWork] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    //change password states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    // Picture states
    const [pic, setPic] = useState(null); // For the selected logo file
    const [picPreview, setPicPreview] = useState(''); // For the preview before upload
    const [picURL, setPicURL] = useState(''); // For the uploaded logo URL

    // Fetch the tour guide ID first
    useEffect(() => {
        const fetchTourGuideId = async () => {
            try {
                const response = await fetch(`http://localhost:4000/tourGuide/tourGuideId`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tour guide ID');
                }
                const tourGuideId = await response.json(); // Adjust based on response structure
                console.log("Fetched tour guide ID:", tourGuideId); // Debugging line

                // If the response is an object with an ID property
                // If the response is just the ID (string), this will set it correctly.
                setUserId(tourGuideId); 
            } catch (error) {
                console.error("Error fetching tour guide ID:", error);
                setError("Error fetching tour guide ID");
            }
        };

        fetchTourGuideId();
    }, []);

    // Fetch the tour guide profile data (GET request)
    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                console.log("User ID is not available."); // Debugging line
                return; // Exit if userId is not provided
            }

            try {
                const response = await fetch(`http://localhost:4000/tourGuide/profile/${userId}`); // Correct URL
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                console.log("Fetched tour guide profile data:", data); // Debugging line
                setUsername(data.username || '');
                setEmail(data.email || '');
                setMobileNo(data.mobileNumber || '');
                setYearsOfExperience(data.yearsOfExperience || '');
                setPreviousWork(data.previousWork || '');
                if(data.photo){
                    setPicURL(`http://localhost:4000/tourGuide/photo/${userId}?timestamp=${new Date().getTime()}`);
                }
    
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            }
        };

        fetchProfile();
    }, [userId]); // This useEffect depends on userId

    // Handle form submission (PUT request)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email,
            mobileNumber,
            yearsOfExperience,
            previousWork,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/tourGuide/profile/${userId}`, // Correct URL
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
    const handlePasswordChange = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setPasswordMessage("New passwords do not match.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:4000/authentication/changePassword/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword,
                }),
            });
    
            if (response.ok) {
                setPasswordMessage("Password changed successfully!");
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordFields(false); // Hide fields after successful change
            } else {
                const errorData = await response.json();
                setPasswordMessage(errorData.error || "Failed to change password");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            setPasswordMessage("An error occurred while changing the password");
        }
    };

    // Handle logo file selection
    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPic(file);
            setPicPreview(URL.createObjectURL(file)); // Show preview of the logo
        }
    };

    const handlePicUpload = async () => {
        if (!pic) {
            setError("Please select a photo to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("documents", pic);
    
        try {
            const response = await fetch(`http://localhost:4000/tourGuide/uploadPhoto/${userId}`, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                setPicURL(`http://localhost:4000/tourGuide/photo/${userId}?timestamp=${new Date().getTime()}`);
                setPicPreview("");
                setError("");
                setSuccessMessage("Picture uploaded successfully!");
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
    

    return (
        <form className={styles.Profile} onSubmit={handleSubmit}>
            <div className={styles.profileHeader}>
            <h3 className={styles.h1}>My Profile</h3>
            {picURL && <img src={picURL} alt="Photo" className={styles.logoDisplay} />}
        </div>
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
                value={mobileNumber}
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

            {/* Picture Upload Section */}
        <div className={styles.logoUploadSection}>
            <label>Upload Picture:</label>
            <input type="file" onChange={handlePicChange} />
            {picPreview && <img src={picPreview} alt="Pic Preview" className={styles.logoPreview} />}
            <button type="button" onClick={handlePicUpload} className={styles.uploadButton}>
                Upload
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </div>
        {passwordMessage && <p className={styles.passwordMessage}>{passwordMessage}</p>}

            {/* Password Change Toggle */}
            <button 
                type="button" 
                className={styles.changePasswordCancelButton} 
                onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
                {showPasswordFields ? "Cancel Password Change" : "Change Password"}
            </button>

            {showPasswordFields && (
                <div className={styles.passwordSection}>
                    
                    <label>Current Password:</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />

                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                    <label>Confirm New Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button onClick={handlePasswordChange}>Change Password</button>
                </div>
            )}
        </form>
    );
};

export default TourGuideInfo;
