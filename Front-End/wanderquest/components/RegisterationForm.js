"use client";
import styles from '../Styles/RegistrationForm.module.css';
import { useState } from "react";
import { getNames } from 'country-list';
import UploadDocuments from '../components/UploadDocuments';


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [userType, setUserType] = useState('');
    const [nationality, setNationality] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [occupation, setOccupation] = useState('');
    const [error, setError] = useState('');
    //const [documents, setDocuments] = useState([]);
    const [userId,setUserId]=useState(null);

    const [message, setMessage] = useState(null);

    const countries = getNames();

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        
        // User data that will be sent to the server
        const userData = {
            email,
            username,
            password,
            mobileNumber: mobileNo,
            role: userType,
            nationality,
            dob: dateOfBirth,
            job:occupation
        };
        
        // Clear error messages before making the request
        setError(""); 
    
        // Make the API call to the backend
        fetch('http://localhost:4000/authentication/register/', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())  // Parse the response
        .then(data => {
            if (data.error) {
                // Handle server errors (e.g., validation issues)
                setError(data.error);
            } else {
                setUserId(data.id);
                console.log(data.id);
                // Handle success (e.g., redirect to login or another page)
                console.log("Registration successful:", data);
                if(userType === "tourist"){
                    window.location.href = "/signin";
                }
                
                
            }
        })
        .catch(err => {
            // Handle fetch errors
            setError("Something went wrong. Please try again.");
            console.error("Error:", err);
        });
    };

    
    
    
    
    return (
        <div>
        <form className={styles.Registration} onSubmit={handleSubmit}>
    <h1 className={styles.h1}>Sign Up</h1>
    
    <label>Email: </label>
    <input
        type="text"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
    />

    <label>Username: </label>
    <input
        type="text"
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
    />

    <label>Password: </label>
    <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
    />

    <label>Confirm Password: </label>
    <input
        type="password"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
    />



    <label>You are a/an: </label>
    <select
        required
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
    >
        <option value="">Select</option>
        <option value="tourist">Tourist</option>
        <option value="tourGuide">Tour Guide</option>
        <option value="advertiser">Advertiser</option>
        <option value="seller">Seller</option>
    </select>

    {userType === 'tourist' && (
                <>
                    <label>Mobile Number: </label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setMobileNo(e.target.value)}
                        value={mobileNo}
                    />

                    <label>Nationality: </label>
                    <select
                        required
                        value={nationality}  // Ensure the selected value is reflected here
                        onChange={(e) => setNationality(e.target.value)}
                    >
                        <option value="">Select your nationality</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    <label>Date of Birth: </label>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                    />

                    <label>Occupation: </label>
                    <select
                        required
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    >
                        <option value="">Select your occupation</option>
                        <option value="student">Student</option>
                        <option value="job">Job</option>
                    </select>
                </>
            )}

            

    {error && <p className={styles.error}>{error}</p>}

    {/* Form Submit Button */}
    <button type="submit">Submit</button>
    
</form>
{userId && <UploadDocuments userType={userType} userId={userId} />}
</div>


    )

};

export default RegistrationForm;
