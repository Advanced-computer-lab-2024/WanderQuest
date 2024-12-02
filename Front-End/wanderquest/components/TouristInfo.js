"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/Profiles.module.css";
import DeleteAccount from "../components/DeleteAccount";
import ChangePassword from "./ChangePassword";

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
    const[preferredCurrency,setPreferredCurrency]= useState('');
    const [currencies, setCurrencies] = useState([]);
    const [redeemAmount, setRedeemAmount] = useState(0); // State for redeem amount
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [badgeUrl, setBadgeUrl] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    

    // Picture states
    const [pic, setPic] = useState(null); // For the selected logo file
    const [picPreview, setPicPreview] = useState(''); // For the preview before upload
    const [picURL, setPicURL] = useState(''); // For the uploaded logo URL

    

    // Fetch the tourist profile data (GET request)
    useEffect(() => {
        const fetchProfile = async () => {
            

            try {
                const response = await fetch(`http://localhost:4000/tourist/profile`,{
                    credentials:"include",
                });
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
                setWallet(data.wallet || 0);
                setAvailablePoints(data.availablePoints || 0);
                setPreferredCurrency(data.preferredCurrency || '');
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile data");
            }
        };

        fetchProfile();
    }, []);

    // Fetch the level based on the tourist ID
    useEffect(() => {
        const fetchLevel = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:4000/tourist/level`);
                if (!response.ok) throw new Error('Failed to fetch tourist level');
                const data = await response.json();
                setBadgeUrl(`/level${data.level}.png`);
            } catch (error) {
                console.error("Error fetching tourist level:", error);
                setError("Error fetching tourist level");
            }
        };
        fetchLevel();
    }, []);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("http://localhost:4000/tourist/currencies",{
                    credentials:"include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch currencies");
                }
                const data = await response.json();
                setCurrencies(data); // Set the fetched currencies
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);

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
                `http://localhost:4000/tourist/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                    credentials:"include",
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Profile updated successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
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



    const handleRedeem = async () => {
      
        try {
          const response = await fetch(`http://localhost:4000/tourist/redeem`, {
            method: "PATCH",  
            headers: {
              "Content-Type": "application/json",
            },
            credentials:"include",
          });
      
          if (response.ok) {
            const data = await response.json();
            setWallet(data.wallet); // Update wallet with new amount
            setAvailablePoints(data.availablePoints); // Update available points
            setSuccessMessage("Successfully redeemed 100 EGP for 10,000 points!");
            setTimeout(() => setSuccessMessage(""), 3000);
            setError(''); // Clear any error message
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Failed to redeem points");
            setTimeout(() => setError(""), 3000);
          }
        } catch (err) {
          console.error("Error redeeming points:", err);
          setError("An error occurred while redeeming the points");
        }
    };

    const handleDeleteSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };



    const handleCurrencyChange = async (e) => {
        const selectedCurrency = e.target.value;
        setPreferredCurrency(selectedCurrency);
        console.log(selectedCurrency);

        try {
            const response = await fetch(`http://localhost:4000/tourist/changePreferredCurrency`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ preferredCurrency: selectedCurrency }),
                credentials:"include",
            });

            if (response.ok) {
                const data = await response.json();
                setWallet(data.wallet); // Update wallet with converted amount
                setSuccessMessage("Currency updated successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to update currency");
            }
        } catch (error) {
            console.error("Error updating currency:", error);
            setError("An error occurred while updating the currency");
        }
    };
    

    return (
        <div>
        <form className={styles.Profile} onSubmit={handleSubmit}>
            <h3 className={styles.h1}>My Profile  {badgeUrl && <img src={badgeUrl} alt="Badge" className={styles.badge} />}</h3>
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
            <label>Preferred Currency: </label>
            <select value={preferredCurrency} onChange={handleCurrencyChange} required>
                {currencies.map(([code, name]) => (
                    <option key={code} value={code}>
                        {name} ({code})
                    </option>
                ))}
            </select>


<div>
    {/* Redeem section */}
    <label>Redeem Points (10,000 points = 100 EGP): </label>
    <button type="button" onClick={handleRedeem}>Redeem</button>
    
    
    <button type="submit">Save Changes</button>
  </div>

    {/* Display success or error messages */}
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <ChangePassword />
        <DeleteAccount onDeleteSuccess={handleDeleteSuccess} />
    </div>
    
    );
};

export default TouristInfo;
