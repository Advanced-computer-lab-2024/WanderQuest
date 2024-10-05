"use client"
import { useState , useEffect } from "react";
import styles from "../Styles/Profiles.module.css"

const TouristInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [occupation, setOccupation] = useState('');
    const [wallet,setWallet] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setMobileNo(initialData.mobileNo || '');
            setNationality(initialData.nationality || '');
            setDob(initialData.dob || '');
            setOccupation(initialData.occupation || '');
            setWallet(initialData.wallet || '');
        }
    }, [initialData]);

    return(
        <form className={styles.Profile}>
            <h3 className={styles.h1}>My profile</h3>
            <label>Username: </label>
            <input type="text" value={username} required readOnly/>

            <label>Email: </label>
            <input type="text" value={email} required readOnly/>

            <label>Mobile Number:</label>
            <input type="text"
                value={mobileNo}
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
            <input type="date" value={dob} required readOnly/>


            <label>Occupation: </label>
            <input
                type="text"
                value={occupation}
                required
                onChange={(e) => setOccupation(e.target.value)}           
            />

            <label>Wallet: </label>
            <input type="number" value={wallet} required readOnly/>
            
            <button>Save Changes</button>

        </form>
    )
}
export default TouristInfo