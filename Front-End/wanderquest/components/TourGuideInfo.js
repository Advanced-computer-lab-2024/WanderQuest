"use client"
import { useState , useEffect } from "react";
import styles from "../Styles/Profiles.module.css"

const TourGuideInfo = ({initialData, OnSubmit}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [previousWork, setPreviousWork] = useState('');


    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setMobileNo(initialData.mobileNo || '');
            setYearsOfExperience(initialData.yearsOfExperience || '');
            setPreviousWork(initialData.previousWork || '');
        }
    }, [initialData]);



    return(
        <form className={styles.Profile}>
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

            <label>Mobile Number: </label>
            <input
                type="text"
                value={mobileNo}
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

            <button>Save Changes</button>

        </form>

    )
}
export default TourGuideInfo