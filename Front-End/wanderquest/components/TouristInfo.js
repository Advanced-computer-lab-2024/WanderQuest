"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";

const TouristInfo = () => {
    const [userId, setUserId] = useState(''); // State for storing the tourist ID
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNo] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [job, setOccupation] = useState('');
    const [wallet, setWallet] = useState('');
    const [availablePoints, setAvailablePoints] = useState('');
    const [redeemAmount, setRedeemAmount] = useState(0); // State for redeem amount
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

    // Fetch the tourist ID first
    useEffect(() => {
        const fetchTouristId = async () => {
            try {
                const response = await fetch(`http://localhost:4000/tourist/touristId`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tourist ID');
                }
                const touristId = await response.json(); // Assuming the backend sends the ID directly
                console.log("Fetched tourist ID:", touristId); // Debugging line
                setUserId(touristId); // Set the fetched ID
            } catch (error) {
                console.error("Error fetching tourist ID:", error);
                setError("Error fetching tourist ID");
            }
        };

        fetchTouristId();
    }, []);

    // Fetch the tourist profile data (GET request)
    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                console.log("User ID is not available."); // Debugging line
                return; // Exit if userId is not provided
            }

            try {
                const response = await fetch(`http://localhost:4000/tourist/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                console.log("Fetched tourist profile data:", data); // Debugging line
                setUsername(data.username || '');
                setEmail(data.email || '');
                setMobileNo(data.mobileNumber || '');
                setNationality(data.nationality || '');
                setDob(data.dob.split("T")[0] || '');
                setOccupation(data.job || '');
                setWallet(data.wallet || '');
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
            mobileNumber,
            nationality,
            dob,
            job,
            wallet,
        };

        try {
            const response = await fetch(
                `http://localhost:4000/tourist/profile/${userId}`,
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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setPasswordMessage("New passwords do not match.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:4000/changePassword/${userId}`, {
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
            setError("Please select a logo to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("documents", pic);
    
        try {
            const response = await fetch(`http://localhost:4000/tourist/uploadLogo/${userId}`, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                setLogoURL(`http://localhost:4000/seller/logo/${userId}?timestamp=${new Date().getTime()}`);
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

    const handleRedeem = async () => {
        if (redeemAmount <= 0) {
            setError("Redeem amount must be greater than 0.");
            return;
        }

        const pointsRequired = redeemAmount * 100; // 100 EGP per 10000 points
        if (availablePoints < pointsRequired) {
            setError("Not enough points for the redemption.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/tourist/redeem/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    points: pointsRequired,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setWallet(data.wallet); // Update wallet with new amount
                setAvailablePoints(data.availablePoints); // Update available points
                setSuccessMessage(`Successfully redeemed ${redeemAmount} EGP!`);
                setError(''); // Clear any error message
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to redeem points");
            }
        } catch (err) {
            console.error("Error redeeming points:", err);
            setError("An error occurred while redeeming the points");
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
                value={mobileNumber}
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
            <input
                type="date"
                value={dob}
                required readOnly
            />

            <label>Occupation: </label>
            <input
                type="text"
                value={job}
                onChange={(e) => setOccupation(e.target.value)}
                required
            />

            <label>Wallet: </label>
            <input
                type="number"
                value={wallet}
                required readOnly
            />
            <label>Available Points: </label>
            <input
                type="number"
                value={availablePoints}
                required readOnly
            />

            {/* Redeem section */}
            <label>Redeem Points (10000 points = 100 EGP): </label>
            <input
                type="number"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                min="1"
                max={availablePoints / 10000}
            />
            <button type="button" onClick={handleRedeem}>Redeem</button>

            <button type="submit">Save Changes</button>

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
                    {passwordMessage && <p className={styles.passwordMessage}>{passwordMessage}</p>}
                    
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

export default TouristInfo;
