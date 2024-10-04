"use client"
import { useState , useEffect } from "react";

const TouristInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [occupation, setOccupation] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setMobileNo(initialData.mobileNo || '');
            setNationality(initialData.nationality || '');
            setDob(initialData.dob || '');
            setOccupation(initialData.occupation || '');
        }
    }, [initialData]);

    return(
        <form className="TouristProfile">
            <h3>My profile</h3>
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

            <label>Mobile Number:</label>
            <input
                type="text"
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
            <input
                type="date"
                value={dob}
                required
            />


            <label>Occupation: </label>
            <input
                type="text"
                value={occupation}
                required           
            />
            
            <button>Save Changes</button>

        </form>
    )
}
export default TouristInfo