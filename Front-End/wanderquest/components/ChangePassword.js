"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/ChangePass.module.css"

const ChangePassword = () => {
    const [userId, setUserId] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    return(
        <div>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            
            <div className={styles.passwordSection}>
                <h3 className={styles.h3}>Change Password</h3>
                <div className={styles.passwordFields}>
                {passwordMessage && <p className={styles.passwordMessage}>{passwordMessage}</p>}
                    
                <label>Current Password:</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />

                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <label>Confirm New Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <button className={styles.passwordChangeButton}type="submit" onClick={handlePasswordChange}>Change Password</button>
                </div>
            </div>
            
        </div>

    );

};

export default ChangePassword;