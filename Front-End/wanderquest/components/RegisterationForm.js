"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../Styles/RegistrationForm.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UploadDocuments from "./UploadDocuments";

const RegistrationForm = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [userType, setUserType] = useState('');
    const [nationality, setNationality] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [occupation, setOccupation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const uploadRef = useRef(null);

    const countries = require('country-list').getNames();

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev); // Toggle function for confirm password

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const userData = {
            email,
            username,
            password,
            mobileNumber: mobileNo,
            role: userType,
            nationality,
            dob: dateOfBirth,
            job: occupation,
        };

        setError("");

        fetch('http://localhost:4000/authentication/register/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setUserId(data.id);
                    if (userType === "tourist") {
                        toggleForm();
                    }
                }
            })
            .catch(() => setError("Something went wrong. Please try again."));
    };

    return (
        <div className={styles.RegistrationContainer}>
            <form className={styles.RegistrationForm} onSubmit={handleSubmit}>
                <h1 className={styles.Title}>{userType ? `${userType} Registration` : "Sign Up"}</h1>

                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <div className={styles.PasswordWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <i onClick={toggleShowPassword} className={styles.TogglePassword}>
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                    </i>
                </div>

                <div className={styles.PasswordWrapper}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <i onClick={toggleShowConfirmPassword} className={styles.TogglePassword}>
                        {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                    </i>
                </div>

                <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="tourist">Tourist</option>
                    <option value="tourGuide">Tour Guide</option>
                    <option value="advertiser">Advertiser</option>
                    <option value="seller">Seller</option>
                </select>

                {userType === 'tourist' && (
                    <>
                        <input type="text" placeholder="Mobile Number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
                        <select value={nationality} onChange={(e) => setNationality(e.target.value)} required>
                            <option value="">Select Nationality</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                        <select value={occupation} onChange={(e) => setOccupation(e.target.value)} required>
                            <option value="">Select Occupation</option>
                            <option value="student">Student</option>
                            <option value="job">Job</option>
                        </select>
                    </>
                )}

                {error && <p className={styles.Error}>{error}</p>}

                <button type="submit" className={styles.RegisterButton}>Register</button>
                <p className={styles.LoginRedirect}>
                    Already have an account? &nbsp;
                    <a onClick={toggleForm} style={{ cursor: 'pointer' }}>Login</a>
                </p>
            </form>

            {userId && <div ref={uploadRef}><UploadDocuments userType={userType} userId={userId} /></div>}
        </div>
    );
};

export default RegistrationForm;